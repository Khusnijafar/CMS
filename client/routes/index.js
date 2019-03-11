var express = require('express');
var router = express.Router();
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard');
});

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/home', // redirect to the secure admin section
  failureRedirect: '/login', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}))

router.get('/login', function(req, res, next) {
  res.render('register_login', { registerPage:false, message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/home', // redirect to the secure admin section
  failureRedirect: '/login', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

router.get('/home', function(req, res, next) {
  res.render('home', {
    data : req.user
  });
});

router.get('/data', function(req, res, next) {
  res.render('data', {
    data: req.data
  });
});

router.get('/datadate', function(req, res, next) {
  res.render('datadate')
});

router.get('/line', function(req, res, next) {
  res.render('line');
});

router.get('/pie', function(req, res, next) {
  res.render('pie');
});

router.get('/bar', function(req, res, next) {
  res.render('bar');
});

router.get('/map', function(req, res, next) {
  res.render('map');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;
