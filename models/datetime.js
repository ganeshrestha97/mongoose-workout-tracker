const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const mySchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const MyModel = mongoose.model('MyModel', mySchema)
const newDocument = new MyModel({

})
newDocument.save(function(err) {
    if (err) return console.error(err)
    console.log('Document saved with current date and time!')
})

MyModel.find({}, function(err,docs) {
    if (err) return console.error(err)
    console.log(docs)
})
