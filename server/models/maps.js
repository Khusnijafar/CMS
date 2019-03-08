const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Maps = new Schema({
    title: { type: String },
    lat: { type: Number },
    lng: { type: Number }
});

module.exports = mongoose.model('Maps', Maps);