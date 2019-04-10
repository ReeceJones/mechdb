const _ = require('lodash')
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
  await doc.setPassword(req.body.password)
  try {
    await doc.save()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

router.post('/signin', async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next('400 Bad request.')
  }

  try {
    const doc = await User.findOne({ email: req.body.email })
    if (!doc) {
      next('403 Unknown email/password.')
    }
    const passwordMatch = await doc.comparePassword(req.body.password)
    if (!passwordMatch) {
      return next('403 Unknown email/password.')
    }

    const token = jwt.sign({ email: doc.email }, config.jwt.secret, config.jwt.opts)
    res.json({ token })

  } catch (e) {
    next('403 Unknown email/password.')
  }
})

router.post('/password', async (req, res, next) => {
  if (!req.body.email) {
    return next('400 Bad request.')
  }

  try {
    const user = await User.findOne({ email: req.body.email })
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
      email: req.body.email,
      passwordToken: req.body.passwordToken,
    })
    if (!user) {
      return next('400 Password reset denied. Please try again.')
    }
    await user.setPassword(req.body.password)
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

router.get('/:username', async (req, res, next) => {
  try {
    const doc = await User.findOne({ username: req.params.username }, 'username isAdmin isVerified reputation')
    if (!doc) {
      next('404 User does not exist.')
    }
    res.json(doc)

  } catch (e) {
    next(e)
  }
})

router.post('/:username/verify', auth.isLoggedIn, auth.isAdmin, async (req, res, next) => {
  if (req.body.isVerified === undefined) {
    return next('400 Bad request')
  }
  try {
    const doc = await User.findOneAndUpdate({
      username: req.params.username,
    }, {
      isVerified: req.body.isVerified,
    })
    if (!doc) {
      next('404 User does not exist.')
    }
    res.json({ isVerified: req.body.isVerified })

  } catch (e) {
    next(e)
  }
})

router.post('/:username/admin', auth.isLoggedIn, auth.isSuperAdmin, async (req, res, next) => {
  if (req.body.isAdmin === undefined) {
    return next('400 Bad request')
  }
  try {
    const doc = await User.findOneAndUpdate({
      username: req.params.username,
    }, {
      isAdmin: req.body.isAdmin,
    })
    if (!doc) {
      next('404 User does not exist.')
    }
    res.json({ isAdmin: req.body.isAdmin })

  } catch (e) {
    next(e)
  }
})

module.exports = router
