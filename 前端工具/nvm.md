​                                            

## **介绍nvm之前，我先解释一下前端容易混淆的几个概念** 

```
Node.js：基于Chrome V8引擎的JS运行环境（javascript代码运行环境）

npm： 第三方js插件包管理工具，会随着node一起安装（Node package Manager）

npx：npm5.2之后新增的npx命令
		优点： 
		1、直接到当前项目node_moudle/.bin/路径和$PATH下，寻找命令
		2、避免全局安装，比如脚手架类型的库，通常只会在初始化时用一次，
		   此时就可以通过npmx create-react-app这种方式调用，执行这个命令时，
		    npx会将create-react-app下载到一个临时目录，使用完后再删除。
12345678910
```

## **nvm介紹** 

> [node](https://so.csdn.net/so/search?q=node&spm=1001.2101.3001.7020)的版本管理器，可以方便地安装&切换不同版本的node

> 随着大前端的快速发展，node版本更新很快，我们在工作中，可以会有老版本的node的项目需要维护，也可能有新版本的node的项目需要开发，如果我们只有一个node版本的话将会很麻烦，nvm可以解决我们的难点

## **1、下载** 

下载地址：[nvm github下载地址](https://github.com/coreybutler/nvm-windows/releases)

![在这里插入图片描述](E:\codes\myWeb\前端工具\Imag\20210531232213538.png)

## **2、安装** 

安装需要注意两点

> 1、 把电脑上面的node环境先卸载干净（C:\Users\xiaopao\AppData\Roaming\node下面的文件也要解决干净）

> 2、 安装时，建议选择手动安装版，然后疯狂下一步就行，不要尝试改变安装目录
>  （我因为不想放在C盘，被折磨了好几个小时，老老实实默认下一步，省事）

## **3、检查安装是否成功** 

> 在命令行输入nvm 能出现反应就行OK了

![在这里插入图片描述](E:\codes\myWeb\前端工具\Imag\2021053123294217.png)

## **4、接下来可以愉快的使用nvm了** 

```
	1、安装想要的node版本，可以通过  nvm  ls  available 命令查看可以安装的node版本
1
```

![在这里插入图片描述](E:\codes\myWeb\前端工具\Imag\20210531233637503.png)

```
2、安装方式 nvm install 版本号
current：当前最新的版本
LTS：稳定版本

nvm install 14.17.0 （当前稳定的最新版）

我安装了两个
nvm install 12.12.0
nvm install 10.10.0
使用nvm ls 或者 nvm list可以查看安装的不同node版本，*指向的就是当前版本
12345678910
```

![在这里插入图片描述](E:\codes\myWeb\前端工具\Imag\20210531234121115.png)

```
3、切换node版本
nvm use 10.10.0可以切换node版本
12
```

![在这里插入图片描述](E:\codes\myWeb\前端工具\Imag\20210531234305965.png)

> 4、结束