 var express = require('express');
 var router = express.Router();
 var jwt = require('jsonwebtoken');
 const bcrypt = require('bcrypt')

 const User = require('../models/user');

 const response = {
   error: null,
   message: '',
   data: {}
 }

 /* GET users listing. */

 router.post('/register', (req, res) => {
   User.findOne({
     email: req.body.email
   }, (err, userData) => {
     if (err) {
       response.error = true
       response.message = 'There was problem finding the User!'
       return res.json(response)
     }
     if (userData) {
       response.error = true
       response.message = `User '${req.body.email}' already registered, enter the other email`
       return res.json(response)
     } else {
       if (req.body.password == req.body.retypepassword) {
         let hashedPassword = bcrypt.hashSync(req.body.password, 8);
         console.log(hashedPassword);
         
         let token = jwt.sign({ email: req.body.email }, 'secret key', {
           expiresIn: 86400
         })
         User.create({
           email: req.body.email,
           password: hashedPassword,
           token: token
         }, (err, user) => {
           if (err) {
             response.error = true
             response.message = 'There was a problem registering the user!'
             return res.json(response)
           }
           response.error = false
           response.message = 'There was a problem registering the user!'
           response.data = {
             email: user.email,
             token: user.token
           }
           return res.json(response)
         })
       } else {
         response.error = true
         response.message = 'Password you entered not match!'
         return res.json(response)
       }
     }
   })
 });
 router.post('/login', (req, res) => {
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (!user) {
        //check email
        res.json({
          error: true,
          message: "email is wrong"
        })
      } else if (user) {
        //check password
        let passwordValid = bcrypt.compareSync(req.body.password, user.password)
        console.log(passwordValid);
        if (!passwordValid) {
          res.json({
            error: true,
            message: "password is wrong!"
          })
        } else {
          const token = jwt.sign({
            email: user.email
          }, 'secretkey', {
            expiresIn: 86400 // expires in 24 hours
          })
          // console.log(token)
          user.token = token
          user.save(err => {
           res.status(200).json({
             error: false,
              data: {
                email: user.email
              },
              token
            })
          })
        }
      }
    })
    .catch(err => res.json(err))
})


 router.post('/check', (req, res) => {
   let token = req.headers['x-access-token'];
   if (token) {
     jwt.verify(token, 'secretkey', (err, decoded) => {
       if (err) res.json({
         valid: false
       })
       else {
         User.findOne({
           email: decoded.email,
           token: token

         }, (user) => {
           if (user) {
             res.status(200).send({
               valid: true
             })
           } else {
             res.send({
               valid: false
             })
           }
         })
       }
     })
   }
 })

 router.get('/destroy', (req, res) => {
   let token = req.headers['x-access-token'];
   jwt.verify(token, 'secretkey', (err, decoded) => {
     if (err) res.json({
       valid: false
     })
     else {
       User.updateOne({
         email: decoded.email
       }, {
         $set: {
           token: null
         }
       }, (err) => {
         if (err) {
           res.send({
             logout: false
           })
         } else {
           res.status(200).send({
             logout: true
           })
         }
       })
     }
   })
 })

 module.exports = router;