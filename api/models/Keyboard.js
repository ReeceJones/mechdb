const mongoose = require('mongoose')
const slugify = require('slugify')

const schema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  text: String,
  photos: [String],
  size: {
    type: String,
    enum: [null, 'macropad', '40', '45', '60', '65', '75', 'tkl', 'full'],
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer',
  },
}, {
  timestamps: true,
})

schema.pre('save', function () {
  this.slug = slugify(this.name, {
    lower: true,
  })
})

module.exports = mongoose.model('Keyboard', schema)
