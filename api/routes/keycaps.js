const express = require('express')
const router = express.Router()

const Keycap = require('../models/Keycap')

router.get('/', async (req, res, done) => {
  try {
    const data = await Keycap.find({}, 'name slug description profile').populate('manufacturer')
    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.get('/:slug', async (req, res, done) => {
  const doc = await Keycap.findOne({
    slug: req.params.slug,
  }, 'id name slug description text photos profile')
    .populate('manufacturer')
  if (doc === null) return done('404 Not found')

  res.json(doc)
})

module.exports = router
