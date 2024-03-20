let express = require('express')
let router = express.Router()
let trackersCtrl = require('../controllers/trackers')


// To display all trackers
router.get('/', trackersCtrl.index)

// To displaythe form for new tracker
router.get('/new', trackersCtrl.newTracker)

// To show details of specific tracker
router.get('/:id', trackersCtrl.show)

// To handle form submission and create a new tracker
router.post('/', trackersCtrl.create)

module.exports = router


