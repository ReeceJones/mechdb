const _ = require('lodash')
const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const Edit = require('../models/Edit')

router.get('/suggestions', auth.isLoggedIn, auth.isAdmin, async (req, res, done) => {
  try {
    const data = await Edit.find({
      status: 'new',
    }, null, {
      sort: 'createdAt',
    }).populate('createdBy')
    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.get('/', auth.isLoggedIn, auth.isAdmin, async (req, res, done) => {
  try {
    const data = await Edit.find({
      $or: [
        { status: 'approved' },
        { status: 'rejected' },
      ],
    }, null, {
      sort: 'createdAt',
    }).populate('createdBy')
      .populate('approvedBy')
      .populate('rejectedBy')
    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.get('/:id', auth.isLoggedIn, auth.isAdmin, async (req, res, done) => {
  try {
    const data = await Edit.findById(req.params.id)
      .populate('createdBy')
      .populate('approvedBy')
      .populate('rejectedBy')
    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.post('/:instanceModel', auth.isLoggedIn, async (req, res, done) => {
  try {
    const doc = new Edit({
      after: req.body,
      instanceModel: req.params.instanceModel,
      type: 'add',
      createdBy: req.user._id,
    })
    await doc.save()
    if (req.user.isAdmin) {
      await doc.approve(req.user._id)
    }

    res.json(doc)
  } catch (e) {
    done(e)
  }
})

router.post('/:instanceModel/:instanceId', auth.isLoggedIn, async (req, res, done) => {
  try {
    const doc = new Edit({
      after: req.body,
      instanceModel: req.params.instanceModel,
      instanceId: req.params.instanceId,
      type: 'edit',
      createdBy: req.user._id,
    })
    await doc.save()
    if (req.user.isAdmin) {
      await doc.approve(req.user._id)
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

router.delete('/:instanceModel/:instanceId', auth.isLoggedIn, async (req, res, done) => {
  try {
    const doc = new Edit({
      instanceModel: req.params.instanceModel,
      instanceId: req.params.instanceId,
      type: 'delete',
      createdBy: req.user._id,
    })
    await doc.save()
    if (req.user.isAdmin) {
      await doc.approve(req.user._id)
    }

    res.json(doc)
  } catch (e) {
    done(e)
  }
})

module.exports = router
