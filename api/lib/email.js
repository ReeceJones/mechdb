const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API, domain: process.env.MAILGUN_DOMAIN })

module.exports = {
  send: async (data) => {
    data.from = 'MechDB.net <noreply@mechdb.net>'
    return mailgun.messages().send(data)
  },
}
