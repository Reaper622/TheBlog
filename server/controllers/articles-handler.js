const path = require('path')
const fs = require('fs')
const { insertBlogs, getData } = require('../services/db')

const sourceHandler = require('../utils/source-handler')
const articleRoot = path.join(__dirname, '../../articles')


// 上传博客信息到数据库
async function updateBlog() {
  sourceHandler.traverse(articleRoot, (filePath, year, month, day, filename ) => {
    let title = filename.split('.')[0]
    // 将文件路径中 / 转为 // 防止转义
    insertBlogs(title, '前端技术', `${year}-${month}-${day}`, filePath.replace(/\\/g, '\\\\'))
  })
}

// 获取博客信息
async function getBlogs() {
  const data = await getData()
  // 读取markdown文件信息
  data.map(blog => {
    blog.content = fs.readFileSync(blog.path).toString()
  })
  console.log(data)
}


module.exports = { updateBlog, getBlogs }