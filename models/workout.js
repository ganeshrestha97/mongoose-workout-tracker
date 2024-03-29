const mongoose = require('mongoose')


const Schema = mongoose.Schema

const noteSchema = new Schema({
    content: {
        type: String,
        required: true
    }
})

const workoutschema = new Schema({
    exercise: {
        type: String,
        required: true,
        enum: ['Run', 'Push-Up', 'Pull-Up', 'Plank', 'Sit-Up', 'Squat', 'Bike', 'Swim', 'Snowboard', 'Rock-Climb', 'Yoga', 'Table-Tennis', 'Sauna'],
        default: 'Run'
    },
    reps: {
        type: Number,
        required: false,
        min: 1,
        max: 100,
        default: 1
    },
    sets: {
        type: Number,
        required: false,
        min: 1,
        max: 10,
        default: 1
    },
    time: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    date: {
        type: Date,
        required: true
    },
    notes: [noteSchema]
}, {
    timestamps: true
})


module.exports = mongoose.model('Workout', workoutschema)
