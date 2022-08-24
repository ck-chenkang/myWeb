# 基于VS code搭建TypeScript环境

[原文](https://blog.csdn.net/Dongteacher/article/details/121740654?spm=1001.2014.3001.5502)

## 一、用Tsc将TS文件转换为js文件

全局安装 `typesctipt`

```js
npm i -g typescript
复制代码
```

创建一个 `TS` 文件

```js
console.log('Hello Ts');
复制代码
```

通过命令转化 `TS`

```js
tsc '文件名'
```

运行

```js
node '文件名'
```

## 二、基于webpack构建自动打包的测试环境

1.安装VS code

2.安装Node.js，可通过`node -v`来查看node的版本号，看是否安装成功

3.新建文件夹，在终端中输入以下代码（也可以手动创建）

```bash
mkdir client-side



cd client-side
```

4.项目初始化

```swift
npm init -y
```

5.在根目录下创建文件夹：src、build、dist、typing

在build下创建：

- webpack.config.js

在src下创建：

- utils：和业务相关的可复用方法
- tools：和业务无关的纯工具函数
- assets：图片字体等静态资源
- api：可复用的接口请求方法
- config：配置文件
- index.ts
- template/index.html:创建文件夹template并在template下创建index.html

 6.全局安装typescript

```coffeescript
npm install typescript -g
```

 7.进入项目根目录

```scss
tsc --init
```

8.安装typescript

```coffeescript
npm install typescript
```

9.配置webpack，安装 webpack、webpack-cli ，webpack-dev-server，npm install cross-env，

html-webpack-plugin，clean-webpack-plugin，ts-loader 

```coffeescript
npm install webpack -D



npm install webpack-cli -D



npm install webpack-dev-server -D



npm install cross-env



npm install html-webpack-plugin -D



npm install clean-webpack-plugin -D



npm install ts-loader -D
```

10.在package.json中添加：

```erlang
{



  "scripts": {



    "start": "cross-env NODE_ENV=development webpack-dev-server --mode=development --config build/webpack.config.js"



  }



}
```

11.在build下的webpack.config.js中书写：

```typescript
const HtmlWebpackPlugin = require("html-webpack-plugin");



const { CleanWebpackPlugin } = require("clean-webpack-plugin");



const path = require('path');          // 本人改动部分



  module.exports = {



    // 指定入口文件



    // 这里我们在src文件夹下创建一个index.ts



    entry: "./src/index.ts",



    // 指定输出文件名



    output: {



      filename: "main.js",



      path: path.resolve(process.cwd(), 'dist'),  // 本人改动部分



    },



    resolve: {



      // 自动解析一下拓展，当我们要引入src/index.ts的时候，只需要写src/index即可



      // 后面我们讲TS模块解析的时候，写src也可以s



      extensions: [".tsx", ".ts", ".js"]



    },



    module: {



      // 配置以.ts/.tsx结尾的文件都用ts-loader解析



      // 这里我们用到ts-loader，所以要安装一下



      // npm install ts-loader -D



      rules: [



        {



          test: /\.tsx?$/,



          use: "ts-loader",



          exclude: /nodemodules/



        }



      ]



    },



    // 指定编译后是否生成source-map，这里判断如果是生产打包环境则不生产source-map



    devtool: process.env.NODEENV === "production" ? false : "inline-source-map",



    // 这里使用webpack-dev-server，进行本地开发调试



    devServer: {



      compress: false,        // 这里本人修改 删除了contentBase和stats后不再报错



      host: "localhost",



      port: 8089,



 



    },



    // 这里用到两个插件，所以首先我们要记着安装



    // npm install html-webpack-plugin clean-webpack-plugin -D



    plugins: [



      // 这里在编译之前先删除dist文件夹



      new CleanWebpackPlugin({



        cleanOnceBeforeBuildPatterns: ["./dist"]



      }),



      // 这里我们指定编译需要用模板，模板文件是./src/template/index.html，所以接下来我们要创建一个index.html文件



      new HtmlWebpackPlugin({



        template: "./src/template/index.html"



      }),



    ]



  };
```

12.在index.html中书写一些内容：

```xml
<!DOCTYPE html>



<html lang='en'>



  <head>



    <meta charset="UTF-8" />



    <meta name="viewport" content="width=device-width, initial-scale=1.0" />



    <meta http-equiv="X-UA-Compatible" content="ie=edge" />



    <title>TS-Learning</title>



  </head>



  <body>



    <h2>TypeScript环境配置成功</h2>



  </body>



</html>
```

13.可以启动了：

```sql
npm run start
```

14.启动成功，接下来我们在 index.ts 文件里写一点逻辑：

```typescript
// index.ts



let a: number = 123;



 



const h1 = document.createElement("h1");



h1.innerHTML = "Hello, I am Lison";



document.body.appendChild(h1);
```

15.配置一下打包命令，在 package.json 的 scripts 里增加 build 指令：

```swift
{



  "scripts": {



    "test": "echo \"Error: no test specified\" && exit 1",



    "start": "cross-env NODEENV=development webpack-dev-server --mode=development --config ./build/webpack.config.js",



    "build": "cross-env NODEENV=production webpack --mode=production --config ./build/webpack.config.js"



  }



}
```

16.运行如下命令即可执行打包：

```coffeescript
npm run build
```

