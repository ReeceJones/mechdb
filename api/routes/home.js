const express = require('express')
const router = express.Router()

const Keyboard = require('../models/Keyboard')
const Keycap = require('../models/Keycap')
const Switch = require('../models/Switch')

router.get('/', async (req, res, done) => {
  const queryOptions = {
    limit: 10,
    sort: {
      createdAt: -1,
    },
  }
  try {
    const keyboards = await Keyboard.find({}, '_id name slug size', queryOptions)
    const keycaps = await Keycap.find({}, '_id name slug profile', queryOptions)
    const switches = await Switch.find({}, '_id name slug type', queryOptions)
    res.json({
      keyboards,
      keycaps,
      switches,
    })
  } catch (e) {
    done(e)
  }
})

module.exports = router
