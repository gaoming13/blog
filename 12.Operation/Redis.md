> https://mp.weixin.qq.com/s?__biz=MzU3NDkwMjAyOQ==&mid=2247485665&idx=1&sn=3cf8e45aaa071fa26975bca34b8878e4&chksm=fd2a1283ca5d9b95889dbc3ec5949f784f6b8e6b469e49675731a8a544321fc4633058e27c41&scene=178&cur_album_id=1708320618028318723#rd
### 高性能
- 1.Reids 的 QTS 可以达到约 10万(每秒请求数)
- 2.纯内存操作，一般都是简单的存取操作
- 3.整个 Redis 就是一个全局 哈希表，时间复杂度是 O(1)
  - 为了防止哈希冲突导致链表过长，Redis会执行 rehash 操作，扩充 哈希桶数量，减少哈希冲突
- 4.对数据存储进行了优化(每种数据类型都有一种或者几种数据结构来支撑)
- 5.单线程模型(Redis的网络 IO 以及键值对指令读写是由一个线程来执行的)
  - Redis的持久化、集群数据同步、异步删除等都是其它线程执行
  - Redis是基于内存操作，CPU 不是 Redis 的瓶颈，瓶颈最有可能是内存大小或者网络带宽
- 6.I/O 多路复用模型
  - 多路指的是多个 socket 连接，复用指的是复用一个线程

### 高可用
- 宕机后如何快速恢复
  - 1.RDB 内存快照
    - RDB 文件，是 Redis DataBase 的缩写
    - Redis 定时执行 RDB 内存快照，这样不必每次执行写指令都写磁盘
    - Redis 使用 bgsave 对当前内存中的所有数据做快照，这个操作是子进程在后台完成的，允许主线程同时修改数据
  - 2.AOF 写后日志
    - AOF 日志记录的是 Redis 服务器的顺序指令序列，AOF 日志只记录对内存修改的指令记录
    - AOF 配置项 appendfsync 写回策略直接决定了 AOF 持久化功能的效率与安全性
      - always 同步写回，写指令执行完毕后立马将 aof_buf 缓冲区的内容刷写到 AOF 文件
      - everysec 每秒写回
      - no 操作系统决定何时写到磁盘
  - 3.Redis 4.0 混合日志模型(rdb文件内容 + 增量AOF日志文件)
- 主从复制
  - 数据复制是单项的，只能从主节点 (master) 到从节点 (slave)
  - 读操作：主、从库都可以执行
  - 写操作：主库先执行，之后将写操作同步到从库
  - 搭建 `./redis-server --port 7777 --replicaof 127.0.0.1 8888`
- 哨兵集群
- Cluster 分片集群

### 高扩展
- 负载均衡

### 常见的5种数据类型
- 1.String 字符串：
  - `set key val EX 10`
  - 场景：缓存、计数器、分布式锁等
  - 数据结构：简单动态字符
- 2.List 列表：
  - 头部插入 `lpush mylist val1 val2 val3` / 尾部插入 `rpush mylist val1 val2 val3`
  - 取出最后一个元素，插入另一列表头部 `brpoplpush mylist mylist2 0`
  - 某个元素前插入一个元素 `LINSERT mylist before 'val2' 'val3'` / 某个元素前 `LINSERT mylist after 'val2' 'val3'`
  - 列出index 0到9的元素 `lrange mylist 0 9`
  - 通过索引获取列表中的元素 `LINDEX mylist 1`
  - 列表长度 `llen mylist`
  - 移除+列表第一个元素 `blpop mylist 1` / 移除+获取最后元素 `brpop mylist 1`
  - 移除与参数相同的元素 `rrem mylist 0 'val1'`
  - 场景：文章评论列表分页
  - 数据结构：压缩列表 / 双端列表
- 3.Hash 字典：
  - 场景：用户信息、Hash表等
  - 新建 `hmset user01 no 123456 age 23`
  - 更改 `hset user01 age 33`
  - 获取 `hgetall user01`
  - 获取 `hget user01 age`
  - 数据结构：压缩列表 / 哈希表
- 4.Set 集合：
  - 没有重复，无序集合，集合中的元素没有先后顺序
  - 集合中添加新元素 `sadd myset 'one'`
  - 列出集合中所有元素 `smembers myset`
  - 判断元素是否在集合中 `sismember myset 'one'`
  - 对2个集合求并集 `sunion myset myset2`
  - 场景：去重、赞、踩、共同好友等
  - 数据结构：intSet / 哈希表
- 5.Zset
  - 没有重复，有序集合，每个元素都关联了一个序号(score)，这便是排序的依据
  - 添加元素 `zadd myzset1 999 baidu.com`
  - 列出所有元素 `zrange myzset1 0 -1`
  - 场景：有序集合：访问量排行榜、点击量排行榜等
  - 数据结构：压缩列表 / 跳跃表

### 底层6中种数据结构
- 1.SDS 简单动态字符
  - 特殊位置标示 buffer中空闲空间长度 和 实际内容长度len
  - O(1)时间复杂度获取字符串长度，C语言字符串需要遍历遇到 '\0' 时结束，O(n) 时间复杂度
  - 空间预分配：SDS被修改后，程序不仅会分配所需要的必须空间，还会额外分配未使用的空间
  - 惰性空间释放：对 SDS 进行缩短操作时，程序并不会回收多余的内存空间
  - 二进制安全：C 中遇到 '\0' 则表示字符串结束，但在SDS中，标示字符串结束的是 len 属性
- 2.哈希表
  - Reids 整体就是一个哈希表保存所有的键值对
  - 哈希表，本质就是一个数组，每个元素是个链表(哈希桶)，桶里的每个entry保存着实际具体值的指针
  - 数据结构
    - ka -> (ka1,ka4,ka6)哈希桶
    - kb -> ka2       |-> addr(key/value)
- 3.zipList 压缩列表
  - 当一个列表只有少量数据的时候，并且每个列表项是小整数值或较短的字符串，那么 Redis 就会用压缩列表来做列表健的底层实现
  - 数据结构(总字节数 / 最后一个元素距起始位置的偏移量 / 元素个数 / 元素1 / 元素2 / 结束标识)
- 4.linkedList 双端列表
- 5.skipList 跳跃表
  - 一种有序数据结构，通过在每个节点维持多个指向其它节点的指针，从而打到快速访问节点的目的
  - 跳表在链表的基础上，增加了多层级索引，通过索引位置的几个跳转，实现数据的快速定位
- 6.intSet 整数数组
  - 当一个集合只包含整型元素，并且这个集合的元素数量不多时，Redis就会使用整数集合作为集合键的底层实现
