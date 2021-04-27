## 密码(Ciphers)
- CIPHER
- AES
- DES
- RC2

## 公钥基础设施(Public Key Infrastructure, PKI)
- .pem DER编码的证书再进行Base64编码的数据
- .cer,.crt,.der 通常是DER二进制格式的,但Base64编码的也很常见
- .p12 PKCS#12格式,包含证书的同时可能带有密码保护的私钥

- ED25519
- RSA
- RSA-KEM

### X.509
> http://www.imooc.com/article/288067?block_id=tuijian_wz
- X.509概念：证书里包含公钥、身份信息(比如网络主机名、组织名称等)和签名信息(可以是证书签发机构CA的签名，也可以是自签名)
- 数字证书层层颁发，比如 A 持有了可信证书，那么它颁发给 B 的证书也是可信的，B 再颁发给 C 的证书也是可信的
- A、B都被称作认证机构，简称 CA(Certificate authority)
- 其中 A 叫根证书颁发机构,其证书叫根证书; B 叫中级证书颁发机构,其证书叫中介证书; C的证书叫终端证书
  - 根证书：通常预先安装在操作系统和浏览器中，是由大公司和政府联合制作的(用户也可制作，但会提示安全风险)，作为证书链的起点
  - 中介证书：持有中介证书的CA主要负责给终端颁发证书，有收费和免费的
  - 终端证书：用于网站服务中，不会再用作颁发新的证书
- 1.颁发者生成CA证书
  - 1.1 CA为生成一对公钥和私钥(ca.key) `openssl genrsa -out ca.key 1024`
  - 1.2 公钥加上身份信息并用私钥签名,生成CA证书(ca.crt) `openssl req -new -x509 -key ca.key -out ca.crt`
- 2.开发者生成证书签名请求文件,并将文件发给CA签名
  - 2.1 开发者生成一对公钥和私钥(server.key) `openssl genrsa -out server.key 1024`
  - 2.2 公钥加上身份信息并用私钥签名,生成证书签名请求文件(server.csr) `openssl req -new -key server.key -out server.csr`
- 3.CA给开发者颁发终端证书
  - 3.1 CA用自己的私钥(ca.key)对证书签名请求文件(server.csr)进行签名,生成终端证书(server.crt),并发送给开发者
  - `openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt`
  - 3.2 此时 server.csr 没有用了
- 4.开发者将私钥和终端证书安装在服务器中
  - 4.1 privkey.pem 私钥(pkcs8格式) `-----BEGIN PRIVATE KEY-----`
  - 4.2 cert.pem 终端证书(公钥加信息后的签名) `-----BEGIN CERTIFICATE-----`
  - 4.3 chain.pem 证书链上的根证书和中间证书 `-----BEGIN CERTIFICATE-----`
  - 4.4 fullchain.pem 终端证书 + 证书链上的根证书和中间证书 `多个 -----BEGIN CERTIFICATE-----`
- 5.用户请求服务端
  - 5.1 CA证书(ca.crt)预装在用户电脑和浏览器中
  - 5.2 用户向服务端请求，服务端为证明自己的身份，将自己的终端证书(server.crt)发送给用户
  - 5.3 用户使用(ca.crt)对(server.crt)进行解密,判断证书哈希值与签名内的哈希值是否一致
  - 5.4 后续通信，用户与服务端后续通信将会使用新的对称加密算法和随机密钥信息
- openssl相关命令：
```sh
openssl genrsa -out server.key 2048 生成私钥
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in server.key > server_pkcs8.key 私钥转PKCS8格式
openssl rsa -pubout -in server.key -out server.pub 从私钥里提取公钥
openssl req -new -key server.key -out server.csr 生成证书签名请求文件(私钥需提供)
openssl req -new -keyout server.key -out server.csr 生成证书签名请求文件(私钥自动生成)
openssl x509 -req -days 365 -set_serial 01 -in server.csr -CA ca.crt -CAkey ca.key -out server.crt 用CA私钥对证书签名请求文件签名生成证书
openssl verify -CAfile server.crt ca.crt 验证一个证书是否是某一个CA签发
openssl pkcs12 -export -in ca.crt -inkey ca.key -out ca.p12 私钥+证书合成p12文件
openssl pkcs12 -in path.p12 -out newfile.key.pem -nocerts -nodes 从p12文件里面提取私钥
openssl pkcs12 -in path.p12 -out newfile.crt.pem -clcerts -nokeys 从p12文件里面提取证书
openssl x509 -inform der -in baidu.com.cer -out certificate.pem 浏览器cer文件转证书
openssl rsa -noout -text -in server.key 查看私钥信息
openssl req -noout -text -in server.csr 查看签名请求信息
openssl x509 -noout -text -in ca.crt 查看证书信息
openssl x509 -purpose -in cacert.pem 查看一个证书的额外信息
openssl rsa -noout -text -pubin -in apache.pub 查看一个公钥的信息
```

- PKCS#5
- PKCS#7
- PKCS#8
- PKCS#10
- PKCS#12
- ASN.1

## 信息摘要(Message Digests)
- SHA1
- SHA256
- SHA384
- SHA512
- MD5
- HMAC