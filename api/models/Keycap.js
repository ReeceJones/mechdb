const Sequelize = require('sequelize')
const slugify = require('slugify')

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
  profile: {
    type: Sequelize.ENUM,
    values: ['Cherry', 'OEM', 'DSA', 'SA', 'XDA', 'KAT', 'MT3'],
  },
})

Keycap.hook('beforeValidate', (doc, options) => {
  if (doc.photos && typeof doc.photos === 'object') {
    doc.photos = JSON.stringify(doc.photos)
  }
})
Keycap.hook('beforeSave', (doc, options) => {
  doc.slug = slugify(doc.name, {
    lower: true,
  })
})

Keycap.belongsTo(Manufacturer)

module.exports = Keycap
