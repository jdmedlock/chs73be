const express = require('express')
const { getClassmates } = require('../controllers/classmates')
const { getFaculty } = require('../controllers/faculty')
const { wakeUp } = require('../controllers/wakeup')

const router = express.Router()

router.route('/classmates')
  .get(getClassmates)
router.route('/faculty')
  .get(getFaculty)
router.route('/wakeup')
  .get(wakeUp)

module.exports = router