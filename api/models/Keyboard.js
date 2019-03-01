const Sequelize = require('sequelize')
const slugify = require('slugify')

const db = require('../lib/db')

const Brand = require('./Brand')
const Manufacturer = require('./Manufacturer')

const Keyboard = db.define('keyboard', {
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
  text: {
    type: Sequelize.TEXT,
  },
  photos: {
    type: Sequelize.TEXT,
  },
  size: {
    type: Sequelize.ENUM,
    values: ['macropad', '40', '45', '60', '65', '75', 'tkl', 'full'],
  },
})

Keyboard.hook('beforeValidate', (doc, options) => {
  if (doc.photos && typeof doc.photos === 'object') {
    doc.photos = JSON.stringify(doc.photos)
  }
})
Keyboard.hook('beforeSave', (doc, options) => {
  doc.slug = slugify(doc.name, {
    lower: true,
  })
})

Keyboard.belongsTo(Brand)
Keyboard.belongsTo(Manufacturer)

module.exports = Keyboard
