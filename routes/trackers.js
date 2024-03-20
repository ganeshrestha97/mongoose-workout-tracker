let express = require('express')
let router = express.Router()
let trackersCtrl = require('../controllers/trackers')
const trackers = require('../controllers/trackers')

router.get('/steps', trackersCtrl.show)

router.get('/weight', trackersCtrl.show)

router.get('/waterIntake', trackersCtrl.show)

router.get('/caloriesIntake', trackersCtrl.show)

router.get('/caloriesBurn', trackersCtrl.show)

router.get('/heartRate', trackersCtrl.show)

router.post('/', trackersCtrl.create)

router.post('/steps', trackersCtrl.add)

router.get('/view', trackersCtrl.view)

router.delete('/:id', trackersCtrl.delete)

module.exports = router

