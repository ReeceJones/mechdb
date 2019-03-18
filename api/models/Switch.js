const Sequelize = require('sequelize')
const slugify = require('slugify')

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
  slug: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  photos: {
    type: Sequelize.TEXT,
  },
  type: {
    type: Sequelize.ENUM,
    values: ['Linear', 'Clicky', 'Tactile'],
  },
})

Switch.addHook('beforeValidate', (doc, options) => {
  if (doc.photos && typeof doc.photos === 'object') {
    doc.photos = JSON.stringify(doc.photos)
  }
})
Switch.addHook('beforeSave', (doc, options) => {
  doc.slug = slugify(doc.name, {
    lower: true,
  })
})

Switch.belongsTo(Manufacturer)

module.exports = Switch
