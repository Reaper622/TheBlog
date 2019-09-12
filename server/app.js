const Koa = require('koa')
const path = require('path')
const fs = require('fs')
const koaStatic = require('koa-static')

const sourceHandler = require('./utils/source-handler')
const articleRoot = path.join(__dirname, '../articles')


const result = sourceHandler.traverse(articleRoot, filePath => {
  // 对markdown的解析
})

console.log(result)


const app = new Koa()


app.use(koaStatic(path.join(__dirname, '../dist')))

app.listen(4000, () => {
  console.log('Server is running at 4000')
})