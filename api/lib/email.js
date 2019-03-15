const apiKey = '510685527f593bc26bad7bcde883e34c-de7062c6-100ae3e9'
const domain = 'sandbox440de853a2404d95ad5abf85995566a4.mailgun.org'
const mailgun = require('mailgun-js')({ apiKey, domain })

module.exports = {
  send: async (data) => {
    data.from = 'MechDB.net <noreply@mechdb.net>'
    return mailgun.messages().send(data)
  },
}
