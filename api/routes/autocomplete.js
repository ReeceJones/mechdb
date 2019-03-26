const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const Edit = require('../models/Edit')

const models = {
  Keyboard: require('../models/Keyboard'),
  Keycap: require('../models/Keycap'),
  Manufacturer: require('../models/Manufacturer'),
  Switch: require('../models/Switch'),
  Vendor: require('../models/Vendor'),
}

router.get('/:dataset', async (req, res, done) => {
  const Model = models[req.params.dataset] || null
  if (Model === null) {
    return done(new Error('400 Bad request'))
  }

  try {
    const data = await Model.find()
    res.json(data.map(item => ({
      _id: item._id,
      name: item.name,
    })))
  } catch (e) {
    done(e)
  }
})

router.post('/:dataset', auth.isLoggedIn, async (req, res, done) => {
  const Model = models[req.params.dataset] || null
  if (Model === null || !req.body.name) {
    return done(new Error('400 Bad request'))
  }

  try {
    const edit = new Edit({
      after: req.body,
      instanceModel: req.params.dataset,
      type: 'add',
      createdBy: req.user._id,
    })
    await edit.save()
    await edit.approve(null) // use a special user to identify autocomplete edits ?

    const doc = await edit.getInstance()
    res.json({
      _id: doc._id,
      name: doc.name,
    })
  } catch (e) {
    done(e)
  }
})

module.exports = router
