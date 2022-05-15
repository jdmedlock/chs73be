const express = require('express')
const { getClassmatesJSON } = require('../controllers/classmates')
const { wakeUp } = require('../controllers/wakeup')

const router = express.Router()

router.route('/classmates')
  .get(getClassmatesJSON)
router.route('/wakeup')
  .get(wakeUp)

module.exports = router