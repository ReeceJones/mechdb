const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

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

router.get('/:slug', (req, res, done) => {
  Keycap.findOne({
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
  }).then((doc) => {
    doc.photos = JSON.parse(doc.photos)
    res.json(doc)
  }).catch(done)
})

router.post('/', auth.isLoggedIn, auth.isAdmin, (req, res, next) => {
  Keycap.create(req.body)
    .then((doc) => res.json(doc))
    .catch(next)
})

router.post('/:id', auth.isLoggedIn, auth.isAdmin, (req, res, next) => {
  Keycap.findById(req.params.id).then((doc) => {
    doc.update(req.body)
      .then(() => res.json(doc))
      .catch(next)
  }).catch(next)
})

router.delete('/:id', auth.isLoggedIn, auth.isAdmin, (req, res, next) => {
  Keycap.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deleted) => {
    res.json({ deleted })
  }).catch(next)
})

module.exports = router
