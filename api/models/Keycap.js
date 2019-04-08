const mongoose = require('mongoose')
const slugify = require('slugify')

const schema = new mongoose.Schema({
  name: String,
  slug: String,
  text: String,
  photos: [String],
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer',
  },
  designer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Designer',
  },
  profile: String,
  stemType: String,
  // specs
  material: String,
  printMethod: String,
  sidePrint: Boolean,
  backlighting: Boolean,
  kits: [String],
  // design
  baseColors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Color',
  }],
  textColors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Color',
  }],
  // purchase
  availability: String,
}, {
  timestamps: true,
})

schema.pre('save', function () {
  this.slug = slugify(this.name, {
    lower: true,
  })
})

module.exports = mongoose.model('Keycap', schema)
