const express = require('express')
const router = express.Router()

const Keycap = require('../models/Keycap')
const Manufacturer = require('../models/Manufacturer')

router.get('/', async (req, res, done) => {
  try {
    const data = await Keycap.findAll({
      attributes: [
        'name',
        'slug',
        'description',
        'profile',
      ],
      include: [
        {
          model: Manufacturer,
          attributes: ['name'],
        },
      ],
    })
    res.json(data.map(item => {
      item = item.get({ plain: true })
      if (item.manufacturer !== null) {
        item.manufacturer = item.manufacturer.name
      }
      return item
    }))
  } catch (e) {
    done(e)
  }
})

router.get('/:slug', async (req, res, done) => {
  const doc = await Keycap.findOne({
    where: {
      slug: req.params.slug,
    },
    attributes: [
      'id', // only for edit
      'name',
      'slug',
      'description',
      'text',
      'photos',
      'profile',
      'manufacturerId', // only for edit
    ],
    include: [
      {
        model: Manufacturer,
        attributes: ['name', 'slug'],
      },
    ],
  })
  if (doc === null) return done('404 Not found')

  doc.photos = JSON.parse(doc.photos)
  res.json(doc)
})

module.exports = router
