# coding: utf-8
# codig: utf-8
require 'sinatra'
require 'sequel'
require 'json'
require 'digest'
require 'date'
require 'securerandom'
require 'redcarpet'
require 'openssl'
require 'parseconfig'
require 'net/http'
require 'json'
require 'open-uri'
require './lib/nippo'
require 'logger'

class Log
  attr_accessor :ip, :created_at
  def initialize(line)
    lines = line.split(' ')
    @ip = lines[0]
    p lines[4] + ' ' + lines[5]
    @created_at = DateTime.parse(lines[4] + ' ' + lines[5])
  end
  def equal_created_date(str_date)
    target = Date.parse(str_date)
    return @created_at.year == target.year &&
      @created_at.month == target.month &&
      @created_at.day == target.day
  end
end

DB = Sequel.connect("sqlite://./myblog.db")
CONFIG_PASS = ParseConfig.new("./.pass")
CONFIG = ParseConfig.new("post-config")
class MyBlog < Sinatra::Base
  use Rack::CommonLogger, Logger.new('myapp.log')
  enable :method_override
  # error 400..510 do
  #   'Boom'
  # end
  def get_from_api
    uri = URI.parse("#{request.host}/api/v1")

    result = Net::HTTP.get(uri)
    json = JSON.parse(result)

    nippo_result = {}
    nippo_week = []
    n={}
    json.map{|contents|
      n = Nippo.new(contents["title"],contents["body"])
      nippo_week.push n
      if n.week_day == "日"
        nippo_result["until #{n.date_str}"] = nippo_week
        nippo_week = []
      end
    }
    nippo_result["until #{n.date_str}"] = nippo_week if nippo_week.count > 0
    nippo_result
  end

  def parse(nippo_result,n=20)
    nippo_wakatis = nippo_result.map{|k,v| v.map(&:wakati_content_size_filter)}
                      .flatten.select{|v| v.match(/^[^ -~｡-ﾟ]*$|[A-Za-z0-9]/)}

    result={}
    nippo_wakatis.uniq.map{|v|
      result[v]=nippo_wakatis.count{|s| s == v}
    }

    result.sort_by{|k,v| v}.reverse.take(n)
  end

  # 暗号化
  def enc(data)
    enc = OpenSSL::Cipher.new('AES-256-CBC')
    enc.encrypt
    enc.key = CONFIG_PASS["key"].chars.take(22).join + Date.today.strftime("%Y%m%d%H")
    enc.iv = CONFIG_PASS["iv"].chars.take(16).join
    enc.update(data) + enc.final
  end
  # 復号化
  def dec(encrypted_data)
    p encrypted_data
    dec = OpenSSL::Cipher.new('AES-256-CBC')
    dec.decrypt
    dec.key = CONFIG_PASS["key"].chars.take(22).join + Date.today.strftime("%Y%m%d%H")
    dec.iv = CONFIG_PASS["iv"].chars.take(16).join
    dec.update(encrypted_data) + dec.final
  end
  def mdToHtml(str)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML,strikethrough: true,fenced_code_blocks: true)
    # や、いちいち定義するのめんどくさいんで。
    str.gsub!(/```/,"~~~")
    markdown.render(str)
  end
  def isPass(pass)
    pw = CONFIG_PASS["pass"]
    result = pw == dec(pass)
    if result
      p "ok!"
    else
      p "invalid pass"
    end
    return result
  end
  def get_log_classes
    log_lines = []
    File.open('./myapp.log') do |f|
      f.each_line{|line|
        log_lines.push Log.new(line) if !line.match(/127.0.0.1/)
      }
    end
    p log_lines.count
    log_lines
  end
  # ブログ内容からタグを生成して出力する。
  get "/api/v1/tag/:tag" do
    DB[:my_blog].where(Sequel.like(:body, "%#{params['tag']}%"))
      .select(:title,:blog_id).all.to_json
  end
  get "/api/v1/graph/access" do
    maps = get_log_classes.group_by{|cls| "#{cls.created_at.year.to_s}/#{cls.created_at.month.to_s}"}
    maps.keys.map{ |k| {"month" => maps[k][0].created_at.month, "value" => maps[k].uniq{ |cls| cls.ip }.count} }.to_json
  end
  get "/api/v1/tags" do
    all = DB[:my_blog].select(:tags_string)
                     .all
                     .map {|v| v[:tags_string].split(' ')}
                     .flatten
    all.uniq.sort_by{|v| all.count{|s| s == v}}
      .reverse.map{|v| {value: v,count: all.count{|s| s == v}}}.to_json
  end
  # wordcloud用
  get "/api/v1/wordcloud/:n" do
    n = params[:n] || "20"
    parse(get_from_api,n.to_i).to_h
      .map{|k,v| {"text" => k,"value" => v}}.to_json
  end
  # 記事を削除する。現状でこちらは使えない。
  # delete "/api/v1/report/:id" do
  #   params = request.params
  #   return if !isPass(params[:pass])
  #   p "deleted #{DB[:my_blog].where(blog_id: params[:id]).all.first}"
  #   p DB[:my_blog].where(blog_id: params[:id]).delete
  # end
  # 記事を削除する。
  post "/api/v1/delete/:id" do
    return if !isPass(request.params['pass'])
    p "deleted #{DB[:my_blog].where(blog_id: params[:id]).all.first}"
    p DB[:my_blog].where(blog_id: params[:id]).delete
  end
  def create_tags_string(title, body)
    Nippo.new(title, body).wakati_content_size_filter.uniq.join(' ')
  end
  # 記事を登録する。
  post "/api/v1/post" do
    params = request.params
    title,body,tags_string,pass =
                           params["title"],params["body"],create_tags_string(params["title"],params["body"]),params["pass"]
    return if !isPass(pass)

    str = (title || "") + (body || "") + (tags_string || "") + Date.today.strftime("%Y/%m/%d %H:%M:%S")
    p str
    id = Digest::SHA1.hexdigest(str)

    DB[:my_blog].insert(blog_id: id, title: title, body: mdToHtml(body), tags_string: tags_string)
  end
  # 記事を更新する。
  put "/api/v1/put/:id" do
    params = request.params
    return if !isPass(params[:pass])
    id,title,body,tags_string = params["id"],params["title"],params["body"],params["tags_string"]
    DB[:my_blog].update(blog_id: id, title: title, body: mdToHtml(body), tags_string: tags_string)
  end
  # 記事一覧を返す
  get "/api/v1" do
    DB[:my_blog].all.reverse.to_json
  end
  # 記事を返す。
  get "/api/v1/report/:id" do
    DB[:my_blog].first(:blog_id => params[:id]).to_json
  end
  get "/api/v1/profile" do
    r = params["r"]
    contents = DB[:profile].select(:content).all.map{|v| v[:content]}
    p contents
    return (r ? contents.shuffle.to_json : contents.to_json)
  end
  # シングルページアプリケーション目指してるので消すかも。
  # 記事の一覧を見ることができるページを返す。
  get "/" do
    @title = "基本的に怠Diary"
    erb :index
  end
  # 記事を見ることができるページを返す。
  get "/report/:id" do
    p params[:id]
  end

  # 記事を登録するページを返す。
  # get "/new" do

  # end
  # # 記事を更新するページを返す。
  # get "/edit" do

  # end

end
# MyBlog.run! port: 80, bind: '0.0.0.0'
