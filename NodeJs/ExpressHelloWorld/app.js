const express = require('express')
var fs = require('fs')
const path = require('path')
const app = express()
const port = 3000

const bodyParser = require("body-parser");
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
var jsonParser = bodyParser.json();

//express中设置cross访问限制
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式  
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
})

app.get('/', (req, res) => {
  var logpath = path.join('C:\\Users\\sontech202006\\Desktop', 'allBatchDetail.json');
  fs.readFile(logpath, 'utf-8', (err, data) => {
    if (err);
    res.send(data);
  });
})

app.post('/areYouOk', jsonParser, function (req, res) {
  console.log(req.body);
  res.send("I'm Fine!");

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})