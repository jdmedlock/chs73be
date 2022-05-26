const express = require('express')
const { getClassmates } = require('../controllers/classmates')
const { wakeUp } = require('../controllers/wakeup')

const router = express.Router()

router.route('/classmates')
  .get(getClassmates)
router.route('/wakeup')
  .get(wakeUp)

module.exports = router