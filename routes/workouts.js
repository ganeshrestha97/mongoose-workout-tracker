var express = require('express')
var router  = express.Router()
var workoutsCtrl = require('../controllers/workouts')

// Route to display all workouts
router.get('/', workoutsCtrl.index);

// Route to display the form to create a new workout
router.get('/new', workoutsCtrl.new);

// Route to handle the form submission and create a new workout
router.post('/', workoutsCtrl.create);

module.exports = router;