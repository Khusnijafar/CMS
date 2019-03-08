const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Datadate = new Schema({
    letter: { type: Date },
    frequency: { type: Number }
});

module.exports = mongoose.model('Datadate', Datadate);