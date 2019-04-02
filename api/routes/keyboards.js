const express = require('express')
const router = express.Router()

const { getSearchFilters } = require('../lib/params')

const Keyboard = require('../models/Keyboard')

router.get('/', async (req, res, done) => {
  const findOptions = getSearchFilters(req.query, ['size', 'price', 'availability', 'interface', 'keysLayout', 'layout', 'keycaps', 'firmware', 'bluetooth', 'hotswappable', 'backlighting'])
  try {
    const data = await Keyboard.find(findOptions, '_id name slug size price photos').populate('manufacturer')
    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.get('/:slug', async (req, res, done) => {
  const doc = await Keyboard.findOne({
    slug: req.params.slug,
  }).populate('manufacturer')
    .populate('switches')
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
