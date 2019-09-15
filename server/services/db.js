const { query } = require('../utils/db')

// 获取数据库全部内容
async function selectAllData() {
  let sql = 'SELECT * FROM blog order by time desc'
  let data = await query(sql)
  // console.log('data',data)
  return data
}


// 向数据库写入文章
// 设置 标题为唯一键
async function insertBlogs(title, label, time, path) {
  let sql = `insert into blog (title, label, time, path)
            values
             ('${title}', '${label}', '${time}', '${path}')`
  let result = await query(sql)
  console.log(result)
  return result
}

// 获取博客
async function getData() {
  let dataList = await selectAllData()
  return dataList
}

module.exports = {getData, insertBlogs}
