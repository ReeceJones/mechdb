const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const Edit = require('../models/Edit')

router.get('/', auth.isLoggedIn, auth.isAdmin, async (req, res, done) => {
  try {
    const data = await Edit.findAll({
      order: [['createdAt', 'ASC']],
    })
    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.get('/:id', auth.isLoggedIn, auth.isAdmin, async (req, res, done) => {
  try {
    const data = await Edit.findOne({
      where: { id: req.params.id },
    })
    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.post('/:modelName', auth.isLoggedIn, async (req, res, done) => {
  try {
    const doc = await Edit.create({
      after: JSON.stringify(req.body),
      modelName: req.params.modelName,
      type: 'add',
      createdBy: req.user.id,
    })
    if (req.user.isAdmin) {
      await doc.approve(req.user.id)
    }

    res.json(doc)
  } catch (e) {
    done(e)
  }
})

router.post('/:modelName/:instanceId', auth.isLoggedIn, async (req, res, done) => {
  try {
    const doc = await Edit.create({
      after: JSON.stringify(req.body),
      modelName: req.params.modelName,
      instanceId: req.params.instanceId,
      type: 'edit',
      createdBy: req.user.id,
    })
    if (req.user.isAdmin) {
      await doc.approve(req.user.id)
    }

    const instance = await doc.getInstance()

    res.json({
      edit: doc,
      instance,
    })
  } catch (e) {
    done(e)
  }
})

router.delete('/:modelName/:instanceId', auth.isLoggedIn, async (req, res, done) => {
  try {
    const doc = await Edit.create({
      modelName: req.params.modelName,
      instanceId: req.params.instanceId,
      type: 'delete',
      createdBy: req.user.id,
    })
    if (req.user.isAdmin) {
      await doc.approve(req.user.id)
    }

    res.json(doc)
  } catch (e) {
    done(e)
  }
})

module.exports = router
