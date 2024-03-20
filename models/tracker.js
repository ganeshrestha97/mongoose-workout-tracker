const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trackerSchema = new Schema({
    steps: Number,
    weight: Number,
    waterIntake: Number,
    caloriesIntake: Number,
    caloriesBurn: Number,
    heartRate: Number,
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Tracker', trackerSchema)