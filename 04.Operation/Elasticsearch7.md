### Elasticsearch
> API https://www.elastic.co/cn/elasticsearch/features#---api
- Elasticsearch 基于Lucene、分布式、RESTful接口、Java语言开发 的搜索和分析引擎
- 实现原理：
  - 1.将数据提交到 ES 数据库中
  - 2.通过分词控制器将对应的语句分词,将权重与分词结果一并存入数据
  - 3.用户搜索数据的时候,根据权重将结果排名,打分,返回给用户
- Elasticsearch 是与 `Logstash数据收集和日志解析引擎` 以及 `Kibana分析和可视化平台` 一起开发的
- 三个产品被设计成一个集成解决方案，称为 `Elastic Stack`(以前称为`ELK stack`)
- 分布式
  - cluster:
    - 代表一个集群，集群中有多个节点。其中一个是主节点，主节点是通过选举产生的
    - 主从节点是对于集群内部来说的。es的一个概念是去中心化，从外部来看es集群是一个整体，与任何一个节点通信和整个es集群通信是等价的
  - shards:
    - 代表索引分片，es把一个完整的索引分成为多个分片，分布到不同的节点上，构成分布式搜索
    - 分片的数量只能在创建索引前指定，在索引创建后不能更改
  - replicas:
    - 代表索引副本，可以设置多个副本，副本的作用
    - 1是提高系统的容错性
    - 2是提交es查询效率,es自动对搜索请求进行负载均衡
  - recovery:
    - 代表数据恢复或数据重新分布，es在有节点加入或退出时会根据机器的负载对索引分片进行分配
    - 挂掉的节点重新启动时也会进行数据恢复
  - river:
    - 代表es的一个数据源，也是其它存储方式(如数据库)同步数据到es的一个方法，以插件形式存在
  - gateway:
    - 代表es索引快照的方式，es默认是先把索引放到内存中，当内存满了时再持久化到本地硬盘
    - gateway对索引快照进行存储，但es集群关闭重新启动时会从gateway中读取索引备份数据
    - 支持本地文件系统(默认)、分布式文件系统、Hadoop的HDFS和amazon的s3存储服务

### 安装 Elasticsearch

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