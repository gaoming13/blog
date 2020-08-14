### 安装
wget https://dl.eff.org/certbot-auto
sudo mv certbot-auto /usr/local/bin/certbot-auto
sudo chown root /usr/local/bin/certbot-auto
chmod 0755 /usr/local/bin/certbot-auto
/usr/local/bin/certbot-auto --help

### 生成证书
certbot-auto certonly --manual --agree-tos --no-bootstrap --manual-public-ip-logging-ok --email gaoming13@yeah.net -d diary8.com -d *.diary8.com

### nginx开启ocsp装订

- 1.本地hosts写死：`104.109.129.57 ocsp.int-x3.letsencrypt.org`
- 2.nginx配置
```
ssl on;
ssl_certificate     /etc/letsencrypt/live/diary8.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/diary8.com/privkey.pem;

ssl_trusted_certificate /etc/letsencrypt/live/diary8.com/fullchain.pem;
ssl_stapling on;
ssl_stapling_verify on;

# resolver 8.8.8.8 valid=86400;
# resolver_timeout 10;
```
- 3.测试服务器能否获取到ocsp `ping ocsp.int-x3.letsencrypt.org`
- 4.检测证书状态 `openssl s_client -connect www.diary8.com:443 -status`