const express = require('express')
const router = express.Router()

const { getSearchFilters } = require('../lib/params')
const auth = require('../middlewares/auth')

const Edit = require('../models/Edit')
const User = require('../models/User')

router.get('/', auth.isLoggedIn, auth.isAdmin, async (req, res, done) => {
  try {
    const params = getSearchFilters(req.query, ['instanceModel', 'status'])
    const data = await Edit.find({
      ...params,
    }).sort({ createdAt: -1 })
      .populate('createdBy')
      .populate('approvedBy')
      .populate('rejectedBy')
    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.get('/pending', auth.isLoggedIn, auth.isAdmin, async (req, res, done) => {
  try {
    const nb = await Edit.count({ status: 'new' })
    res.json({ nb })
  } catch (e) {
    done(e)
  }
})

router.get('/:id', auth.isLoggedIn, async (req, res, done) => {
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

router.get('/u/:username', auth.isLoggedIn, async (req, res, done) => {
  if (!req.user.isAdmin && req.params.username !== req.user.username) {
    return done('401 Forbidden.')
  }
  try {
    const user = await User.findOne({
      username: req.params.username,
    })
    if (!user) {
      return done('400 Bad Request')
    }
    const data = await Edit.find({
      createdBy: user._id,
    }).sort({ createdAt: -1 })
      .populate('createdBy')
      .populate('approvedBy')
      .populate('rejectedBy')
    res.json(data)
  } catch (e) {
    done(e)
  }
})

router.post('/:id/approve', auth.isLoggedIn, auth.isAdmin, async (req, res, done) => {
  try {
    const doc = await Edit.findById(req.params.id)
    await doc.approve(req.user._id)
    res.json(doc)
  } catch (e) {
    done(e)
  }
})

router.post('/:id/reject', auth.isLoggedIn, auth.isAdmin, async (req, res, done) => {
  try {
    const doc = await Edit.findById(req.params.id)
    await doc.reject(req.user._id)
    res.json(doc)
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
    if (req.user.isAdmin || req.user.isVerified) {
      await doc.approve()
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
    if (req.user.isAdmin || req.user.isVerified) {
      await doc.approve()
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
