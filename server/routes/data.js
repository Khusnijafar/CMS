var express = require('express');
var router = express.Router();

const Data = require('../models/data');

//ADD
router.post('/', (req, res) => {
    Data.create({
        letter: req.body.letter,
        frequency: req.body.frequency
    }, function (err, data) {
        if (err) return handleError(err)
        res.status(201).send({
            success: true,
            message: "data has been added",
            data: {
                _id: data._id,
                letter: data.letter,
                frequency: data.frequency
            }
        })
    })
});

//EDIT
router.put('/:id', (req, res) => {
    let id = req.params.id
    Data.findOneAndUpdate({_id: id}, {$set: {
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
                    letter: data.letter,
                    frequency: data.frequency
                }
            })
        }).catch(err => {
            res.send.handleError(err)
        })
})

//BROWSE
router.post('/search', (req, res) => {
    let keyword = {};
    if (req.body.letter) {
        keyword.letter = req.body.letter
    }
    if (req.body.frequency) {
        keyword.frequency = req.body.frequency
    }
    Data.find(keyword).then(data => {
        res.status(201).send(data)
    }).catch(err => {
        res.send.handleError(err)
    })
});

//READ
router.get('/', (req, res) => {
    Data.find().then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.send.handleError(err)
    })
});

//DELETE
router.delete('/:id', (req, res) => { 
    let id = req.params.id
    Data.findByIdAndDelete(id)
    .then(data => {
        if(data)
        res.status(200).json({
            succes: true,
            message: "data has been deleted",
            data: {
                _id: data._id,
                letter: data.letter,
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
  Data.findById(id)
  .then(data => {
      if (data) 
        res.status(200).json({
            succes: true,
            message: "data has been found",
            data: {
                _id: data._id,
                letter: data.letter,
                frequency: data.frequency
            }
        })
    }).catch(err => {
        res.send.handleError(err)
    })
});
module.exports = router;