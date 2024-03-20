var express = require('express')
var router = express.Router()
var Tracker = require('../models/tracker')

/* GET home page. */
router.get('/', function(req, res, next) {
  const workouts = []
  res.render('index', { title: 'Home' })
})


module.exports = router
