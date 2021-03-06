log_format  access  '$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer"  "$http_user_agent" $http_x_forwarded_for';

/usr/local/amh-5.2/vhost/amh-nginx.conf
/usr/local/amh-5.2/web
fastcgi_pass unix:/tmp/php-cgi-amh.sock;

/root/amh/modules

/usr/local/nginx-1.8/sbin/nginx -V 2>&1

cat /usr/local/nginx-1.8/logs/nginx.pid


[查看端口号]
netstat -apn | grep tcp

[编译环境]
yum -y install gcc gcc-c++ autoconf automake make

yum install -y bzip2

### NGINX 1.9.9 1.16.1
[install]
yum -y install gcc gcc-c++ autoconf automake make
yum -y install openssl openssl-devel pcre-devel zlib-devel

/usr/sbin/groupadd -f www
useradd -m -s /sbin/nologin -g www www

cd /usr/local/src
wget http://nginx.org/download/nginx-1.9.9.tar.gz
- https://nginx.org/download/nginx-1.16.1.tar.gz

tar -zxvf nginx-1.9.9.tar.gz
cd nginx-1.9.9
./configure \
--prefix=/usr/local/nginx-1.9.9 \
--user=www --group=www \
--with-http_ssl_module \
--with-http_v2_module \
--with-http_gzip_static_module \
--with-http_v2_module \
--with-threads \
--without-mail_pop3_module \
--without-mail_imap_module \
--without-mail_smtp_module
make
make install

[test]
/usr/local/nginx-1.9.9/sbin/nginx -t
cat /usr/local/nginx-1.9.9/logs/nginx.pid

[start]
/usr/local/nginx-1.9.9/sbin/nginx

[stop]
kill -INT `cat /usr/local/nginx-1.9.9/logs/nginx.pid` #¿ìËÙ¹Ø±Õ,ÀàËÆCtrl+C
or
/usr/local/nginx-1.9.9/sbin/nginx -s stop

[restart]
kill -INT `cat /usr/local/nginx-1.9.9/logs/nginx.pid`
/usr/local/nginx-1.9.9/sbin/nginx

[reload]
kill -HUP `cat /usr/local/nginx-1.9.9/logs/nginx.pid` #Æ½»¬Æô¶¯,¸ü¸ÄÅäÖÃ¶ø²»ÐèÍ£Ö¹²¢ÖØÐÂÆô¶¯·þÎñ
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
PIDFile=/usr/local/nginx-1.16.1/logs/nginx.pid
ExecStartPre=/usr/local/nginx-1.16.1/sbin/nginx -t -c /usr/local/nginx-1.16.1/conf/nginx.conf
ExecStart=/usr/local/nginx-1.16.1/sbin/nginx -c /usr/local/nginx-1.16.1/conf/nginx.conf
ExecReload=/usr/local/nginx-1.16.1/sbin/nginx -s reload
ExecStop=/usr/local/nginx-1.16.1/sbin/nginx -s stop
ExecQuit=/usr/local/nginx-1.16.1/sbin/nginx -s quit
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

systemctl enable nginx.service
systemctl start nginx.service


### PHP 7.0.19
1.编译安装

```
brew install openssl

yum install bzip2
yum install -y openssl openssl-devel libxml2-devel autoconf zlib-devel curl-devel pcre-devel libtool-libs libjpeg-devel libpng libpng-devel freetype-devel gmp-devel

/usr/sbin/groupadd -f www
useradd -m -s /sbin/nologin -g www www;

cd /usr/local/src
wget http://cn2.php.net/distributions/php-7.0.19.tar.bz2
tar -jxvf php-7.0.19.tar.bz2
cd php-7.0.19
./configure \
--prefix=/usr/local/php-7.0.19 \
--enable-fpm \
--with-fpm-user=www \
--with-fpm-group=www \
--with-config-file-path=/usr/local/php-7.0.19/etc \
--with-mysqli=mysqlnd \
--with-pdo-mysql=mysqlnd \
--with-openssl \
--with-zlib \
--with-curl \
--enable-ftp \
--with-gd \
--with-jpeg-dir \
--with-png-dir \
--with-freetype-dir \
--enable-mbstring \
--enable-zip \
--with-gmp \
--with-iconv \
--without-pear \
--disable-phar \
--disable-fileinfo \
--enable-sockets \
--enable-bcmath
make
make install

cp /usr/local/src/php-7.0.19/php.ini-production /usr/local/php-7.0.19/etc/php.ini
cp /usr/local/php-7.0.19/etc/php-fpm.conf.default /usr/local/php-7.0.19/etc/php-fpm.conf
cp /usr/local/php-7.0.19/etc/php-fpm.d/www.conf.default /usr/local/php-7.0.19/etc/php-fpm.d/www.conf

su /usr/local/src/php-7.0.19/sapi/fpm/init.d.php-fpm start
```

2.开机启动

```
cp /usr/local/src/php-7.0.19/sapi/fpm/php-fpm.service /usr/lib/systemd/system/php-fpm.service
systemctl enable php-fpm.service
systemctl start php-fpm.service
systemctl status php-fpm.service
```

### PHP 7.3.10
0.环境依赖

```sh
yum install bzip2
yum install -y openssl openssl-devel libxml2-devel autoconf zlib-devel curl-devel pcre-devel libtool-libs libjpeg-devel libpng libpng-devel freetype-devel gmp-devel

/usr/sbin/groupadd -f www
useradd -m -s /sbin/nologin -g www www;
```

0.libzip

```sh
yum remove -y libzip
wget https://nih.at/libzip/libzip-1.2.0.tar.gz
tar -zxvf libzip-1.2.0.tar.gz
cd libzip-1.2.0
./configure
make && make install

cp /usr/local/lib/libzip/include/zipconf.h /usr/local/include/zipconf.h
```

1.编译安装

```sh
cd /usr/local/src
wget https://www.php.net/distributions/php-7.3.10.tar.gz
tar -zxvf php-7.3.10.tar.gz
cd php-7.3.10
./configure --prefix=/usr/local/php-7.3.10 \
--enable-fpm \
--with-fpm-user=www \
--with-fpm-group=www \
--with-config-file-path=/usr/local/php-7.3.10/etc \
--with-mysqli=mysqlnd \
--with-pdo-mysql=mysqlnd \
--with-openssl \
--with-zlib \
--with-curl \
--with-gd \
--with-jpeg-dir \
--with-png-dir \
--with-freetype-dir \
--enable-mbstring \
--enable-zip \
--with-gmp \
--with-iconv \
--without-pear \
--disable-fileinfo \
--enable-sockets \
--enable-bcmath
make && make install

cp /usr/local/src/php-7.3.10/php.ini-production /usr/local/php-7.3.10/etc/php.ini
cp /usr/local/php-7.3.10/etc/php-fpm.conf.default /usr/local/php-7.3.10/etc/php-fpm.conf
cp /usr/local/php-7.3.10/etc/php-fpm.d/www.conf.default /usr/local/php-7.3.10/etc/php-fpm.d/www.conf
```

2.开机启动

```sh
cp /usr/local/src/php-7.3.10/sapi/fpm/php-fpm.service /usr/lib/systemd/system/php-fpm.service
systemctl enable php-fpm.service
systemctl start php-fpm.service
systemctl status php-fpm.service
```

### MYSQL 5.7.18

```
yum -y install gcc gcc-c++ ncurses ncurses-devel cmake

cd /usr/local/src
wget http://downloads.sourceforge.net/project/boost/boost/1.59.0/boost_1_59_0.tar.gz
tar -zxvf boost_1_59_0.tar.gz
cd boost_1_59_0

https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.18.tar.gz

groupadd mysql;
useradd -s /sbin/nologin -g mysql mysql;

cmake -DCMAKE_INSTALL_PREFIX=/usr/local/mysql-5.7.18 \
-DDEFAULT_CHARSET=utf8 \
-DDEFAULT_COLLATION=utf8_general_ci \
-DWITH_EXTRA_CHARSETS=complex \
-DWITH_READLINE=1 \
-DENABLED_LOCAL_INFILE=1 \
-DWITH_BOOST=/usr/local/src/boost_1_59_0
make & make install

chmod +w /usr/local/mysql-5.7.18;
chown -R mysql:mysql /usr/local/mysql-5.7.18;

/usr/local/mysql-5.7.18/support-files/mysql.server start
```

- 命令行操作日志文件位置：`~/.mysql_history`
- `mycli` 命令行操作mysql智能提示工具

### MYSQL8.0安装

1.安装
yum localinstall https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
yum localinstall https://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm

rpm -ivh http://repo.mysql.com//mysql57-community-release-el7-7.noarch.rpm
yum list mysql-community --showduplicates
mysql-community
yum localinstall mysql57-community-release-el7-8.noarch.rpm

yum list community

2.启动
systemctl start mysqld.service
systemctl status mysqld.service

3.获取初始密码
grep 'temporary password' /var/log/mysqld.log

4.修改初始密码
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';

create user 'root'@'localhost' identified with mysql_native_password by 'W7V&wz%f0l8tvFD4';
alter user 'root'@'localhost' identified with mysql_native_password by 'W7V&wz%f0l8tvFD4';

### REDIS - 3.2.9

wget http://download.redis.io/releases/redis-3.2.9.tar.gz
make

mkdir -p /usr/local/redis-3.2.9/bin/
cp /usr/local/src/redis-3.2.9/src/redis-benchmark /usr/local/redis-3.2.9/bin/
cp /usr/local/src/redis-3.2.9/src/redis-check-aof /usr/local/redis-3.2.9/bin/
cp /usr/local/src/redis-3.2.9/src/redis-check-rdb /usr/local/redis-3.2.9/bin/
cp /usr/local/src/redis-3.2.9/src/redis-cli /usr/local/redis-3.2.9/bin/
cp /usr/local/src/redis-3.2.9/src/redis-sentinel /usr/local/redis-3.2.9/bin/
cp /usr/local/src/redis-3.2.9/src/redis-server /usr/local/redis-3.2.9/bin/
cp /usr/local/src/redis-3.2.9/redis.conf /usr/local/redis-3.2.9/redis-6379.conf

/usr/local/redis-3.2.9/bin/

src/redis-server
src/redis-server

### REDIS - 5.0.6
1.编译安装
cd /usr/local/src/
wget http://download.redis.io/releases/redis-5.0.6.tar.gz
tar -zxvf redis-5.0.6.tar.gz
cd redis-5.0.6
mkdir -p /usr/local/redis-5.0.6/bin/
cp /usr/local/src/redis-5.0.6/src/redis-benchmark /usr/local/redis-5.0.6/bin/
cp /usr/local/src/redis-5.0.6/src/redis-check-aof /usr/local/redis-5.0.6/bin/
cp /usr/local/src/redis-5.0.6/src/redis-check-rdb /usr/local/redis-5.0.6/bin/
cp /usr/local/src/redis-5.0.6/src/redis-cli /usr/local/redis-5.0.6/bin/
cp /usr/local/src/redis-5.0.6/src/redis-sentinel /usr/local/redis-5.0.6/bin/
cp /usr/local/src/redis-5.0.6/src/redis-server /usr/local/redis-5.0.6/bin/
cp /usr/local/src/redis-5.0.6/redis.conf /usr/local/redis-5.0.6/redis-6379.conf

2.开机启动
vim /usr/lib/systemd/system/redis.service

```
[Unit]
Description=Redis Server
After=network.target

[Service]
ExecStart=/usr/local/redis-5.0.6/bin/redis-server /usr/local/redis-5.0.6/redis-6379.conf --daemonize no
ExecStop=/usr/local/redis-5.0.6/bin/redis-cli -p 6379 shutdown
Restart=always

[Install]
WantedBy=multi-user.target
```

systemctl enable redis.service
systemctl start redis.service
systemctl status redis.service


[xdebug]
https://xdebug.org/files/xdebug-2.5.4.tgz
tar -xzf xdebug-2.5.4.tgz
cd xdebug-2.5.4
/usr/local/php-7.0.19/bin/phpize
./configure --enable-xdebug --with-php-config=/usr/local/php-7.0.19/bin/php-config
make
make install

cp /usr/local/src/xdebug-2.5.4/modules/xdebug.so /usr/local/php-7.0.19/lib/php/extensions/no-debug-non-zts-20151012/xdebug.so

vim php.ini
zend_extension=xdebug.so

[mysql]
wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql-community-server
systemctl start mysqld.service
systemctl status mysqld.service
# 初始密码
grep "password" /var/log/mysqld.log
# 修改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY '1r5AKq*U!oR9M#8X';



