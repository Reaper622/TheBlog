const Koa = require('koa')
const path = require('path')
const koaStatic = require('koa-static')
const router = require('./routers/router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const { getData } = require('./services/db')
const { updateBlog, getBlogs, getBlogByPage } = require('./controllers/articles-handler')



const app = new Koa()

updateBlog()

// 允许跨域
app.use(cors({
  origin: function (ctx) {
    return "*" // 允许来自所有域名请求
    // return "http://localhost:8090" // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true, // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(bodyParser())

app.use(router.routes()).use(router.allowedMethods())

app.use(koaStatic(path.join(__dirname, '../dist')))

app.listen(4000, () => {
  console.log('Server is running at 4000')
})