
const {getArchives} = require('../services/db')


async function getBlogsArchives() {
  let result = await getArchives()
  console.log(result);
}

module.exports = {getBlogsArchives}