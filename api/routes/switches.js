const express = require('express')
const router = express.Router()

const { getSearchFilters } = require('../lib/params')

const Switch = require('../models/Switch')

router.get('/', async (req, res, done) => {
  const findOptions = getSearchFilters(req.query, ['type', 'stemType', 'availability'])
  try {
    const data = await Switch.find(findOptions, '_id name slug type photos').populate('manufacturer')
    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.get('/:slug', async (req, res, done) => {
  const doc = await Switch.findOne({
    slug: req.params.slug,
  }).populate('manufacturer')
  if (doc === null) return done('404 Not found')

  res.json(doc)
})

// used for "edit" forms
router.get('/edit/:slug', async (req, res, done) => {
  const doc = await Switch.findOne({
    slug: req.params.slug,
  })
  if (doc === null) return done('404 Not found')

  res.json(doc)
})

module.exports = router
