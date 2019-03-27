const express = require('express')
const router = express.Router()

const Keyboard = require('../models/Keyboard')

router.get('/', async (req, res, done) => {
  try {
    const data = await Keyboard.find({}, '_id name slug size price').populate('manufacturer')
    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.get('/:slug', async (req, res, done) => {
  const doc = await Keyboard.findOne({
    slug: req.params.slug,
  }).populate('manufacturer')
  if (doc === null) return done('404 Not found')

  res.json(doc)
})

// used for "edit" forms
router.get('/edit/:slug', async (req, res, done) => {
  const doc = await Keyboard.findOne({
    slug: req.params.slug,
  })
  if (doc === null) return done('404 Not found')

  res.json(doc)
})

module.exports = router
