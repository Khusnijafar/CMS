const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Datadate = require("../models/datadate");
var jwt = require('jsonwebtoken');
const should = chai.should();
chai.use(chaiHTTP);

describe('data', function () {

    beforeEach(function (done) {
        let datadate = new Datadate({
            letter: "2017-12-31",
            frequency: 1.1
        });

        datadate.save(function (err, dataCreated) {
            done();
        })
    })

    // setiap habis melakukan test saya kosongkan data di collection todo
    afterEach(function (done) {
        Datadate.collection.drop();
        done();
    });

    //ADD
    it('seharusnya menampilkan semua daftar  yang ada di table datadate dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/datadate')
            .send({
                "letter": "2017-12-31",
                "frequency": 1.2
            })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.data.should.have.property('_id')
                res.body.data.should.have.property('letter')
                res.body.data.should.have.property('frequency')
                res.body.success.should.equal(true);
                res.body.message.should.equal('data has been added');
                res.body.data.should.be.a('object')
                res.body.data._id.should.be.a('string');
                res.body.data.letter.should.equal('2017-12-31');
                res.body.data.frequency.should.equal(1.2);
                done();
            })
    })

    //EDIT
    it('seharusnya bisa memperbaharui melalui metode PUT', function (done) {
        chai.request(server)
            .get('/api/datadate')
            .end(function (err, res) {
                chai.request(server)
                    .put(`/api/datadate/${res.body[0]._id}`)
                    .send({
                        "letter": "2017-12-31",
                        "frequency": 1.2
                    })

                    .end(function (err, res) {
                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('_id')
                        res.body.data.should.have.property('letter')
                        res.body.data.should.have.property('frequency')
                        res.body.success.should.equal(true);
                        res.body.message.should.equal('data has been updated');
                        res.body.data.should.be.a('object')
                        res.body.data._id.should.be.a('string');
                        res.body.data.letter.should.equal('2017-12-31');
                        res.body.data.frequency.should.equal(1.2);
                        done();
                    })
            })
    })

    //BROWSE
    it('seharusnya mencari daftar  yang ada di table datadate dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/datadate/search')
            .send({
                "letter": "2017-12-31",
                "frequency": 1.1
            })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('2017-12-31');
                res.body[0].frequency.should.equal(1.1);
                done();
            })
    })
  
    //READ
    it('Seharusnya mendapatkan semua datadate dengan metode GET', (done) => {
        chai.request(server)
            .get('/api/datadate')
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0]._id.should.be.a('string');
                res.body[0].letter.should.equal('2017-12-31');
                res.body[0].frequency.should.equal(1.1);
                done();
            })
    })

    //FIND
    it('Seharusnya menemukan datadate berdasarkan id melalui metode GET', (done) => {
        chai.request(server)
        .get('/api/datadate')
        .end((err, response) => {
            chai.request(server)
            .get(`/api/datadate/${response.body[0]._id}`)
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
            res.body.data.letter.should.equal('2017-12-31');
            res.body.data.frequency.should.equal(1.1);
            done();
            })
        })
    })

    //DELETE
    it('Seharusnya menghapus data berdasarkan id dengan metode DELETE', (done) => {
        chai.request(server)
            .get('/api/datadate')
            .end((err, res) => {
                chai.request(server)
                    .delete(`/api/datadate/${res.body[0]._id}`)
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
                        res.body.data.letter.should.equal('2017-12-31');
                        res.body.data.frequency.should.equal(1.1);
                        done();
                    })
            })
    })
});