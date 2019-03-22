const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const Manufacturer = require('../models/Manufacturer')

router.get('/', auth.isLoggedIn, async (req, res, done) => {
  try {
    const data = await Manufacturer.find({}, '_id name', {
      sort: 'name',
    })
    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.get('/:id', (req, res, done) => {
  Manufacturer.findById(req.params.id).then((doc) => {
    res.json(doc)
  }).catch(done)
})

router.post('/', auth.isLoggedIn, auth.isAdmin, (req, res, next) => {
  Manufacturer.create(req.body)
    .then((doc) => res.json(doc))
    .catch(next)
})

router.post('/:id', auth.isLoggedIn, auth.isAdmin, (req, res, next) => {
  Manufacturer.findById(req.params.id).then((doc) => {
    doc.update(req.body)
      .then(() => res.json(doc))
      .catch(next)
  }).catch(next)
})

router.delete('/:id', auth.isLoggedIn, auth.isAdmin, (req, res, next) => {
  Manufacturer.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deleted) => {
    res.json({ deleted })
  }).catch(next)
})

module.exports = router
