const Sequelize = require('sequelize')
const slugify = require('slugify')

const db = require('../lib/db')

const Manufacturer = db.define('manufacturer', {
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
})

Manufacturer.hook('beforeSave', (doc, options) => {
  doc.slug = slugify(doc.name, {
    lower: true,
  })
})

module.exports = Manufacturer
