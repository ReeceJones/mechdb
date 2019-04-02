const _ = require('lodash')

/*
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
*/

module.exports.getSearchFilters = function (query, fields) {
  const filters = _.pick(query, fields)
  return _.mapValues(filters, value => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
  })
}
