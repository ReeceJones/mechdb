const express = require('express')
const router = express.Router()

router.use('/autocomplete', require('./autocomplete'))
router.use('/edits', require('./edits'))
router.use('/home', require('./home'))
router.use('/keyboards', require('./keyboards'))
router.use('/keycaps', require('./keycaps'))
router.use('/manufacturers', require('./manufacturers'))
router.use('/switches', require('./switches'))
router.use('/upload', require('./upload'))
router.use('/users', require('./users'))

module.exports = router
