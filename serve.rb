require './myblog'
require 'sinatra'

MyBlog.run! port: 8080, bind: '0.0.0.0'
