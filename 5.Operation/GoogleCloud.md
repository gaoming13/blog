```sh
# 登陆账号
gcloud auth login

# 帮助文档 https://cloud.google.com/storage/docs/hosting-static-website

# gsutil 设置index页面,默认404页面
gsutil web set -m index.html -e 404.html gs://sieber-movie1
# 公开数据
gsutil iam ch allUsers:legacyObjectReader gs://sieber-movie1
# 查看配置
gsutil web get gs://sieber-movie1
# 复制单个文件
gsutil cp robots.txt gs://sieber-movie1
# 复制多个文件(递归同步)
gsutil -m rsync -R ./* gs://sieber-movie1
# 删除目录
gsutil -m rm -r gs://sieber-movie1/gcdm
# 列出目录
gsutil -m ls gs://sieber-movie1/
```

34.120.22.154