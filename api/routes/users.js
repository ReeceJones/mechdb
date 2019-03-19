const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const randomstring = require('randomstring')

const config = require('../config')
const email = require('../lib/email')
const auth = require('../middlewares/auth')
const User = require('../models/User')

router.get('/', auth.isLoggedIn, (req, res) => res.json({
  email: req.user.email,
  username: req.user.username,
  isAdmin: req.user.isAdmin,
  isVerified: req.user.isVerified,
}))

router.post('/', async (req, res, next) => {
  if (!req.body.email || !req.body.username) {
    return next('400 Bad request.')
  }
  const doc = new User({
    email: req.body.email,
    username: req.body.username,
  })
  try {
    await doc.save()
    const token = jwt.sign({ email: doc.email }, config.jwt.secret, config.jwt.opts)
    res.json({ token })
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      if (e.fields.users_username !== undefined) {
        return next('400 Username already in use')
      } else if (e.fields.users_email !== undefined) {
        return next('400 Email is already registered')
      }
      return next('400 ' + e.message)
    }
    if (e.name === 'ValidationError') {
      return next('400 ' + e.message)
    }
    next(e)
  }
})

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

router.post('/password', async (req, res, next) => {
  if (!req.body.email) {
    return next('400 Bad request.')
  }

  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    })
    if (!user) {
      return next('400 Unknown email')
    }
    user.passwordToken = randomstring.generate({
      length: 24,
      charset: 'alphanumeric',
      capitalization: 'lowercase',
    })
    await user.save()

    await email.send({
      to: `${user.username} <${user.email}>`,
      subject: 'Password recovery',
      html: `Click the following link to set a new password.<br><br><a href="http://mechdb.net/auth/reset?token=${user.passwordToken}&email=${user.email}">Update password</a>`,
    })
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.put('/password', async (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.passwordToken) {
    return next('400 Bad request.')
  }

  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        passwordToken: req.body.passwordToken,
      },
    })
    if (!user) {
      return next('400 Password reset denied. Please try again.')
    }
    user.password = req.body.password
    user.passwordToken = null
    await user.save()

    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.post('/signout', (req, res, next) => {
  // TODO : invalidate token
  res.status(200).send()
})

module.exports = router
