# coding: utf-8
require 'date'
require 'natto'


class Nippo
  attr_accessor :date_str, :filecontent

  def initialize(date_str,filecontent)
    @date_str = date_str
    @filecontent = filecontent
  end

  def filecontent_clean
    @filecontent.gsub(/<code>.*?<\/code>/m,"").gsub(/<.*?>/,"")
  end

  def week_day
    w_day = Date.strptime(@date_str,"%Y-%m-%d").wday
    %w(日 月 火 水 木 金 土)[w_day]
  end

  def parse_content
    @filecontent.scan(/#.*?#/m).map{|s|
      if s.chars.last == "#"
        s.chop
      else
        s
      end
    }
  end
  def wakati_content
    nm = Natto::MeCab.new

    result=[]
    nm.parse(filecontent_clean) do |n|
      result.push n.surface if n.feature.match(/名詞/)
    end
    result
  end

  def wakati_content_size_filter(size=3)
    wakati_content.select{|s| s.size >= size}
  end

  def to_s
    "#{@filecontent.slice(0,20)}..."
  end
end
