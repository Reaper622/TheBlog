const { query } = require('../utils/db')

// 获取数据库全部内容
async function selectAllData() {
  let sql = 'SELECT * FROM blog'
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
  // let sql = `insert into blog (title, label, time, path)
  //           select '${title}', '${label}', '${time}', '${path}'
  //           from blog
  //           where not exists(select * from blog where title='${title}')`
  let result = await query(sql)
  console.log(result)
  return result
}

// 获取博客
async function getData() {
  let dataList = await selectAllData()
  console.log(dataList)
}

module.exports = {getData, insertBlogs}
