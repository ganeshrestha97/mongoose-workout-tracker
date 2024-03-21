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

router.post('/addTrackingData', trackersCtrl.addTrackingData)

router.get('/showSteps', trackersCtrl.viewSteps)
router.get('/showWeight', trackersCtrl.viewWeight)
router.get('/showWaterIntake', trackersCtrl.viewWaterIntake)
router.get('/showCaloriesIntake', trackersCtrl.viewCaloriesIntake)
router.get('/showCaloriesBurn', trackersCtrl.viewCaloriesBurn)
router.get('/showHeartRate', trackersCtrl.viewHeartRate)

router.delete('/:id', trackersCtrl.deleteSteps)
router.delete('/:id', trackersCtrl.deleteWeight)
router.delete('/:id', trackersCtrl.deleteWaterIntake)
router.delete('/:id', trackersCtrl.deleteCaloriesIntake)
router.delete('/:id', trackersCtrl.deleteCaloriesBurn)
router.delete('/:id', trackersCtrl.deleteHeartRate)

module.exports = router

