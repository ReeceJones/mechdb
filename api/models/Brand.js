const Sequelize = require('sequelize')
const slugify = require('slugify')

const db = require('../lib/db')

const Brand = db.define('brand', {
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

Brand.hook('beforeSave', (doc, options) => {
  doc.slug = slugify(doc.name, {
    lower: true,
  })
})

module.exports = Brand
