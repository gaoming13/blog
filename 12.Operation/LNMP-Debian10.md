### curl 安装
apt-get install curl

### vim 安装
apt-get install vim

### vi删除bug修复
```sh
vi /etc/vim/vimrc.tiny
# 把 set compatible
# 修改改为：set nocompatible
# 加入一句：set backspace=2
```

### NGINX 1.18.0

0.环境依赖

```sh
apt-get install gcc make -y
apt-get install libpcre3-dev -y
```

1.编译安装

```sh
/usr/sbin/groupadd -f www
useradd -m -s /sbin/nologin -g www www

cd /usr/local/src
wget http://nginx.org/download/nginx-1.18.0.tar.gz

tar -zxvf nginx-1.18.0.tar.gz
cd nginx-1.18.0
./configure \
  --prefix=/usr/local/nginx-1.18.0 \
  --user=www --group=www \
  --with-http_ssl_module \
  --with-http_v2_module \
  --with-http_gzip_static_module \
  --with-threads
make && make install
```

[test]
/usr/local/nginx-1.18.0/sbin/nginx -t
cat /usr/local/nginx-1.18.0/logs/nginx.pid
[start]
/usr/local/nginx-1.18.0/sbin/nginx
[stop]
kill -INT `cat /usr/local/nginx-1.9.9/logs/nginx.pid`
or
/usr/local/nginx-1.9.9/sbin/nginx -s stop
[restart]
kill -INT `cat /usr/local/nginx-1.9.9/logs/nginx.pid`
/usr/local/nginx-1.9.9/sbin/nginx
[reload]
kill -HUP `cat /usr/local/nginx-1.9.9/logs/nginx.pid`
or
/usr/local/nginx-1.9.9/sbin/nginx -s reload

[nginx.service]
vim /usr/lib/systemd/system/nginx.service
```
[Unit]
Description=nginx - high performance web server
After=network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
PIDFile=/usr/local/nginx-1.18.0/logs/nginx.pid
ExecStartPre=/usr/local/nginx-1.18.0/sbin/nginx -t -c /usr/local/nginx-1.18.0/conf/nginx.conf
ExecStart=/usr/local/nginx-1.18.0/sbin/nginx -c /usr/local/nginx-1.18.0/conf/nginx.conf
ExecReload=/usr/local/nginx-1.18.0/sbin/nginx -s reload
ExecStop=/usr/local/nginx-1.18.0/sbin/nginx -s stop
ExecQuit=/usr/local/nginx-1.18.0/sbin/nginx -s quit
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

systemctl enable nginx.service
systemctl start nginx.service

### PHP 7.4.9

0.环境依赖

```sh
apt-get install gcc make -y
apt-get install libxml2-dev libssl-dev libsqlite3-dev libz-dev libcurl4-openssl-dev libmpc-dev libonig-dev -y
```

1.编译安装

```sh
/usr/sbin/groupadd -f www
useradd -m -s /sbin/nologin -g www www

cd /usr/local/src
wget https://www.php.net/distributions/php-7.4.9.tar.gz
tar -zxvf php-7.4.9.tar.gz
cd php-7.4.9
./configure --prefix=/usr/local/php-7.4.9 \
  --enable-fpm \
  --with-fpm-user=www \
  --with-fpm-group=www \
  --with-config-file-path=/usr/local/php-7.4.9/etc \
  --with-mysqli=mysqlnd \
  --with-pdo-mysql=mysqlnd \
  --with-openssl \
  --with-zlib \
  --with-curl \
  --enable-mbstring \
  --with-gmp \
  --with-iconv \
  --without-pear \
  --disable-fileinfo \
  --enable-sockets \
  --enable-bcmath
make && make install

cp /usr/local/src/php-7.4.9/php.ini-production /usr/local/php-7.4.9/etc/php.ini
cp /usr/local/php-7.4.9/etc/php-fpm.conf.default /usr/local/php-7.4.9/etc/php-fpm.conf
cp /usr/local/php-7.4.9/etc/php-fpm.d/www.conf.default /usr/local/php-7.4.9/etc/php-fpm.d/www.conf
```

2.开机启动

```sh
cp /usr/local/src/php-7.4.9/sapi/fpm/php-fpm.service /usr/lib/systemd/system/php-fpm.service
systemctl enable php-fpm.service
systemctl start php-fpm.service
systemctl status php-fpm.service
```

```
ERROR: failed to open error_log (/usr/local/php/var/log/php-fpm.log): Read-only file system (30)
此时，selinux是关闭状态，普通用户对这个文件也可写，问题就迷离了。
解决方法：
打开 /usr/lib/systemd/system/php-fpm.service 把
ProtectSystem=true
改成
ProtectSystem=false
```

3.环境变量

```
vi /etc/profile
# 添加 export PATH=$PATH:/usr/local/php-7.4.9/bin
source /etc/profile
```

### MYSQL8.0安装

1.添加MYSQL软件库

```sh
apt install gnupg -y
wget -q http://repo.mysql.com/mysql-apt-config_0.8.15-1_all.deb
dpkg -i mysql-apt-config_0.8.15-1_all.deb

apt update
```

2.安装MYSQL

```sh
apt install mysql-server
```

2.启动
systemctl enable mysql
systemctl start mysql
systemctl status mysql

### REDIS - 6.0.6

1.编译安装
cd /usr/local/src/
wget http://download.redis.io/releases/redis-6.0.6.tar.gz
tar -zxvf redis-6.0.6.tar.gz
cd redis-6.0.6
make
mkdir -p /usr/local/redis-6.0.6/bin/
cp /usr/local/src/redis-6.0.6/src/redis-benchmark /usr/local/redis-6.0.6/bin/
cp /usr/local/src/redis-6.0.6/src/redis-check-aof /usr/local/redis-6.0.6/bin/
cp /usr/local/src/redis-6.0.6/src/redis-check-rdb /usr/local/redis-6.0.6/bin/
cp /usr/local/src/redis-6.0.6/src/redis-cli /usr/local/redis-6.0.6/bin/
cp /usr/local/src/redis-6.0.6/src/redis-sentinel /usr/local/redis-6.0.6/bin/
cp /usr/local/src/redis-6.0.6/src/redis-server /usr/local/redis-6.0.6/bin/
cp /usr/local/src/redis-6.0.6/redis.conf /usr/local/redis-6.0.6/redis-6379.conf

2.开机启动
vim /usr/lib/systemd/system/redis.service

```
[Unit]
Description=Redis Server
After=network.target

[Service]
ExecStart=/usr/local/redis-6.0.6/bin/redis-server /usr/local/redis-6.0.6/redis-6379.conf --daemonize no
ExecStop=/usr/local/redis-6.0.6/bin/redis-cli -p 6379 shutdown
Restart=always

[Install]
WantedBy=multi-user.target
```

systemctl enable redis.service
systemctl start redis.service
systemctl status redis.service

3.环境变量

```
vi /etc/profile
# 添加 export PATH=$PATH:/usr/local/redis-6.0.6/bin
source /etc/profile
```