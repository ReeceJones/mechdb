const express = require('express')
const router = express.Router()

const { getSearchFilters } = require('../lib/params')

const Keycap = require('../models/Keycap')

router.get('/', async (req, res, done) => {
  const findOptions = getSearchFilters(req.query, ['profile', 'stemType', 'material', 'printMethod', 'sidePrint', 'backlighting'])
  try {
    const data = await Keycap.find(findOptions, '_id name slug profile material printMethod photos').populate('designer')
    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.get('/:slug', async (req, res, done) => {
  const doc = await Keycap.findOne({
    slug: req.params.slug,
  }).populate('manufacturer')
    .populate('designer')
    .populate('baseColors')
    .populate('textColors')
  if (doc === null) return done('404 Not found')

  res.json(doc)
})

// used for "edit" forms
router.get('/edit/:slug', async (req, res, done) => {
  const doc = await Keycap.findOne({
    slug: req.params.slug,
  })
  if (doc === null) return done('404 Not found')

  res.json(doc)
})

module.exports = router
