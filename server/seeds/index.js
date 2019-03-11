const Datadate = require('../models/datadate');
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/khusnidb', { useNewUrlParser: true });

let data = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'));

Datadate.deleteMany((err) => {
    Datadate.insertMany(data, function (err, mongooseDocuments) {
        if(err) throw err;
        mongoose.disconnect()
    })
})