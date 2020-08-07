[查看端口号]
netstat -apn | grep tcp

[编译环境]
yum -y install gcc gcc-c++ autoconf automake make
yum install -y bzip2

### NGINX 1.18.0

[install]
yum -y install gcc gcc-c++ autoconf automake make
yum -y install openssl openssl-devel pcre-devel zlib-devel

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
make
make install

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

### PHP 7.4.9
0.环境依赖

```sh
yum install bzip2
yum install -y openssl openssl-devel libxml2-devel autoconf zlib-devel curl-devel pcre-devel libtool-libs libjpeg-devel libpng libpng-devel freetype-devel gmp-devel
yum install sqlite-devel
yum install oniguruma-devel

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

### MYSQL8.0安装

1.安装
yum localinstall https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
yum list mysql-community-server --showduplicates

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

### 调优

centos7

```sh
# 允许等待中的监听
echo 50000 >/proc/sys/net/core/somaxconn
# tcp连接快速回收
echo 1 >/proc/sys/net/ipv4/tcp_tw_recycle
# tcp连接重用
echo 1 >/proc/sys/net/ipv4/tcp_tw_reuse
# 不抵御洪水攻击
echo 0 >/proc/sys/net/ipv4/tcp_syncookies
```

nginx

```sh
# worker_process 修改为内核数的1-2倍, 一般是4或8, 8以上优化不大
worker_process 2
# 高并发下设为0,但是文件上传需要保持连接, 开发时需注意, 做好业务拆分
keepalive_timeout 0
# 设置worker进程最大打开的连接数, 建议尽量高,比如20480
worker_connections 20480
# 将此值增加到大于worker_processes * worker_connections的值。 应该是增加当前worker运行用户的最大文件打开数值
worker_rlimit_nofile 20480*2
```

php-fpm

```sh
# 60秒内有10次子进程中断,则重启php-fpm, 防止因php垃圾代码造成的中断问题
emergency_restart_threshold =10
emergency_restart_interval =60
# 允许的最大进程数, 一个php-fpm进程大约占用15-40m的内从, 具体设置值需要根据实际情况得出 我这里设为 512
process.max
# 允许的最大请求 ,设置2048
pm.max_requests
# 关掉慢请求日志
;request_slowlog_timeout = 0
;slowlog = var/log/slow.log
```

### 常用指令

```sh
# 计算正在使用的worker进程，正在处理的请求
netstat -anp | grep 'php-fpm'|grep -v 'LISTENING'|grep -v 'php-fpm.conf'|wc -l
# PHP内存开销
ps auxf | grep php | grep -v grep | grep -v master | awk '{sum+=$6} END {print sum}'
```