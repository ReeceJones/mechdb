const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')

const config = require('../config')
const auth = require('../middlewares/auth')
const User = require('../models/User')

router.get('/', auth.isLoggedIn, (req, res) => res.json({
  email: req.user.email,
  name: req.user.name,
  isAdmin: req.user.isAdmin,
}))

router.post('/signin', (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next('400 Bad request.')
  }

  const delayedError = () => {
    setTimeout(() => next('403 Unknown email/password.'), 1500)
  }

  User.findOne({ email: req.body.email })
    .then(doc => {
      doc.comparePassword(req.body.password)
        .then(passwordMatch => {
          if (!passwordMatch) {
            return delayedError()
          }

          const token = jwt.sign({ email: doc.email }, config.jwt.secret, config.jwt.opts)
          res.json({ token })
        })
    }).error(delayedError)
})

router.post('/signout', (req, res, next) => {
  // TODO : invalidate token
  res.status(200).send()
})

module.exports = router
