const mongoose = require('mongoose')
const slugify = require('slugify')

const schema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  text: String,
  photos: [String],
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer',
  },
  // specs
  size: String,
  switches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Switch',
  }],
  cable: String,
  firmware: String,
  interface: String,
  dimensions: String,
  weight: String,
  // features
  programmable: String,
  bluetooth: Boolean,
  hotswappable: Boolean,
  simultaneousInput: Boolean,
  // layout
  keysLayout: String,
  layout: String,
  spacebarSize: String,
  // design
  usbPassthrough: Boolean,
  // manufacturing
  caseMaterial: String,
  plateMaterial: String,
  // purchase
  availability: String,
  vendors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
  }],
}, {
  timestamps: true,
})

schema.pre('save', function () {
  this.slug = slugify(this.name, {
    lower: true,
  })
})

module.exports = mongoose.model('Keyboard', schema)
