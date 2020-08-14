### 安装
wget https://dl.eff.org/certbot-auto
sudo mv certbot-auto /usr/local/bin/certbot-auto
sudo chown root /usr/local/bin/certbot-auto
chmod 0755 /usr/local/bin/certbot-auto
/usr/local/bin/certbot-auto --help

### 生成证书
certbot-auto certonly --manual --agree-tos --no-bootstrap --manual-public-ip-logging-ok --email gaoming13@yeah.net -d diary8.com -d *.diary8.com

### nginx开启ocsp装订

```
ssl on;
ssl_certificate     /etc/letsencrypt/live/diary8.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/diary8.com/privkey.pem;

ssl_trusted_certificate /etc/letsencrypt/live/diary8.com/fullchain.pem;
ssl_stapling on;
ssl_stapling_verify on;

resolver 8.8.8.8 valid=86400;
resolver_timeout 10;
```