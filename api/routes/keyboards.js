const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const Brand = require('../models/Brand')
const Manufacturer = require('../models/Manufacturer')
const Keyboard = require('../models/Keyboard')

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

router.get('/:slug', (req, res, done) => {
  Keyboard.findOne({
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
  }).then((doc) => {
    doc.photos = JSON.parse(doc.photos)
    res.json(doc)
  }).catch(done)
})

router.post('/', auth.isLoggedIn, auth.isAdmin, (req, res, next) => {
  Keyboard.create(req.body)
    .then((doc) => res.json(doc))
    .catch(next)
})

router.post('/:id', auth.isLoggedIn, auth.isAdmin, (req, res, next) => {
  Keyboard.findById(req.params.id).then((doc) => {
    doc.update(req.body)
      .then(() => res.json(doc))
      .catch(next)
  }).catch(next)
})

router.delete('/:id', auth.isLoggedIn, auth.isAdmin, (req, res, next) => {
  Keyboard.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deleted) => {
    res.json({ deleted })
  }).catch(next)
})

module.exports = router
