var express = require('express')
var router  = express.Router()
var workoutsCtrl = require('../controllers/workouts')

// Route to display all workouts
router.get('/', workoutsCtrl.index)

// Route to display the form to create a new workout
router.get('/new', workoutsCtrl.new)

// Get /workouts/:id
router.get('/:id', workoutsCtrl.show)

// Route to handle the form submission and create a new workout
router.post('/', workoutsCtrl.create)

// DELETE /workouts/:id
router.delete('/:id', workoutsCtrl.delete)

// Add notes
router.post('/:id/addNote', workoutsCtrl.addNote)

// Delete Notes
// router.post('/:id/notes/:noteId/delete', workoutsCtrl.deleteNote)

// Delete Notes
router.delete('/:id/deleteNote/:noteId', workoutsCtrl.deleteNote)

// Edit form
router.get('/:id/edit', workoutsCtrl.edit)


// Update workout
router.put('/:id', workoutsCtrl.update)


module.exports = router

