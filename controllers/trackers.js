const { escapeXML } = require('ejs')

const Tracker = require('../models/tracker')

module.exports = {
    create,
    show,
    add,
    view,
    delete: deleteSteps
}

async function deleteSteps(req, res) {
    try {
        await Tracker.findByIdAndDelete(req.params.id)
        res.redirect('/trackers/view')
    } catch (error) {
        console.error('Error deleting tracker!', error)
        res.status(500).send('Error deleting tracker')
    }
}

async function view(req, res) {
    try {
        const trackers = await Tracker.find({}).sort({date: -1})
        res.render('trackers/view', { trackers })
    } catch (error) {
        console.error('Error fetching trackers:', error)
        res.status(500).send('Error loading the steps data')
    }
}

async function add(req, res) {
    try {
        await Tracker.create({ steps: req.body.steps, date: req.body.date })
        res.redirect('/trackers/view')
    } catch (error) {
        console.error('Error adding steps:', error)
        res.status(500).send('Error adding new steps')
    }
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
        res.status(500).send('Error saving tracker data')
    }
}