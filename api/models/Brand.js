const mongoose = require('mongoose')
const slugify = require('slugify')

const schema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
}, {
  timestamps: true,
})

schema.pre('save', function () {
  this.slug = slugify(this.name, {
    lower: true,
  })
})

module.exports = mongoose.model('Brand', schema)
