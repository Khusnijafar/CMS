var express = require('express');
var router = express.Router();

const Maps = require('../models/maps');

//ADD
router.post('/', (req, res) => {
    Maps.create({
        title: req.body.title,
        lat: req.body.lat,
        lng: req.body.lng
    }, function (err, data) {
        if (err) return handleError(err)
        res.status(201).send({
            success: true,
            message: "data has been added",
            data: {
                _id: data._id,
                title: data.title,
                lat: data.lat,
                lng: data.lng
            }
        })
    })
});

//EDIT
router.put('/:id', (req, res) => {
    let id = req.params.id
    Maps.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                title: req.body.title,
                lat: req.body.lat,
                lng: req.body.lng
            }
        }, {
            new: true
        })
        .then(data => {
            res.status(201).send({
                success: true,
                message: `data has been updated`,
                data: {
                    _id: data._id,
                    title: data.title,
                    lat: data.lat,
                    lng: data.lng
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
    if (req.body.title) {
        keyword.title = req.body.title
    }
    Maps.find(keyword).then(datas => {
        datas.forEach(item => {
            data.push({
                _id: item._id,
                title: item.title,
                lat: item.lat,
                lng: item.lng
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
    Maps.find().then(datas => {
        datas.forEach(item => {
            data.push({
                _id: item._id,
                title: item.title,
                lat: item.lat,
                lng: item.lng
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
    Maps.findByIdAndDelete(id)
        .then(data => {
            if (data)
                res.status(200).json({
                    succes: true,
                    message: "data has been deleted",
                    data: {
                        _id: data._id,
                        title: data.title,
                        lat: data.lat,
                        lng: data.lng
                    }
                })
        }).catch(err => {
            res.send.handleError(err)
        })
});

//FIND
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Maps.findById(id)
        .then(data => {
            if (data)
                res.status(200).json({
                    succes: true,
                    message: "data has been found",
                    data: {
                        _id: data._id,
                        title: data.title,
                        lat: data.lat,
                        lng: data.lng
                    }
                })
        }).catch(err => {
            res.send.handleError(err)
        })
});

module.exports = router;