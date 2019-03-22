const express = require('express')
const router = express.Router()

const Switch = require('../models/Switch')

router.get('/', async (req, res, done) => {
  try {
    const data = await Switch.find({}, 'name slug description type').populate('manufacturer')

    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.get('/:slug', async (req, res, done) => {
  const doc = await Switch.findOne({
    slug: req.params.slug,
  }, 'id name slug description photos type')
    .populate('manufacturer')
  if (doc === null) return done('404 Not found')

  res.json(doc)
})

module.exports = router
