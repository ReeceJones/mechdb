const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const randomstring = require('randomstring')

const auth = require('../middlewares/auth')

router.post('/', auth.isLoggedIn, async (req, res, done) => {
  try {
    if (!req.body.data) {
      return done('400 Bad request')
    }

    var match = req.body.data.match(/^data:image\/([\w+]+);base64,([\s\S]+)/)
    var baseType = {
      jpeg: 'jpg',
      'svg+xml': 'svg',
    }

    if (!match) {
      done('400 Base64 data error')
    }

    const extname = baseType[match[1]] || match[1]
    const base64 = match[2]

    const filepath = '/uploads'
    console.log('filepath', filepath)

    let filename
    while (!filename) {
      filename = randomstring.generate({
        length: 12,
        charset: 'alphanumeric',
        capitalization: 'lowercase',
      }) + '.' + extname
      try {
        fs.statSync(path.join(filepath, filename))
        filename = null
      } catch (err) {
        if (err.code === 'ENOENT') {
          // file does not exist : we are good
        } else {
          return done(err)
        }
      }
    }

    fs.writeFileSync(path.join(filepath, filename), base64, { encoding: 'base64' })

    res.json({ filename })
  } catch (e) {
    done(e)
  }
})

module.exports = router
