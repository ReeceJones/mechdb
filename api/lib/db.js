const mongoose = require('mongoose')
const config = require('../config')

module.exports.authenticate = function () {
  return mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
  }).then(() => {
    require('../models/User')
  })
}
