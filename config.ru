require "sinatra"

require './myblog.rb'
require 'parseconfig'
CONFIG = ParseConfig.new('./post-config')
set :environment, :production

# MyBlog.run! port: 80
run MyBlog
