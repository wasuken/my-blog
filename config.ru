require "sinatra"

require './myblog.rb'

set :environment, :production

# MyBlog.run! port: 80, bind: '0.0.0.0'
run MyBlog
