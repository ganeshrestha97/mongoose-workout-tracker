const { escapeXML } = require('ejs')

const Tracker = require('../models/tracker')

module.exports = {
    create,
}


async function create(req, res) {
    try {
        const data = {
            date: req.body.date
        }
        if (req.body.steps) data.steps = req.body.steps
        if (req.body.weight) data.weight =req.body.weight
        if (req.body.waterIntake) data.weight =req.body.waterIntake
        if (req.body.caloriesIntake) data.steps = req.body.caloriesIntake
        if (req.body.caloriesBurn) data.weight =req.body.caloriesBurn
        if (req.body.heartRate) data.weight =req.body.heartRate
        
        await Tracker.create(data)
        res.redirect('/trackers')
    } catch (error) {
        console.error('Error saving data!', error)
        res.redirect('/')
    }
}



