const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Data = new Schema({
    letter: { type: String },
    frequency: { type: Number }
});

module.exports = mongoose.model('Data', Data);