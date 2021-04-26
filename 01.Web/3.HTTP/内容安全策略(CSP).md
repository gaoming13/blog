### 内容安全策略CSP(Conetent Security Policy)
> https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP
- 通过在 HTTP头部配置 `Content-Security-Policy`
- 或用HTML配置 `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">`
- 来减少和报告 XSS 攻击；指明哪种协议允许使用

### 配置示例

```
# 默认：所有内容来自当前域名
Content-Security-Policy: default-src 'self'
# 默认：所有内容来自当前域名 或 *.a.com
Content-Security-Policy: default-src 'self' *.a.com
# 默认：所有内容来自当前域名；图片：任何来源；音视频：media1.com media2.com；脚本：userscripts.example.com
Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com
# 默认：所有内容来自当前域名；启用测试报告
Content-Security-Policy: default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi

# 仅报告，不执行限制
Content-Security-Policy-Report-Only: default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi
```