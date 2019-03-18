const express = require('express')
const router = express.Router()

const Brand = require('../models/Brand')
const Keyboard = require('../models/Keyboard')
const Manufacturer = require('../models/Manufacturer')

router.get('/', async (req, res, done) => {
  try {
    const data = await Keyboard.findAll({
      attributes: [
        'name',
        'slug',
        'description',
        'size',
      ],
      include: [
        {
          model: Brand,
          attributes: ['name'],
        },
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
      if (item.brand !== null) {
        item.brand = item.brand.name
      }
      return item
    }))
  } catch (e) {
    done(e)
  }
})

router.get('/:slug', async (req, res, done) => {
  const doc = await Keyboard.findOne({
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
      'size',
      'manufacturerId', // only for edit
      'brandId', // only for edit
    ],
    include: [
      {
        model: Brand,
        attributes: ['name', 'slug'],
      },
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
