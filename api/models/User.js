const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    id: true,
    lowercase: true,
    required: [true, 'is required'],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    unique: true,
  },
  hash: String,
  passwordToken: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  reputation: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})
schema.plugin(uniqueValidator, { message: 'is already taken.' })

schema.methods.setPassword = async function (password) {
  this.hash = await bcrypt.hash(password, 10)
}

schema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.hash)
}

module.exports = mongoose.model('User', schema)
