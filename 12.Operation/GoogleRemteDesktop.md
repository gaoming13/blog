> https://cloud.google.com/architecture/chrome-desktop-remote-on-compute-engine#creating_a_compute_engine_instance

```sh
# 创建非root用户
adduser tom
usermod -aG sudo tom
su tom

# 安装中文包
sudo apt-get install ttf-wqy-zenhei
```