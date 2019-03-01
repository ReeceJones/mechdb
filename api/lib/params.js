const _ = require('lodash')

module.exports = function (req, model) {
  let result = {}
  const params = Object.keys(model.schema.obj)
  _.each(req.body, (value, key) => {
    if (params.indexOf(key) !== -1) {
      result[key] = req.body[key]
    }
  })
  return result
}
