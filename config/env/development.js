
const common = require('./common')

module.exports = {
  db: process.env.DB_HOST,
  // database: process.env.DB_HOST,
  // user: process.env.DB_DATABASE,
  // password: process.env.DB_PASSWORD,
  ...common
}
