const router = require('koa-router')()
const articleHandler = require('../controllers/articles-handler')
const archives = require('../controllers/archives')

router.get('/getblogs', async (ctx) => {
  ctx.set('Content-Type', 'application')
  ctx.body = await articleHandler.getBlogs()
})

// router.get('/getarchives', async (ctx) => {
//   ctx.set('Content-Type', 'application')
//   ctx.body = await archives.getBlogsArchives()
// })



module.exports = router