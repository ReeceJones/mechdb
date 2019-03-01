const Sequelize = require('sequelize')

const db = require('../lib/db')

const Manufacturer = require('./Manufacturer')

const Switch = db.define('switch', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  image: {
    type: Sequelize.STRING,
  },
}, {
})

Switch.belongsTo(Manufacturer)

module.exports = Switch
