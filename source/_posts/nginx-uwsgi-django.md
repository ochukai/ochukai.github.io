title: Django 项目部署在 nginx + uwsgi
tags:
  - django
  - nginx
  - uwsgi
date: 2017-06-27 14:28:31
---

好久不写博客了，最近一直在忙一个私活，一个问卷类的项目，用 django 写的，说实话，之前除了在公司厘米用，都没有用过 python，还好我有一些好同事，有问题可以直接问，方便了很多。

为了避免长时间不写文章的尴尬，我急匆匆的新键了一个 md，开始写。

一般来说，本地运行 django 项目是很简单，
```sh
python manage.py runserver
```

## UWSGI

总感觉这个单词全部大写的话，很别扭，使用 uwsgi 启动项目的话也不是太难，

```ini
# docon.ini
# uwsgi abc.ini
# uwsgi --reload /tmp/***.pid
# uwsgi --stop /tmp/***.pid

[uwsgi]
chdir=/home/docon
module=docon.wsgi:application
master=True
processes=2
threads=2
socket=:8000
# http=:80
daemonize=/var/log/uwsgi-docon.log
pidfile=/tmp/docon.pid
vacuum=True
```

有一点要注意的就是， 如果单独使用 uwsgi，需要写 **http=:80**, 如果配合 nginx 的话，就改成 **socket=:8000**, 8000 随便写。

## NGINX
一般初装 ubuntu 的 nginx 之后，有一个默认的配置，在 **/etc/nginx/sites-enabled/default** 这个位置，需要修改成自己项目的配置。

```sh
vi /etc/nginx/sites-enabled/default
```

然后修改成自己的配置

```
server {
  listen 80;
  server_name ***.com;
  charset utf-8;

  client_max_body_size 75M;

  location / {
    include uwsgi_params;
    uwsgi_pass localhost:8000;
  }

  location /static/ {
    alias /var/www/html/docon/static/;
  }
}

```

重启 nginx

```sh
/etc/init.d/nginx restart  
```

哦，对了，在启动之前，要把静态文件，放到上面配置的 **/var/www/html/docon/static** 中去，这个路径是自己配置的，随便写吧，首先要在项目的 setting.py 里面设置 **STATIC_ROOT**, 

```
STATIC_ROOT = /var/www/html/docon/static
```

然后在执行下面的命令，把所有的静态文件转移过去。

```
python manage.py collectstatic
```

如果启动的过程中报错了, 查看占用的端口, 然后 kill 就好了。

```
netstat -ntpl
kill -9 ***
```

