const Sequelize = require('sequelize')
const config = require('../config')

const sequelize = new Sequelize(config.db.uri, {
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
})

module.exports = sequelize
