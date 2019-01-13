# coding: utf-8
# codig: utf-8
require 'sinatra'
require 'sequel'
require 'json'
require 'digest'
require 'date'
require 'securerandom'
require 'redcarpet'


DB = Sequel.connect("sqlite://./myblog.db")

class MyBlog < Sinatra::Base
  enable :method_override
  def mdToHtml(str)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML,strikethrough: true,fenced_code_blocks: true)
    # や、いちいち定義するのめんどくさいんで。
    str.gsub!(/```/,"~~~")
    markdown.render(str)
  end
  def isPass(pass)
    pw = SecureRandom.hex(8)
    File.open("./.pass") do |file|
      pw = file.read
    end
    if pw == pass
      p "ok!"
    else
      p "invalid pass"
    end
    return pw == pass
  end
  # 記事を削除する。
  delete "/api/v1/:id" do
    return if !isPass(params[:pass])
    p params[:id]
    p "deleted #{DB[:my_blog].where(blog_id: params[:id]).all.first}"
    p DB[:my_blog].where(blog_id: params[:id]).delete
  end
  # 記事を登録する。
  post "/api/v1" do
    params = request.params
    p request
    title,body,tags_string,pass = params["title"],params["body"],params["tags_string"],params["pass"]
    return if !isPass(pass)

    str = (title || "") + (body || "") + (tags_string || "") + Date.today.strftime("%Y/%m/%d %H:%M:%S")
    p str
    id = Digest::SHA1.hexdigest(str)

    DB[:my_blog].insert(blog_id: id, title: title, body: mdToHtml(body), tags_string: tags_string)
  end
  # 記事を更新する。
  put "/api/v1/:id" do
    params = request.params
    return if !isPass(params[:pass])
    id,title,body,tags_string = params["id"],params["title"],params["body"],params["tags_string"]
    DB[:my_blog].update(blog_id: id, title: title, body: mdToHtml(body), tags_string: tags_string)
  end
  # 記事一覧を返す
  get "/api/v1" do
    DB[:my_blog].all.to_json
  end
  # 記事を返す。
  get "/api/v1/:id" do
    DB[:my_blog].first(:blog_id => params[:id]).to_json
  end

  # シングルページアプリケーション目指してるので消すかも。
  # 記事の一覧を見ることができるページを返す。
  get "/" do
    @title = "基本的に怠Diary"
    erb :index
  end
  # 記事を見ることができるページを返す。
  get "/:id" do
    p params[:id]
  end

  # 記事を登録するページを返す。
  get "/new" do

  end
  # 記事を更新するページを返す。
  get "/edit" do

  end
end

MyBlog.run! :host => 'localhost', :port => 4567
