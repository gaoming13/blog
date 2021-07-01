### vi删除bug修复
```sh
vi /etc/vim/vimrc.tiny
# 把 set compatible
# 修改改为：set nocompatible
# 加入一句：set backspace=2
```

### PHP 7.4.9
0.环境依赖

```sh
apt-get install gcc make -y
apt-get install libxml2-dev libssl-dev libsqlite3-dev libz-dev libcurl4-openssl-dev libmpc-dev libonig-dev -y
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

```
ERROR: failed to open error_log (/usr/local/php/var/log/php-fpm.log): Read-only file system (30)
此时，selinux是关闭状态，普通用户对这个文件也可写，问题就迷离了。
解决方法：
打开 /usr/lib/systemd/system/php-fpm.service 把
ProtectSystem=true
改成
ProtectSystem=false
```
