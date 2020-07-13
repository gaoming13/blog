- `brew help [COMMAND]` 帮助
- `brew config` 查看配置信息
- `brew update` brew自身更新

### 镜像
- `git -C "/usr/local/Homebrew" remote set-url origin https://github.com/Homebrew/brew` 设置默认镜像
- `git -C "/usr/local/Homebrew" remote set-url origin https://mirrors.ustc.edu.cn/brew` 设置华科大镜像

### 包信息
- `brew list --versions` 列出已安装的包
- `brew list nginx -v` 列出已安装的某个包信息(路径)
- `brew search nginx -v` 搜索某个包
- `brew info nginx` 查看某个包的信息
- `brew upgrade nginx` 升级某个包
- `brew uninstall nginx` 卸载某个包

### 后台服务管理
- `brew services [list]` 列出所有后台服务
- `brew services run nginx` 启动某个服务(不加到开机启动中)
- `brew services start nginx` 启动某个服务,并加到开机启动中
- `brew services stop nginx` 停止某个服务,并取消开机启动
- `brew services restart nginx` 重启某个服务,并加到开机启动中

### 开机启动
- 开机启动即自动创建了 `/Users/zhaoliming/Library/LaunchAgents/homebrew.mxcl.mysql.plist`
- 停止服务后删除了该文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>homebrew.mxcl.nginx</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <false/>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/opt/nginx/bin/nginx</string>
        <string>-g</string>
        <string>daemon off;</string>
    </array>
    <key>WorkingDirectory</key>
    <string>/usr/local</string>
  </dict>
</plist>
```