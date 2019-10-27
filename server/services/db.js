const { query } = require('../utils/db')

// 获取数据库全部内容
async function selectAllData() {
  let sql = 'SELECT * FROM blog order by time desc'
  let data = await query(sql)
  return data
}

// 获取单个博客内容
async function getSingleBlog(id) {
  let sql = `SELECT * FROM blog where id = ${id} `
  let data = await query(sql)
  return data
}

// 获取分页博客内容
async function getBlogPage(page) {
  let pageIndex = page * 5
  let sql = `SELECT * FROM blog order by time desc limit ${pageIndex}, 5`;
  let data = await query(sql)
  return data
}

// 获取当前博客数量
async function getBlogCount() {
  let sql = 'SELECT COUNT(id) FROM blog'
  let data = await query(sql)
  return data[0]['COUNT(id)']
}


// 向数据库写入文章
// 设置 标题为唯一键
async function insertBlogs(title, label, time, path) {
  let sql = `insert into blog (title, label, time, path)
            values
             ('${title}', '${label}', '${time}', '${path}')`
  let result = await query(sql)
  return result
}

// 增加阅读数
async function setBlogRead(id) {
  let sql = `update blog set visit = visit + 1 where id = ${id}`
  let result = await query(sql)
  return result
}

// 获取博客
async function getData() {
  let dataList = await selectAllData()
  return dataList
}

// 获取全部文章
async function getArchives() {
  let sql = `select * from blog group by YEAR(time)`
  let result = await query(sql)
  return result
}

// 获取文章热榜
async function getHotArticle() {
  let sql = `select * from blog order by visit desc limit 5`
  let result = await query(sql)
  return result
}

module.exports = {
  getData, 
  insertBlogs, 
  getArchives, 
  getBlogPage,
  getBlogCount,
  getSingleBlog,
  setBlogRead,
  getHotArticle
}
