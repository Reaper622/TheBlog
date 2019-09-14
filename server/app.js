const Koa = require('koa')
const path = require('path')
const koaStatic = require('koa-static')
const { getData } = require('./services/db')
const { updateBlog, getBlogs } = require('./controllers/articles-handler')


getData()

updateBlog()
getBlogs()


const app = new Koa()


app.use(koaStatic(path.join(__dirname, '../dist')))

app.listen(4000, () => {
  console.log('Server is running at 4000')
})