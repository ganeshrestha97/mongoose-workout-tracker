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
    deleteNote,
    update,
    edit

}



async function edit(req, res) {
    try {
        const workout = await Workout.findById(req.params.id)
        res.render('workouts/edit', { title: 'Edit Workout', workout })
    } catch (error) {
        console.error('Error loading workout edit form!', error)
        res.redirect('/workouts')
    }
}

async function update(req, res) {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.redirect(`/workouts/${updatedWorkout._id}`)
    } catch (error) {
        console.error('Error updating workout!', error)
        res.redirect(`/workouts${req.params.id}/edit`)
    }
}


async function deleteNote(req, res) {
    try {
        const workout = await Workout.findById(req.params.id)
        console.log(workout)
        // workout.notesId = ''; // Clearing the note
        const noteIndex = workout.notes.findIndex(note => note._id.toString() === req.params.noteId.toString());
        console.log(noteIndex)
        if (noteIndex !== -1) {
            workout.notes.splice(noteIndex, 1);
        }
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
        workout.notes.push(req.body)
        await workout.save()
        res.redirect(`/workouts/${req.params.id}`)
    } catch (error) {
        console.error('Error adding note:', error)
        res.redirect(`/workouts/${req.params.id}`)
    }
}

async function deleteWorkout(req, res) {
    try {
        await Workout.findByIdAndDelete(req.params.id)
        res.redirect('/workouts')
    } catch (error) {
        console.error('Error deleteing workout:', error)
        res.redirect('/workouts')
    }
}

async function addExercise(req, res) {
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
    } catch (error) {
        res.redirect('/workouts')
    }
}

async function index(req, res) {
    try {
        const workouts = await Workout.find({})
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