let express = require('express')
let router = express.Router()
let trackersCtrl = require('../controllers/trackers')



router.post('/', trackersCtrl.create)

module.exports = router

