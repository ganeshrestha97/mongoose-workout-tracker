const { escapeXML } = require('ejs')

const Workout = require('../models/workout')

module.exports = {
    new: newWorkout,
    create,
    index,
    show,
    addExercise,
    delete: deleteWorkout,
    addNote,
    deleteNote
}

async function deleteNote(req, res) {
    try {
        const workout = await Workout.findById(req.params.id);
        workout.notes = ''; // Clearing the note
        await workout.save();
        res.redirect(`/workouts/${req.params.id}`);
    } catch (error) {
        console.error('Error deleting note:', error);
        res.redirect(`/workouts/${req.params.id}`);
    }
}

async function addNote(req, res) {
    try {
        const workout = await Workout.findById(req.params.id)
        workout.notes = req.body.note
        await workout.save()
        res.redirect(`/workouts/${req.params.id}`)
    } catch (error) {
        console.error('Error adding note:', error)
        res.redirect(`/workouts/${req.params.id}`)
    }
}

async function deleteWorkout(req,res) {
    try {
        await Workout.findByIdAndDelete(req.params.id)
        res.redirect('/workouts')
    } catch (error) {
        console.error('Error deleteing workout:', error)
        res.redirect('/workouts')
    }
}

async function addExercise (req, res) {
    try {
        const workout = await Workout.findById(req.params.id)
        workout.exercises.push(req.body)
        await workout.save()
        res.redirect(`/workouts/${req.params.id}`)
    } catch (error) {
        console.error('Error adding exercise', error)
        res.redirect('/workouts')
    }
}

async function show(req, res) {
    try {
    const workout = await Workout.findById(req.params.id)
    res.render('workouts/show', { title: 'Workout Detail', workout })
    }   catch (error) {
        res.redirect('/workouts')
    }
}

async function index(req, res) {
    try {
        const workouts =  await Workout.find({})
        res.render('workouts/index', { title: 'All Workouts', workouts })
    } catch (error) {
        console.error('Error listing workouts:', error)
        res.redirect('/workouts')
    }
}

async function create(req, res) {
    try {
        await Workout.create(req.body)
        res.redirect('/workouts')
    } catch (err) {
        console.error('Error creating workout:', err)
        res.render('workouts/new', {
            title: 'Add New Workout',
            errorMsg: err
        })
    }
}

function newWorkout(req, res) {
    res.render('workouts/new', {
        title: 'Add New Workout',
        errorMsg: ''
    })
}