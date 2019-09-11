const Koa = require('koa')
const path = require('path')
const koaStatic = require('koa-static')


const app = new Koa()


app.use(koaStatic(path.join(__dirname, '../dist')))

app.listen(4000, () => {
  console.log('Server is running at 4000')
})