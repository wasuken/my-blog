# coding: utf-8
@dir = "/var/www/my-blog/"

worker_processes 1
working_directory @dir

timeout 300
listen 80

pid "#{@dir}tmp/pids/unicorn.pid"
listen '/var/www/my-blog/tmp/unicorn.sock', backlog: 1024

stderr_path "#{@dir}log/unicorn.stderr.log"
stdout_path "#{@dir}log/unicorn.stdout.log"
