const mysql = require('mysql')
const config = require('../../config').mysql


// 连接数据库, 创建数据连接池
const pool = mysql.createPool(config)

let query = function (sql, values) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, data) => {
          if ( err ) {
            reject(err)
          } else {
            resolve(data)
          }
          // 释放数据库连接
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }