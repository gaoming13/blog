[安装]
```sh
bash <(curl -L -s https://install.direct/go.sh)

# 配置文件 /etc/v2ray/config.json

# 启动
systemctl start v2ray
```

### 终端走代理

```sh
# 当前会话 http/https 走代理
export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;
# 当前会话 所有协议 走代理
export ALL_PROXY=http://127.0.0.1:1087
# 取消代理
unset ALL_PROXY

source ~/.bashrc
```

alias简写

```sh
alias setproxy="export ALL_PROXY=http://127.0.0.1:1087"
alias unsetproxy="unset ALL_PROXY"
```