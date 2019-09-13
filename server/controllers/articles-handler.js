const path = require('path')
const { insertBlogs } = require('../services/db')

const sourceHandler = require('../utils/source-handler')
const articleRoot = path.join(__dirname, '../../articles')


// 上传博客信息到数据库
async function updateBlog() {
  sourceHandler.traverse(articleRoot, (filePath, year, month, day, filename ) => {
    let title = filename.split('.')[0]
    insertBlogs(title, '前端技术', `${year}-${month}-${day}`, filePath)
  })
}

module.exports = { updateBlog }