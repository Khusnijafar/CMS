const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const User = require("../models/user");
var jwt = require('jsonwebtoken');
const should = chai.should();
chai.use(chaiHTTP);

describe('users', function () {

    beforeEach(function (done) {
        let user = new User({
            email: "admin@gmail.com",
            password: "12345",
            retypepassword: "12345"
        });

        user.save(function (err) {
            done();
        })
    })

    // setiap habis melakukan test saya kosongkan data di collection todo
    afterEach(function (done) {
        User.collection.drop();
        done();
    });

    it('seharusnya menampilkan semua daftar  yang ada di table user dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/users/register')
            .send({
                "email": "khusni@gmail.com",
                "password": "1234",
                "retypepassword": "1234"
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('data');
                res.body.data.should.have.property('email')
                res.body.should.have.property('token');
                res.body.error.should.equal(false);
                res.body.data.should.be.a('object')
                res.body.data.email.should.equal('khusni@gmail.com');
                res.body.token.should.be.a('string')
                done();
            })
    })

    it('seharusnya menambahkan satu user dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({
                "email": "admin@gmail.com",
                "password": "12345"
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('data');
                res.body.data.should.have.property('email')
                res.body.should.have.property('token');
                res.body.error.should.equal(false);
                res.body.data.should.be.a('object')
                res.body.data.email.should.equal('admin@gmail.com');
                res.body.token.should.be.a('string')
                done();
            });
    });

    it('seharusnya mengecek user dengan metode POST', function (done) {
        const token = jwt.sign({
            email: "admin@gmail.com"
        }, 'secretkey', {
            expiresIn: 86400
        })
        chai.request(server)
            .post('/api/users/check')
            .set({
                "x-access-token": `${token}`
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('valid');
                res.body.valid.should.equal(false)
                done();
            });
    });

    it('seharusnya menghapus token DELETE', function (done) {
        const token = jwt.sign({
            email: "admin@gmail.com"
        }, 'secretkey', {
            expiresIn: 86400
        })
        chai.request(server)
            .get('/api/users/destroy')
            .set({
                "x-access-token": `${token}`
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('logout');
                res.body.logout.should.equal(true);
                done();
            })
    })
})