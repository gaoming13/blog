- `git blame [文件]` 查看某个文件的每行的改动记录
- `git show [commitId]` 查看某次提交改动
- `git clean -xf` 删除当前目录没有被track过的文件和目录, 例如`.DS_Store`
- `git clean -xfn` 删除当前目录没有被track过的文件和目录(只是演习)
- `git push -u origin master` 首次提交时远程版本库为空时
- `ssh-keygen -t rsa -C "gaoming13@yeah.net"` 生成SSH KEY(公钥)

### 库地址

- `git remote -v` 查看版本库地址
- `git remote set-url origin http://gitbucket.gsae-tech.com/git/HIA/GsaeH5.git` 修改版本库地址

### 工作区、暂存区、HEAD 图解

- 回滚到版本e9a22bd（保留该版本到上一版本间的修改）: `git reset e9a22bd`
- 回滚到版本e9a22bd（不保留该版本到上一版本间的修改）: `git reset e9a22bd --hard`
- 回滚到版本e9a22bd（不保留该版本到上一版本间的修改,但保留本地修改）: `git reset e9a22bd --keep`

### 变基
- HEAD -> 本地修改1, git push的时候会以 HEAD 为基, 发现本地修改1前还提交了一次，触发merge
- git rebase 将merge分叉拉直
- git pull --rebase

### 分支同步

- 设置本地分支对应远程分支 `git branch --set-upstream-to=origin/<branch> develop`
- 创建新本地分支(从当前分支) `git co -b develop`
- 创建新本地分支(从指定分支) `git co -b develop master`
- 提交本地分支到远程 `git push origin develop:develop`
- 删除本地分支 `git br -d develop`
- 删除本地分支(强制) `git br -D develop`
- 删除远程分支 `git push origin --delete develop`
- 拉取远程分支到本地 `git co develop origin/develop`
- 合并分支(不使用fast-forward方式合并，保留分支的commit历史): `git merge fix55 --no-ff -m 'fix #54 修改了'`
- 合并分支(使用squash方式合并，把多次分支commit历史压缩为一次): `git merge fix55 --squash -m 'fix #54 修改了'`

### 隐藏修改

- 隐藏工作区修改: `git stash`
- 查看所有隐藏修改: `git stash list`
- 查看某个隐藏修改: `git stash show stash@{0} -v`
- 应用某个隐藏修改: `git stash apply stash@{0}`
- 应用并删除某个隐藏修改: `git stash pop stash@{0}`
- 清空隐藏修改: `git stash clear`

### 标签

- 打tag `git tag v1.0`
- 打tag带注释 `git tag v1.0 -m '1.0 must release' 6ff1d02`
- 所有tag `git tag`
- tag详情 `git show v1.0`
- 删除tag `git tag -d v1.0`
- 推送tag `git push origin v1.0`
- 删除本地tag `git tag -d v1.9.1`
- 删除远程tag `git push origin :refs/tags/v1.9.1`

### 日志

- 指定作者: `git log --author=zhaoliming`
- 指定关键字: `git log --grep=fix111`

### 差别

- 查看差异(工作区与暂存区): `git di`
- 查看差异(暂存区与HEAD): `git di --staged`
- 查看差异(工作区与HEAD): `git di HEAD`、 `git di --staged HEAD`
- 查看版本差异: `git di ed77575 3b61ca2`
- 查看README.md差异(版本fa36262与2a8206e): `git di fa36262 HEAD README.md`
- 查看版本的改动: `git show 056c540`、 `git show HEAD~1 1.js`

### 配置别名
```bash
git config color.ui true
git config --global alias.di 'diff'
git config --global alias.st 'status'
git config --global alias.co 'checkout'
git config --global alias.ci 'commit'
git config --global alias.br 'branch'
git config --global alias.bra 'branch -av'
git config --global alias.unstage 'reset HEAD'
git config --global alias.last 'log -1'
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
git config --global alias.lga "log --color --stat --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
git config --global user.name 'zhaoliming'
git config --global user.email 'zhaoliming@ogmall.com'
git config core.ignorecase false
```

### git服务器配置

参考 <https://git-scm.com/book/zh/v2/>

```
user add git
```

```
mkdir .ssh && chmod 700 .ssh
touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys
```

```
cd /opt/git
mkdir project.git
cd project.git
git init --bare
```

```
git clone git@127.0.0.1:/opt/git/project.git
cd project
vim README
git commit -am 'fix for the README file'
git push -u origin master
```

git-shell 是shell受限工具
```
vim /etc/passwd

git:x:1004:1004:git version control:/home/git:/usr/bin/git-shell
```

### GitFlow
- hotfix-123 热修复分支
  - 1.`git co -b hotfix-123 master` 从master拉取分支
  - 2.在 hotfix-123 上提交修复代码
  - 3.`git merge hotfix-123 --no-ff` 修复完成, 合并到 master 和 develop 分支
  - 4.`git br -D hotfix-123` 删除 hofix分支
- master 生产环境分支, 包含了最近发布到生产环境的代码
- release-v1.2 发版分支
  - 1.`git co -b release-v1.2 develop` 从develop拉取分支
  - 2.在release上测试并修改
  - 3.`git merge release-v1.2 --no-ff` 合并到master分支,打tag上线; 合并到develop分支(如果有必要)
  - 4.`git br -D release-v1.2` 删除release分支
- develop 主开发分支(测试分支)
- feature-xxx 功能分支(不协同开发的话,只为本地分支)
  - 1.`git co -b feature-xxx` 从develop拉取功能分支
  - 2.在feature上开发
  - 3.`git merge feature-xxx --no-ff` 功能OK了, 合并到develop
  - 4.`git br -D feature-xxx` 删除feature分支

实际开发的思路
- master 生产环境分支(始终为最近一期的第一次合并)
- feature-v1.2 项目该期的开发分支
