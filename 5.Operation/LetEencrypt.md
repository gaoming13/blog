wget https://dl.eff.org/certbot-auto
sudo mv certbot-auto /usr/local/bin/certbot-auto
sudo chown root /usr/local/bin/certbot-auto
chmod 0755 /usr/local/bin/certbot-auto
/usr/local/bin/certbot-auto --help

certbot-auto certonly --manual --agree-tos --no-bootstrap --manual-public-ip-logging-ok --email gaoming13@yeah.net -d diary8.com -d *.diary8.com

certbot-auto certonly --manual --agree-tos --no-bootstrap --manual-public-ip-logging-ok --email gaoming13@yeah.net -d mzt4.com -d *.mzt4.com