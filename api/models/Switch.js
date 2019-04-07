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
  type: String,
  stemType: String,
  // specs
  housingColor: String,
  stemColor: String,
  actuationForce: Number,
  bottomOutForce: Number,
  travelLength: Number,
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

module.exports = mongoose.model('Switch', schema)
