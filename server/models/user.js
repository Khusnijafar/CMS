const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email: { type: String },
    password: { type: String},
    token: {type: String}
});

module.exports = mongoose.model('User', User);