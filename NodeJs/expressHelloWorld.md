cd ExpressHelloWorld
npm init 
npm install express --save
新建app.js

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
修改package.json，中scripts为
```json
  "scripts": {
    "start": "node app.js"
  }
```
启动：npm start
