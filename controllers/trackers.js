const { escapeXML } = require('ejs')

const Tracker = require('../models/tracker')

module.exports = {
    create,
    newTracker,
    index,
    show
}

function newTracker(req, res) {
    res.render('trackers/new', { title: 'Add New Tracker', errorMsg: '' })
}


async function create(req, res) {
    try {
        const newTracker = new Tracker({
            steps: req.body.steps,
            weight: req.body.weight,
            waterIntake: req.body.waterIntake,
            caloriesIntake: req.body.caloriesIntake,
            caloriesBurn: req.body.caloriesBurn,
            heartRate: req.body.heartRate,
            date: req.body.date
    })
        await newTracker.save()
        res.redirect('/trackers')
    } catch (err) {
        console.error('Error creating tracker!', err)
        res.redirect('/trackers/new')
    }
}


async function index(req, res) {
    try {
        const trackers = await Tracker.find({})
        res.render('trackers/index', { title: 'All Trackers', trackers})
    } catch (error) {
        console.error('Error listing trackers:', error)
        res.redirect('/')
    }
}

async function show(req, res) {
    try {
        const tracker = await Tracker.findById(req.params.id)
        res.render('trackers/show', { title: 'Tracker Detail', tracker })
    } catch (error) {
        console.error('Error showing tracker:', error)
        res.redirect('/trackers')
    }
}