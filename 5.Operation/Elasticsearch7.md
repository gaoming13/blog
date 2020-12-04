### ElasticSearch
-

### 安装 ElasticSearch

```sh
# 1.1 安装java环境
yum install java-11-openjdk

# 1.2 环境变量
vi /etc/profile
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-11.0.9.11-0.el7_9.x86_64
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$JAVA_HOME/bin

source /etc/profile

# 1.3 查看java版本
java -version

# 2.1 安装elasticsearch
cd /usr/local/src
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.10.0-linux-x86_64.tar.gz
tar -zxvf elasticsearch-7.10.0-linux-x86_64.tar.gz
cd elasticsearch-7.10.0-linux-x86_64

# 2.2 以es角色运行
useradd es
passwd es
chown -R es:es /usr/local/src/elasticsearch-7.10.0
su es

./bin/elasticsearch -p 127.0.0.1:9800 -d

curl 127.0.0.1:9800

# 2.3 systemctl
vim /etc/systemd/system/elasticsearch.service

[Unit]
Description=elasticsearch
After=network.target

[Service]
Type=forking
User=es
LimitNOFILE=100000
LimitNPROC=100000
ExecStart=/usr/local/src/elasticsearch-7.10.0/bin/elasticsearch -d

[Install]
WantedBy=multi-user.target

systemctl enable elasticsearch
systemctl start elasticsearch
```