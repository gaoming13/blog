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