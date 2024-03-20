const { escapeXML } = require('ejs')

const Tracker = require('../models/tracker')

module.exports = {
    create,
    show
}

async function show(req, res) {
    try {
        let page

        switch (req.path) {
            case '/steps':
                page = 'trackers/steps'
                break
            case '/weight':
                page = 'trackers/weight'
                break
            case '/waterIntake':
                page = 'trackers/waterIntake'
                break
            case '/caloriesIntake':
                page = 'trackers/caloriesIntake'
                break
            case '/caloriesBurn':
                page = 'trackers/caloriesBurn'
                break
            case '/heartRate':
                page = 'trackers/heartRate'
                break
        }

        res.render(page, { title: 'Track My' + req.path.substring(1) })
    } catch (error) {
        console.error('Error loading tracking tracking:', error)
        res.status(500).send('Error loading the page to track ' + req.path.substring(1))
    }
}


async function create(req, res) {
    try {
        const data = {
            date: req.body.date
        }
        if (req.body.steps) data.steps = req.body.steps
        if (req.body.weight) data.weight =req.body.weight
        if (req.body.waterIntake) data.waterIntake =req.body.waterIntake
        if (req.body.caloriesIntake) data.caloriesIntake = req.body.caloriesIntake
        if (req.body.caloriesBurn) data.caloriesBurn =req.body.caloriesBurn
        if (req.body.heartRate) data.heartRate =req.body.heartRate

        await Tracker.create(data)
        res.redirect('/trackers')
    } catch (error) {
        console.error('Error saving data!', error)
        res.redirect('/')
    }
}