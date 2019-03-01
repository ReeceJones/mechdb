const Sequelize = require('sequelize')

const db = require('../lib/db')

const Manufacturer = require('./Manufacturer')

const Keycap = db.define('keycap', {
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

Keycap.belongsTo(Manufacturer)

module.exports = Keycap
