const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Maps = require("../models/maps");

const should = chai.should();
chai.use(chaiHTTP);

describe('data', function () {

    beforeEach(function (done) {
        let maps = new Maps({
            title: "Cihampelas Walk",
            lat: -6.8965475,
            lng: 107.6103536
        });

        maps.save(function (err, dataCreated) {
            done();
        })
    })

    // setiap habis melakukan test saya kosongkan data di collection todo
    afterEach(function (done) {
        Maps.collection.drop();
        done();
    });

    //ADD
    it('seharusnya menampilkan semua daftar  yang ada di table maps dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/maps')
            .send({
                "title": "Trans Studio Mall",
                "lat": -6.9261257,
                "lng": 107.6343728
            })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.data.should.have.property('_id')
                res.body.data.should.have.property('title')
                res.body.data.should.have.property('lat')
                res.body.data.should.have.property('lng')
                res.body.success.should.equal(true);
                res.body.message.should.equal('data has been added');
                res.body.data.should.be.a('object')
                res.body.data._id.should.be.a('string');
                res.body.data.title.should.equal('Trans Studio Mall');
                res.body.data.lat.should.equal(-6.9261257);
                res.body.data.lng.should.equal(107.6343728);
                done();
            })
    })

    //EDIT
    it('seharusnya bisa memperbaharui melalui metode PUT', function (done) {
        chai.request(server)
            .get('/api/maps')
            .end(function (err, res) {
                chai.request(server)
                    .put(`/api/maps/${res.body[0]._id}`)
                    .send({
                        "title": "Trans Studio Mall",
                        "lat": -6.9261257,
                        "lng": 107.6343728
                    })

                    .end(function (err, res) {
                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('_id')
                        res.body.data.should.have.property('title')
                        res.body.data.should.have.property('lat')
                        res.body.data.should.have.property('lng')
                        res.body.success.should.equal(true);
                        res.body.message.should.equal('data has been updated');
                        res.body.data.should.be.a('object')
                        res.body.data._id.should.be.a('string');
                        res.body.data.title.should.equal('Trans Studio Mall');
                        res.body.data.lat.should.equal(-6.9261257);
                        res.body.data.lng.should.equal(107.6343728);
                        done();
                    })
            })
    })

    //BROWSE
    it('seharusnya mencari daftar  yang ada di table maps dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/maps/search')
            .send({
                title: "Cihampelas Walk",
                lat: -6.8965475,
                lng: 107.6103536
            })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('lat');
                res.body[0].should.have.property('lng');
                res.body[0]._id.should.be.a('string');
                res.body[0].title.should.equal('Cihampelas Walk');
                res.body[0].lat.should.equal(-6.8965475);
                res.body[0].lng.should.equal(107.6103536);
                done();
            })
    })

    //READ
    it('Seharusnya mendapatkan semua maps dengan metode GET', (done) => {
        chai.request(server)
            .get('/api/maps')
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('lat');
                res.body[0].should.have.property('lng');
                res.body[0]._id.should.be.a('string');
                res.body[0].title.should.equal('Cihampelas Walk');
                res.body[0].lat.should.equal(-6.8965475);
                res.body[0].lng.should.equal(107.6103536);
                done();
            })
    })

    //FIND
    it('Seharusnya menemukan maps berdasarkan id melalui metode GET', (done) => {
        chai.request(server)
            .get('/api/maps')
            .end((err, response) => {
                chai.request(server)
                    .get(`/api/maps/${response.body[0]._id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('succes');
                        res.body.should.have.property('message');
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('object');
                        res.body.succes.should.equal(true);
                        res.body.message.should.equal('data has been found');
                        res.body.data._id.should.be.a('string');
                        res.body.data.title.should.equal('Cihampelas Walk');
                        res.body.data.lat.should.equal(-6.8965475);
                        res.body.data.lng.should.equal(107.6103536);
                        done();
                    })
            })
    })

    //DELETE
    it('Seharusnya menghapus data berdasarkan id dengan metode DELETE', (done) => {
        chai.request(server)
            .get('/api/maps')
            .end((err, res) => {
                chai.request(server)
                    .delete(`/api/maps/${res.body[0]._id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('succes');
                        res.body.should.have.property('message');
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('object');
                        res.body.succes.should.equal(true);
                        res.body.message.should.equal('data has been deleted');
                        res.body.data._id.should.be.a('string');
                        res.body.data.title.should.equal('Cihampelas Walk');
                        res.body.data.lat.should.equal(-6.8965475);
                        res.body.data.lng.should.equal(107.6103536);
                        done();
                    })
            })
    })
});