const mongoose = require('mongoose')
const slugify = require('slugify')

const schema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  text: String,
  photos: [String],
  profile: {
    type: String,
    enum: [null, 'Cherry', 'OEM', 'DSA', 'SA', 'XDA', 'KAT', 'MT3'],
  },
}, {
  timestamps: true,
})

schema.pre('save', function () {
  this.slug = slugify(this.name, {
    lower: true,
  })
})

module.exports = mongoose.model('Keycap', schema)
