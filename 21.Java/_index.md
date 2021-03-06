### 简介
- JavaSE(J2SE)(Java 2 Platform Standard Edition，java平台标准版）电脑端
- JavaEE(J2EE)(Java 2 Platform Enterprise Edition，java平台企业版) 网站端
- JavaME(J2ME)(Java 2 Platform Micro Edition，java平台微型版) 手机端
- 2011.7 Java SE7
- 2014.3 Java SE8(人多)
  - Lambda表达式(箭头函数)
  - 方法引用
  - 函数式接口
  - 接口默认方法(可不实现)
  - Stream
  - Optional类(解决null)
  - 时间日期API
  - Base64
- 2017.9 Java SE9
  - 模块系统
- 2018.3 Java SE10
- 2018.9 Java SE11(人多)
- 2019.3 Java SE12
- Java SE = jdk + jre
  - Java SE Development Kit(开发工具)
  - Java SE Runtime Environment(运行环境)

#### 语法知识点
- 1.Java主函数main写法
- 2.Java的两大数据类型(内置数据类型/引用数据类型)
- 集合(Collection) 存储元素集合
  - java.util.ArrayList(集合)
  - java.util.LinkedList(链表)
  - java.util.HashSet(哈希)(不允许重复;无序)
- 图(Map) 存储k/v映射
  - java.util.HashMap(散列表)

#### 环境变量配置

```sh
vim ~/.bash_profile

export PATH=$PATH:/Library/apache-tomcat-9.0.41/bin

export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-14.jdk/Contents/Home
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$CATALINA_HOME/lib/servlet-api.jar:$CATALINA_HOME/lib/jsp-api.jar:$JAVA_HOME/selflib/fastjson-1.2.75.jar:$JAVA_HOME/selflib/mysql-connector-java-8.0.22.jar
export PATH=$JAVA_HOME/bin:$CLASSPATH:$PATH:
```

#### java 命令

```sh
# java [选项] x.class [args...]      执行 class 文件
# java [选项] -jar x.jar [args...]   执行 jar 文件
# java [选项] x.java [args]          执行单个 java
# [选项]
#   -cp, -classpath, --class-path   搜索jar路径
#   -verbose:[class|module|gc|jni]  查看详细输出
#   --show-module-resolution        在启动过程中显示模块解析
#   -version, --version             版本信息
#   --list-modules                  列出所有模块

java
```

#### javac 命令

```sh
# javac <选项> x.java
# <选项>
#   --source-path <path>, -sourcepath <path>  指定查找 java 的目录
#   -d <directory>                            指定生成 class 的目录
#   --class-path <path>, -classpath <path>, -cp <path> 搜索jar路径
#   -g                            生成所有调试信息(缺省:只生成行号和源文件信息)
#   -g:{lines,vars,source}        只生成某些调试信息(lines行号,vars局部变量,source源文件)
#   -g:none                       不生成任何调试信息
#   -encoding <encoding>          指定 java 使用的字符编码
#   --source <release>, -source <release>   用哪个版本的编译器对 java 进行编译(7, 8, 9, 10, 11, 12, 13, 14)
#   --target <release>, -target <release>   生成的 class 可在哪个版本虚拟机上运行
#   -verbose                      输出详细编译信息
#   --version, -version           版本信息
javac Start.java
javac -d ./dist Start.java
javac -cp ./tom.jar Hello.java
```

#### jar 命令

```sh
# jar [选项...] [ [--release VERSION] [-C dir] files] ...
# 选项
#   -c, --create          创建 jar
#   -t, --list            列出 jar 里的内容
#   -u, --update          更新 jar
#   -x, --extract         解压 jar
#   -m, --manifest=FILE   指定清单文件 MANIFEST.MF
#   -M, --no-manifest     不为条目创建清单文件 MANIFEST.MF
#   -0, --no-compress     创建 jar 时,仅存储,不使用zip压缩
#   -f, --file=FILE       操作的 jar 文件名
#   -v, --verbose         详细输出
#   --help

# 创建jar包
jar -c -f 1.jar 1.class 2.class
jar -c -f 1.jar -m META-INF/MANIFEST.MF Start.class com
# 列出jar包内容
jar -t -f 1.jar
# 往jar包添加文件
jar -u -f fastjson-1.2.75.jar META-INF/LICENSE.txt
# 解压jar包
jar -x -f fastjson-1.2.75.jar
```

#### jar清单文件(META-INF/MANIFEST.MF)

```
# manifest版本
Manifest-Version: 1.0
# 文件的生成者
Created-By: 1.8.0_121 (Oracle Corporation)

# 入口类,可用 java -jar x.jar 运行
Main-Class: Hello
# 类的搜索路径
Class-Path: Tom.jar
```