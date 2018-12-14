# coding: utf-8
require "sinatra"
require "sequel"
require "json"
require "digest"
require "date"

DB = Sequel.connect("sqlite://./myblog.db")

class MyBlog < Sinatra::Base
  enable :method_override
  # 記事を登録する。
  post "/api/v1" do
    params = request.params
    title,body,tags_string = params["title"],params["body"],params["tags_string"]

    str = (title || "") + (body || "") + (tags_string || "") + Date.today.strftime("%Y/%m/%d %H:%M:%S")
    id = Digest::SHA1.hexdigest(str)

    p DB[:my_blog].insert(blog_id: id, title: title, body: body, tags_string: tags_string)
    redirect "http://localhost:4567/"
  end
  # 記事を削除する。
  delete "/api/v1/:id" do
    DB[:my_blog].where(id: params[:id]).delete
    redirect "http://localhost:4567/"
  end
  # 記事を更新する。
  put "/api/v1/:id" do
    params = request.params
    id,title,body,tags_string = params["id"],params["title"],params["body"],params["tags_string"]
    DB[:my_blog].update(blog_id: id, title: title, body: body, tags_string: tags_string)
    redirect "http://localhost:4567/"
  end
  # シングルページアプリケーション目指してるので消すかも。
  # 記事の一覧を見ることができるページを返す。
  get "/" do
    erb :index
  end
  get "/post" do
    erb :post
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
  # 記事一覧を返す
  get "/api/v1/" do
    DB[:my_blog].all.to_json
  end
  # 記事を返す。
  get "/api/v1/:id" do
    DB[:my_blog].first(:blog_id => params[:id])
  end
end

MyBlog.run! :host => 'localhost', :port => 4567
