### HTTP的演变
- 1.HTTP/0.9 - 单行协议,只有GET请求
- 2.HTTP/1.0
- 3.HTTP/1.1 第一个标准化版本(1997)
  - 连接可以复用，节省了多次打开TCP连接加载网页资源的时间
  - 增加管线化计数，允许第一个应答被完全发送前就发送第二个请求
  - 支持响应分块
  - 引入额外的缓存控制机制
  - 引入内容协商机制，包括语言/编码/类型等
  - 增加HOST头，能够使不同域名配置在同一IP地址上
  - 3.1 增加TLS层(1994)
  - 3.2 Restful API,由 API 发起的曹走不再通过新的 HTTP 方法传达，而只是通过使用基础的 HTTP/1.1 方法访问特定的 URI(2000)
  - 3.3 服务器推送消息到浏览器(Server-sent events)；WebSocket，一个新协议，通过升级 HTTP 协议来建立
- 4.HTTP/2(2015)
  - 1.*增加二进制分帧* 将传输的信息分割为更小的消息和帧，并采用二进制编码
  - 2.*压缩了头部* 相同请求不需要再次发送请求头部
  - 3.*多路复用* 并行的请求能在同一链接中处理，移除了 HTTP/1.x中顺序和阻塞的约束
  - 4.*请求优先级*
  - 5.*服务器提示* 允许服务器在客户端缓存中填充数据，通过一个叫服务器推送的机制来提前请求

### HTTP请求与响应
- 请求报文 & 响应报文
  - 请求端(客户端)的HTTP报文叫请求报文，包含 请求行+首部字段+请求体
  - 响应端(服务器端)的HTTP报文叫响应报文，包含 状态行+首部字段+响应体
- *请求行* 请求的方法、URI、HTTP版本
- *状态行* 响应结果的状态码、原因短语、HTTP版本
- *首部字段*
  - 通用首部字段(请求与响应都会使用)
    - Cache-Control     控制缓存的行为
    - Connection        连接的管理
    - Date              创建报文的日期时间
    - Pragma            报文指令
    - Trailer           报文末端的首部一览
    - Transfer-Encoding 指定报文主体的传输编码方式
    - Upgrade           升级为其他协议
    - Via               代理服务器的相关信息
    - Warning           错误通知
  - 请求首部字段
    - Accept              用户代理可处理的媒体类型
    - Accept-Charset      优先的字符集
    - Accept-Encoding     优先的内容编码
    - Accept-Language     优先的语言（自然语言）
    - Authorization       Web认证信息
    - Expect              期待服务器的特定行为
    - From                用户的电子邮箱地址
    - Host                请求资源所在服务器
    - If-Match            比较实体标记（ETag）
    - If-Modified-Since   比较资源的更新时间
    - If-None-Match       比较实体标记（与 If-Match 相反）
    - If-Range            资源未更新时发送实体 Byte 的范围请求
    - If-Unmodified-Since 比较资源的更新时间（与If-Modified-Since相反）
    - Max-Forwards        最大传输逐跳数
    - Proxy-Authorization 代理服务器要求客户端的认证信息
    - Range               实体的字节范围请求
    - Referer             对请求中URI的原始获取方
    - TE                  传输编码的优先级
    - User-Agent          HTTP客户端程序的信息
  - 响应首部字段
    - Accept-Ranges       是否接受字节范围请求
    - Age                 推算资源创建经过时间
    - ETag                资源的匹配信息
    - Location            令客户端重定向至指定URI
    - Proxy-Authenticate  代理服务器对客户端的认证信息
    - Retry-After         对再次发起请求的时机要求
    - Server              HTTP服务器的安装信息
    - Vary                代理服务器缓存的管理信息
    - WWW-Authenticate    服务器对客户端的认证信息
  - 实体首部字段
    - Allow               资源可支持的HTTP方法
    - Content-Encoding    实体主体适用的编码方式
    - Content-Language    实体主体的自然语言
    - Content-Length      实体主体的大小（单位：字节）
    - Content-Location    替代对应资源的URI
    - Content-MD5         实体主体的报文摘要
    - Content-Range       实体主体的位置范围
    - Content-Type        实体主体的媒体类型
    - Expires             实体主体过期的日期时间
    - Last-Modified       资源的最后修改日期时间

### HTTP响应状态码
- 信息响应(100-199)
  - 100 Continue 迄今为止所有内容都是可行的，客户端应继续请求，若已完成，则忽略它
  - 102 Processing 服务器已收到并在处理该请求，但没有响应可用
  - 103 Early Hints 与 Link 链接头一起使用，以允许用户代理在服务器仍在准备响应时开始预加载资源
- 成功响应(200-299)
  - 200 OK 请求成功 🔥
  - 201 Created 请求已成功，并因此创建了一个新的资源
- 重定向(300-399)
  - 300 Multiple Choice 被请求的资源有一系列可供选择的回馈信息，用户或浏览器自行选择一个后重定向
  - 301 Moved Permanently 永久重定向 🔥
  - 302 Found 临时重定向 🔥
  - 304 Not Modified 文档内容(自上次访问以来或者根据请求条件)并没有改变 🔥
  - 307 Internal Redirect
- 客户端错误(400-499)
  - 400 Bad Request 语义有误或请求参数有误 🔥
  - 401 Unauthorized 当前请求需要用户验证 🔥
  - 403 Forbidden 服务器已经理解请求，但是拒绝执行它 🔥
  - 404 Not Found 请求失败，请求的资源在服务器上未发现 🔥
  - 405 Method Not Allowed 请求中指定的请求方法不能被用于请求相应的资源 🔥
  - 406 Not Acceptable 请求资源的内容特性无法满足请求头中的条件
  - 408 Request Timeout 请求超时，客户端没有在服务器预备等待的时间内完成一个请求的发送
  - 410 Gone 永久404
  - 413 Payload Too Large 请求提交的实体数据大小超出了服务器愿意或者能够处理的范围 🔥
  - 414 URI Too Long 长度超过了服务器能够解释的长度 🔥
  - 429 Too Many Requests 用户在给定时间内发送了太多请求 🔥
- 服务器错误(500-599)
  - 500 Internal Server Error 服务器遇到了不知道如何处理的情况 🔥
  - 501 Not Implemented 此请求方法不被服务器支持且无法被处理。只有 GET 和 HEAD 是要求服务器支持的，它们必定不会返回此错误代码
  - 502 Bad Gateway 服务器作为网关需要得到一个请求的响应，但是得到了一个错误的响应 🔥
  - 503 Service Unavailable 服务器没有准备好处理请求。常见原因是服务器因维护或重载而停机。
  - 504 Gateway Timeout 服务器作为网关需要的得到一个请求的响应，但该请求超时 🔥
  - 505 HTTP Version Not Supported 服务器不支持请求中使用的HTTP协议版本

### HTTPS vs HTTP
- HTTPS是以安全为目标的HTTP通道，简单讲是HTTP的安全版，即HTTP下加入SSL层
- 主要作用
  - 1.保证数据传输的安全
  - 2.明确网站的真实性
- 流程
  - 1.Web服务器收到请求后，会将网站的证书(公钥)发给客户端
  - 2.客户端与Web服务器开始协商SSL连接的加密等级
  - 3.客户端根据双方同意的安全等级，建立会话密钥，然后利用网站的公钥将会话密钥加密，并传送给网站
- 缺点
  - 1.协议握手阶段比较费时，会使页面的加载时间延长近50%，增加10%到20%的耗电
  - 2.HTTPS连接缓存不如HTTP高效，会增加数据开销和功耗，甚至已有的安全措施也会因此而受到影响
  - 3.SSL证书需要钱，功能越强大的证书费用越高，个人网站、小网站没有必要一般不会用
  - 4.HTTPS协议的加密范围也比较有限，在黑客攻击、拒绝服务攻击、服务器劫持等方面几乎起不到什么作用
    - 最关键的，SSL证书的信用链体系并不安全，特别是在某些国家可以控制CA根证书，中间人攻击一样可行

### URL的组成
- `http:// baidu.com :80 /path ?q=a #hash`
- 协议 + 主机名 + 端口号 + 资源位置 + QueryString + HashTag

### TCP
- TCP即传输控制协议是一种面向连接的、可靠的、基于字节流的传输层通讯协议
- 三次握手 & 四次挥手
  - 建立TCP连接，就是指建立一个TCP连接时，需要客户端和服务端总共发送3个包以确认连接的建立。
    - 在socket编程中，这一过程由客户端执行connect来触发。
  - 在TCP/IP协议中,TCP协议提供可靠的连接服务,采用三次握手建立一个连接
  - 终止TCP连接，就是指断开一个TCP连接时，需要客户端和服务端总共发送4个包以确认连接的断开
    - 在socket编程中，这一过程由客户端或服务端任一方执行close来触发
  - TCP三次握手建立连接
    - 1.发送端A->接收端B(syn=1,seq=x) "我要跟你建立连接"
      - Client将标志位SYN置为1，随机产生一个值SEQ=x，并将数据包发送给Server
      - Client进入SYN_SENT状态，等待Server确认
    - 2.接收端B->发送端A(syn=1,seq=y,ack=x+1) "好的呀"
      - Server收到数据包后由标志位SYN=1知道Client是要建立连接
      - Server将标志位SYN置为1，ack=x+1，随机产生一个值seq=y
      - 并将数据包发送给Client以确认连接请求
      - Server进入SYN_RCVD状态
    - 3.发送端A->接收端B(syn=1,seq=x+1,ack=y+1) "太棒了"
      - Client收到确认后，检查ack是否为x+1，ACK是否为1
      - 如果正确则将标志位ACK置为1，ack=y+1，并将该数据包发送给Server
      - Server检查ack是否为K+1，ACK是否为1，如果正确则连接建立成功
      - Client和Server进入ESTABLISHED状态，完成三次握手
      - 随后Client与Server之间可以开始传输数据了。
  - TCP四次挥手断开连接
    - 1.发送端A->接收端B(fin=1,seq=x) "我要断开连接"
      - Client发送一个FIN，用来关闭Client到Server的数据传送
      - Client进入FIN_WAIT_1状态
    - 2.接收端B->发送端A(fin=1,seq=y,ack=x+1) "好的,等我数据发送完"
      - Server收到FIN后，发送一个ACK给Client，确认序号为收到序号+1
      -（与SYN相同，一个FIN占用一个序号）
      - Server进入CLOSE_WAIT状态。
    - 3.接收端B->发送端A(fin=1,seq=z,ack=x+1) "好了,要断开了"
      - Server发送一个FIN，用来关闭Server到Client的数据传送
      - Server进入LAST_ACK状态
    - 4.发送端A->接收端B(fin=1,seq=h,ack=z+1) "拜拜了您嘞"
      - Client收到FIN后，Client进入TIME_WAIT状态
      - 接着发送一个ACK给Server，确认序号为收到序号+1
      - Server进入CLOSED状态，完成四次挥手
  - 三次握手解决的问题，为什么不二次握手
    - 请求连接的报文可能滞留了，延误到连接释放以后的某个时间才到达server
    - server收到后，若立马建立连接，server的资源就白白浪费了
  - *keep connection*
    - 如果有大量连接，每次在链接、关闭时都要三次握手四次挥手，明显造成性能低下
    - keep alive可以在传输数据后仍然保持连接
    - 当客户端再次获取数据时，直接使用刚刚空闲下的连接而无需再次握手

### DNS解析
- ARP协议将IP地址转换为MAC地址，DNS协议将域名转换为IP地址(也可以将IP转换为相应的域名)
- 域名服务主要是基于UDP实现的，服务器的端口号为53
- 域名是分层结构：国家顶级域名、通用顶级域名
- 域名服务器：根域名服务器、顶级域名服务器、权限域名服务器、本地域名服务器
- 解析流程
  - 1.主机先向本地域名服务器进行*递归查询*
  - 2.本地域名服务器S1采用*迭代查询*，像一个根域名服务器进行查询
  - 3.根域名服务器告诉S1，下一次应该查询的顶级服务器的IP地址
  - 4.本地域名服务器向顶级服务器进行查询
  - 5.顶级域名服务器告诉S1，下一步查询权限服务器的IP地址
  - 6.S1向权限服务器进行查询
  - 7.权限服务器告诉S1所查询的主机的IP地址
  - 8.S1把查询结果告诉主机

### HSTS (HTTP Strict Transport Security)
> https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Strict-Transport-Security
- 告诉浏览器只能通过 HTTPS 访问当前资源，而不是 HTTP

```
# 设置浏览器收到这个请求后的<expire-time>秒的时间内，凡是访问这个域名都使用 HTTPS 请求
Strict-Transport-Security: max-age=<expire-time>
# 此规则也适应于该网站的所有子域名
Strict-Transport-Security: max-age=<expire-time>; includeSubDomains
# 按照指示提交域名，浏览器将会永不使用非安全的方式连接你的域名(不是标准的一部分)
Strict-Transport-Security: max-age=<expire-time>; preload
```

### 浏览器
- 强缓存 vs 协商缓存
  - 强缓存优先级：pragma -> cache-control -> expires
    - 1.pragma:
      - no-cache(不管本地缓存,向服务器验证当前资源是否更新)=>走协商缓存 🔥
      - no-store(不管本地缓存,直接向服务器请求最新)
    - 2.cache-control: public, max-age=3600, s-maxage=3600
      - 注：HTTP1.1新增的字段，解决expires的问题
      - public 表示可被客户端和代理服务器缓存(默认这个)
      - private 表示仅可被客户端缓存
      - max-age 表示过多少秒后缓存无效
      - s-maxage 针对代理服务器(设置后,相当于public)
      - no-cache(不管本地缓存,向服务器验证当前资源是否更新)=>走协商缓存 🔥
      - no-store(不管本地缓存,直接向服务器请求最新)
    - 3.expires: Thu, 31 Dec 2037 23:55:55 GMT
      - 注：HTTP1.0字段
      - 它是一个格林尼治时间,表示资源过期时间
      - 缺点：客户端时间跟服务器时间可能不一致
  - 协商缓存：
    - 如果设置了 no-cache 和 no-store，则本地缓存会被忽略
      - 会请求服务器验证资源是否更新，如果没更新304,才继续使用本地缓存.
    - 1.last-modified: Tue, 10 Nov 2020 07:08:47 GMT
      - 记录资源最后修改时间，请求资源之后的响应头会增加一个 `last-modified`
      - 当再次请求该资源时，请求头中会带有 `if-modified-since:Thu, 20 Dec 2018 11:36:00 GMT` 字段
      - 服务端会对比该字段和资源的最后修改时间，若一致则返回 304
      - 若不一致则直接返回修改后的资源，并修改 `last-modified` 为新的值
      - 缺点：
        - 1.last-modified 无法确定内容是否改变
        - 2.时间只能精确到秒，一秒内的修改是检测不到的
    - 2.etag: "5faa3c7f-1439"
      - 基于资源内容生成的唯一标识
      - `if-none-match:"5faa3c7f-1439"`

### 图片格式
- JPEG/JPG
  - 关键字 *有损压缩、体积小、加载快、不支持透明*
  - 缺点：处理*矢量图形* *Logo* 等线条感较强、颜色对比强烈的图像时，模糊会明显
  - 场景：大的背景图、轮播图、Banner图
- PNG-8/PNG-24
  - 关键字 *无损压缩、质量高、体积大、支持透明*
  - 缺点：体积大
  - 场景：Logo、颜色简单透明小图
- GIF
- SVG
  - 关键字 *文本文件、体积小、不失真、兼容性好*
  - 缺点：渲染成本比较高、学习成本
- Base64
  - 非图片格式，而是一种编码方式
  - 一种用于传输 8Bit 字节码的编码方式，通过对图片进行 Base64 编码，我们可以直接将编码结果写入 HTML 或者写入 CSS，从而减少 HTTP 请求的次数
  - 编码后，大小会膨胀为原文件的的 4/3
- WebP
  - 关键字 *全能*
  - 缺点：兼容性
  - 像 JPEG 一样对细节丰富的图片信手拈来
  - 像 PNG 一样支持透明
  - 像 GIF 一样可以显示动态图片——它集多种图片文件格式的优点于一身
  -