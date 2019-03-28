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
  size: String,
  price: String,
  // specs
  switches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Switch',
  }],
  keycaps: String,
  cable: String,
  pcb: String,
  firmware: String,
  interface: String,
  dimensions: String,
  weight: String,
  // features
  programmable: String,
  simultaneousInput: Boolean,
  bluetooth: Boolean,
  hotswappable: Boolean,
  backlighting: Boolean,
  rgb: Boolean,
  // layout
  keysLayout: String,
  layout: String,
  spacebarSize: String,
  // design
  usbPassthrough: Boolean,
  angle: Number,
  // manufacturing
  caseMaterial: String,
  plateMaterial: String,
  unitsMade: String,
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

module.exports = mongoose.model('Keyboard', schema)
