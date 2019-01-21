# coding: utf-8
require 'net/http'
require 'date'
require 'parseconfig'
require 'uri'
require 'openssl'
require 'sequel'
require './lib/nippo'

CONFIG=ParseConfig.new('./post-config')
PASSCONFIG=ParseConfig.new('./.pass')
DIRPATH=CONFIG["default_path"]
HOST=CONFIG["host"]
DB = Sequel.connect("sqlite://./myblog.db")

def delete(id)
  # uri = URI.parse("#{HOST}/api/v1/#{id}")
  # req = Net::HTTP::Delete.new(uri.request_uri)
  # http = Net::HTTP.new(uri.host, uri.port)
  # req.body = URI.parse("pass=#{enc(PASSCONFIG["pass"])}")
  # res = http.request(req)

  # puts res.body
  begin
    res = Net::HTTP.post_form(URI.parse("#{HOST}/api/v1/delete/#{id}"),
                              {'pass' => enc(PASSCONFIG["pass"])})
    puts res.body
  rescue => e
    p e.message
  end
end

def set_tags_string
  DB[:my_blog].select(:title, :body, :id)
      .all.each do |rec|
    tags_string = Nippo.new(rec[:title], rec[:body]).wakati_content_size_filter.uniq.join(' ')
    p DB[:my_blog].where(id: rec[:id]).update(tags_string: tags_string)
  end
end

def enc(data)
  enc = OpenSSL::Cipher.new('AES-256-CBC')
  enc.encrypt
  enc.key = PASSCONFIG["key"].chars.take(22).join + Date.today.strftime("%Y%m%d%H")
  enc.iv = PASSCONFIG["iv"].chars.take(16).join
  enc.update(data) + enc.final
end

def post(fpath)
  title=""
  body=""
  pass=enc(PASSCONFIG["pass"])
  p fpath
  File.open(fpath) do |file|
    title=File.basename(file.path,".md")
    body = file.read
  end
  begin
    res = Net::HTTP.post_form(URI.parse("#{HOST}/api/v1/post"),
                              {'title' => title,
                               'body' => body,
                               'tags_string' => "",
                               'pass' => pass})
    puts res.body
  rescue => e
    p e.message
  end
end

def insert_profile_continuing_in_file(filepath)
  s = ''
  File.open(filepath) do |f|
    s = f.read
  end
  # これで固定。
  s.split('### ###').map do |v|
    DB[:profile].insert(content: v.gsub(/\n/,""))
  end

end

case ARGV[0]
when "createTag" then
  set_tags_string
when "post" then
  fpaths = Dir.glob("#{DIRPATH}*").sort_by do |fp|
    t=Time.new
    File.open(fp){|f| t=f.ctime}
    t
  end

  if ARGV[1] == "all"
    fpaths.each do |fp|
      post fp
      sleep(10)
    end
  elsif ARGV[1]
    post ARGV[1]
  else
    post fpaths.last
  end

when "delete" then
  delete(ARGV[1])
when "profile"
  insert_profile_continuing_in_file(ARGV[1])
else
  p "not found"
end
