# coding: utf-8
require 'net/http'
require 'date'
require 'parseconfig'
require 'uri'

CONFIG=ParseConfig.new('./post-config')
DIRPATH=CONFIG["default_path"]
HOST=CONFIG["host"]

def delete(id)
  uri = URI.parse("#{HOST}/api/v1/#{id}?pass=#{getPass}")
  req = Net::HTTP::Delete.new(uri.request_uri)
  http = Net::HTTP.new(uri.host, uri.port)
  res = http.request(req)

  puts res.body
end
def getPass()
  pass=""

  File.open('./.pass') do |file|
    pass=file.read
  end
  pass
end
def post(fpath)
  title=""
  body=""
  pass=getPass

  File.open(fpath) do |file|
    title=File.basename(file.path,".md")
    body = file.read
  end

  res = Net::HTTP.post_form(URI.parse("#{HOST}/api/v1"),
                            {'title' => title,
                             'body' => body,
                             'tags_string' => "",
                             'pass' => pass})
  puts res.body

end


case ARGV[0]
when "post" then
  fpath = Dir.glob("#{DIRPATH}*").sort_by{|fp|
    t=Time.new
    File.open(fp){|f| t=f.ctime}
    t
  }.last
  if ARGV[1]
    post ARGV[1]
  else
    post fpath
  end

when "delete" then
  delete(ARGV[1])
else
  p "not found"
end
