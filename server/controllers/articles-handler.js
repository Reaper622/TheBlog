const path = require('path')
const fs = require('fs')
const { insertBlogs, getData, getBlogPage, getBlogCount, getSingleBlog } = require('../services/db')

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
  const num = await getBlogCount()
  // 读取markdown文件信息
  data.map(blog => {
    blog.content = fs.readFileSync(blog.path).toString()
  })
  return {blogs: data, blogCount: num}
}

// 分页获取博客信息
async function getBlogByPage(page) {
  const data = await getBlogPage(page)
  const num = await getBlogCount()
  data.map(blog => {
    blog.content = fs.readFileSync(blog.path).toString()
  })
  return {blogs: data, blogCount: num}
}

async function getSingleBlogContent(id) {
  const arr = await getSingleBlog(id)
  const data = arr[0]
  data.content = fs.readFileSync(data.path).toString()
  return data
}




module.exports = { updateBlog, getBlogs, getBlogByPage, getSingleBlogContent }