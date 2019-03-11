var express = require('express');
var router = express.Router();
var moment = require('moment')

const Datadate = require('../models/datadate');

//ADD
router.post('/', (req, res) => {
    Datadate.create({
        letter: req.body.letter,
        frequency: req.body.frequency
    }, function (err, data) {
        if (err) return handleError(err)
        res.status(201).send({
            success: true,
            message: "data has been added",
            data: {
                _id: data._id,
                letter: moment(data.letter).format('YYYY-MM-DD'),
                frequency: data.frequency
            }
        })
    })
});

//EDIT
router.put('/:id', (req, res) => {
    let id = req.params.id
    Datadate.findOneAndUpdate({_id: id}, {$set: {
        letter: req.body.letter,
        frequency: req.body.frequency
    }
   }, {new: true})
   .then(data => {
        res.status(201).send({
                success: true,
                message: `data has been updated`,
                data: {
                    _id: data._id,
                    letter: moment(data.letter).format('YYYY-MM-DD'),
                    frequency: data.frequency
                }
            })
        }).catch(err => {
            res.send.handleError(err)
        })
})

//BROWSE
router.post('/search', (req, res) => {
    let data = []
    let keyword = {};
    if (req.body.letter) {
        keyword.letter = moment(req.body.letter).format('YYYY-MM-DD')
    }
    if (req.body.frequency) {
        keyword.frequency = req.body.frequency
    }
    Datadate.find(keyword).then(datas => {
        datas.forEach(item => {
            data.push({
                _id: item._id,
                letter: moment(item.letter).format('YYYY-MM-DD'),
                frequency: item.frequency
            })
        })
        res.status(201).send(data)
    }).catch(err => {
        if (err) return res.status(500).send('There was problem searching Data!');
    })
});

//READ
router.get('/', (req, res) => {
    let data = []
    Datadate.find().then(datas => {
        datas.forEach(item => {
            data.push({
                _id: item._id,
                letter: moment(item.letter).format('YYYY-MM-DD'),
                frequency: item.frequency
            })
        })
        res.status(201).send(data);
    }).catch(err => {
        res.send.handleError(err)
    })
});

//DELETE
router.delete('/:id', (req, res) => { 
    let id = req.params.id
    Datadate.findByIdAndDelete(id)
    .then(data => {
        if(data)
        res.status(200).json({
            succes: true,
            message: "data has been deleted",
            data: {
                _id: data._id,
                letter: moment(data.letter).format('YYYY-MM-DD'),
                frequency: data.frequency
            }
        })
    }).catch(err => {
        res.send.handleError(err)
    })
});

//FIND
router.get('/:id', (req, res) => { 
    let id = req.params.id;
    Datadate.findById(id)
    .then(data => {
        if (data) 
          res.status(200).json({
              succes: true,
              message: "data has been found",
              data: {
                  _id: data._id,
                  letter: moment(data.letter).format('YYYY-MM-DD'),
                  frequency: data.frequency
              }
          })
      }).catch(err => {
          res.send.handleError(err)
      })
  });

module.exports = router;