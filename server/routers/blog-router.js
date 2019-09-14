const router = require('koa-router')()
const articleHandler = require('../controllers/articles-handler')

router.get('/getblogs', async (ctx) => {
  ctx.set('Content-Type', 'application')
  ctx.body = await articleHandler.getBlogs()
})



module.exports = router