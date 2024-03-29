const { escapeXML } = require('ejs')

const Tracker = require('../models/tracker')

module.exports = {
    create,
    show,
    addTrackingData,
    viewSteps,
    deleteSteps,
    viewWeight,
    deleteWeight,
    viewWaterIntake,
    deleteWaterIntake,
    viewCaloriesIntake,
    deleteCaloriesIntake,
    viewCaloriesBurn,
    deleteCaloriesBurn,
    viewHeartRate,
    deleteHeartRate,
}

async function deleteHeartRate(req, res) {
    try {
        await Tracker.findByIdAndDelete(req.params.id)
        res.redirect('/trackers/showHeartRate')
    } catch (error) {
        console.error('Error deleting heart rate!', error)
        res.status(500).send('Error deleting heart rate')
    }
}

async function viewHeartRate(req, res) {
    try {
        const trackers = await Tracker.find({}).sort({})
        res.render('trackers/showHeartRate', { trackers })
    } catch (error) {
        console.error('Error fetching heart rate!', error)
        res.status(500).send('Error loading the heart rate data')
    }
}

async function deleteCaloriesBurn(req, res) {
    try {
        await Tracker.findByIdAndDelete(req.params.id)
        res.redirect('/trackers/showCaloriesBurn')
    } catch (error) {
        console.error('Error deleting calories burn!', error)
        res.status(500).send('Error deleting calories burn')
    }
}

async function viewCaloriesBurn(req, res) {
    try {
        const trackers = await Tracker.find({}).sort({})
        res.render('trackers/showCaloriesBurn', { trackers })
    } catch (error) {
        console.error('Error fetching calories burn!', error)
        res.status(500).send('Error loading the calories burn data')
    }
}

async function deleteCaloriesIntake(req, res) {
    try {
        await Tracker.findByIdAndDelete(req.params.id)
        res.redirect('/trackers/showCaloriesIntake')
    } catch (error) {
        console.error('Error deleting calories intake!', error)
        res.status(500).send('Error deleting calories intake')
    }
}

async function viewCaloriesIntake(req, res) {
    try {
        const trackers = await Tracker.find({}).sort({})
        res.render('trackers/showCaloriesIntake', { trackers })
    } catch (error) {
        console.error('Error fetching calories intake!', error)
        res.status(500).send('Error loading the calories intake data')
    }
}


async function deleteWaterIntake(req, res) {
    try {
        await Tracker.findByIdAndDelete(req.params.id)
        res.redirect('/trackers/showWaterIntake')
    } catch (error) {
        console.error('Error deleting water intake!', error)
        res.status(500).send('Error deleting water intake')
    }
}

async function viewWaterIntake(req, res) {
    try {
        const trackers = await Tracker.find({}).sort({})
        res.render('trackers/showWaterIntake', { trackers })
    } catch (error) {
        console.error('Error fetching water intake:', error)
        res.status(500).send('Error loading the water intake data')
    }
}

async function deleteWeight(req, res) {
    try {
        await Tracker.findByIdAndDelete(req.params.id)
        res.redirect('/trackers/showWeight')
    } catch (error) {
        console.error('Error deleting weight!', error)
        res.status(500).send('Error deleting weight')
    }
}

async function viewWeight(req, res) {
    try {
        const trackers = await Tracker.find({}).sort({})
        res.render('trackers/showWeight', { trackers })
    } catch (error) {
        console.error('Error fetching weight!', error)
        res.status(500).send('Error loading the weight data')
    }
}


async function deleteSteps(req, res) {
    try {
        await Tracker.findByIdAndDelete(req.params.id)
        res.redirect('/trackers/showSteps')
    } catch (error) {
        console.error('Error deleting steps!', error)
        res.status(500).send('Error deleting steps')
    }
}

async function viewSteps(req, res) {
    try {
        const trackers = await Tracker.find({}).sort({})
        res.render('trackers/showSteps', { trackers })
    } catch (error) {
        console.error('Error fetching steps!', error)
        res.status(500).send('Error loading the steps data')
    }
}

// async function addSteps(req, res) {
//     try {
//         await Tracker.create({ steps: req.body.steps, date: req.body.date })
//         res.redirect('/trackers/view')
//     } catch (error) {
//         console.error('Error adding steps:', error)
//         res.status(500).send('Error adding new steps')
//     }
// }

async function addTrackingData(req, res) {
    try {
        const data = { date: req.body.date }

        // Type of data being added
        if (req.body.steps) data.steps = req.body.steps
        if (req.body.weight) data.weight = req.body.weight
        if (req.body.waterIntake) data.waterIntake = req.body.waterIntake
        if (req.body.caloriesIntake) data.caloriesIntake = req.body.caloriesIntake
        if (req.body.caloriesBurn) data.caloriesBurn = req.body.caloriesBurn
        if (req.body.heartRate) data.heartRate = req.body.heartRate

        // Creating anew Tracker instance with the provided data
        await Tracker.create(data)

        // Redirect based on the type of data added
        if (req.body.steps) {
            res.redirect('/trackers/showSteps')
        } else if (req.body.weight) {
            res.redirect('/trackers/showWeight')
        } else if (req.body.waterIntake) {
            res.redirect('/trackers/showWaterIntake')
        } else if (req.body.caloriesIntake) {
            res.redirect('/trackers/showCaloriesIntake')
        } else if (req.body.caloriesBurn) {
            res.redirect('/trackers/showCaloriesBurn')
        } else if (req.body.heartRate) {
            res.redirect('/trackers/showHeartRate')
        } else  {

            // If none of above data is provided, redirect to default page
            res.redirect('/trackers')
        }
    } catch (error) {
            console.error('Error adding tracking data:', error)
            res.status(500).send('Error adding new tracking data')
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