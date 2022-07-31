# npm yarn

### 安装

安装完node之后，就有了

### 查看源和换源

```
npm config get registry  // 查看npm当前镜像源

npm config set registry https://registry.npm.taobao.org/  // 设置npm镜像源为淘宝镜像

yarn config get registry  // 查看yarn当前镜像源

yarn config set registry https://registry.npm.taobao.org/  // 设置yarn镜像源为淘宝镜像
```

### 源地址

```
npm --- https://registry.npmjs.org/

cnpm --- https://r.cnpmjs.org/

taobao --- https://registry.npm.taobao.org/

nj --- https://registry.nodejitsu.com/

rednpm --- https://registry.mirror.cqupt.edu.cn/

npmMirror --- https://skimdb.npmjs.com/registry/

deunpm --- http://registry.enpmjs.org/
```

### 查看yarn历史版本及指定安装版本

```
# 查看历史版本
npm view yarn versions --json
# 安装最新版本
npm install yarn@latest -g
# 安装指定版本
npm install yarn@1.22.17 -g
```

## yarn以及yrm

yrm是管理yarn源的

yarn安装方法：npm install -g yarn

卸载方法：npm unstall -g yarn

yrm安装方法：

```
npm i -g yrm
```

使用方法：

```
yrm ls     //列出可用的源

  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/        
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
* yarn --- https://registry.yarnpkg.com    //表示当前使用的源


yrm use taobao    //切换源

yrm test    //测试各个元的响应时间
```

### 清理缓存

```
yarn cache clean -f
npm cache clean -f
```



### --save和--save-dev区别

**你项目上线后，仍然需要用的东西用–save；
不需要的一些包，只是在开发时借用环境什么的，可以直接用–save-dev**

### 错误处理

Message "npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead"

[参考链接](https://stackoverflow.com/questions/72401421/message-npm-warn-config-global-global-local-are-deprecated-use-loc)

```
# 已管理员身份打开powershell
Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
npm install --global --production npm-windows-upgrade
npm-windows-upgrade --npm-version latest
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

