require "sequel"

DB = Sequel.connect("sqlite://./myblog.db")

DB.create_table!(:my_blog) do
  primary_key :id
  String :blog_id, :unique=>true
  String :title
  String :body
  String :tags_string
end

DB.create_table!(:profile) do
  primary_key :id
  String :content
end
