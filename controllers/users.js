var mongoose = require('mongoose');
var express = require('express');
var app         = express();
var userRouter  = express.Router();
var userModel = mongoose.model('User');
var commonValidations = require('../shared/validations/signup');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var isEmpty = require('lodash/isEmpty');
var auth = require('./../middlewares/authenticate');
var adminAuth = require('./../middlewares/adminAuthenticate');
var adminUserSignup = require('./../middlewares/adminUserRegistration');

//Export controller function
module.exports.controllerFunction = function(app) {

    //Get all users
    userRouter.get('/all',adminAuth.check, function(req,res){

      //begin user find
      userModel.find({}).select("email username isAdmin").exec(function(err,allUsers){
          if(err){
              res.status(500).json({ error: err });
          }
          else
          {
              if(allUsers == null || allUsers == undefined)
              {
                  res.status(200).json({ error: {userList : [], message : 'No users found'} });
              }
              else
              {
                  res.status(200).json({ userList : allUsers });
              }
          }

      });//end user model find

    });//end get all users

    userRouter.get('/duplicate/:identifier', (req, res) => {
      userModel.findOne({'email':req.params.identifier}).select('email').exec((err,user) => {
        res.json({ user });
      });
    });


    userRouter.get('/current/info',auth.check, (req, res) => {
      userModel.findOne({'email':req.currentUser.email}).select('email username isAdmin').exec((err,user) => {
        res.status(200).json({ user });
      });
    });

    userRouter.post('/create',adminUserSignup.check, (req, res) => {
      let { errors, isValid } = commonValidations(req.body);
      userModel.findOne({'email':req.body.email}).exec((user) => {
        if (user) {
          if (user.get('email') === req.body.email) {
            errors.email = 'There is user with such email';
          }
        }
        if (isValid) {
          var newUser = new userModel(req.body);

          newUser.save((err,user) => {
            console.log("Entered new user");
            if(err){
              console.log('500');
              res.status(500).json({ error: err });
            }
            else{
              console.log('Success');
              res.json({ success: true })
            }
          });
          console.log("finished new user");

        } else {
          console.log('Not valid');
          res.status(400).json(errors);
        }
      });

    });

    userRouter.post('/login', (req, res) => {
      const { identifier, password } = req.body;
      userModel.findOne({'email':identifier}).exec((err,user) => {
        if(user){
          console.log(user);
          console.log(password);
          if(user.comparePassword(password)){
            console.log("Valid password");
            const token = jwt.sign({
              id: user.get('_id'),
              username: user.get('username'),
              email:user.get('email'),
              isAdmin:user.get('isAdmin')
            }, config.secret);
            res.json({ token });
          }
          else {
            console.log("Invalid password");
            res.status(401).json({ errors: { form: 'Invalid Credentials' } });
          }
        }
        else {
          console.log("User not found");
          res.status(401).json({ errors: { form: 'Invalid Credentials' } });
        }
      });
    });

    //Update user by email.Admin section
    userRouter.put('/:email/update',adminAuth.check,function(req,res){
        
        //Find user by email
        userModel.findOne({'email':req.body.email}).select().exec(function(err,foundUser){
          if(err){
              res.status(401).json({ errors: { form: 'Invalid Credentials' } });
          }
          else{
              //Set new username
              foundUser.username = req.body.username;
              //Save new model
              foundUser.save(function(){
                  if(err){
                      res.status(401).json({ errors: { form: 'Invalid Credentials' } });

                  } else {
                      console.log("Updated User");
                      setTimeout(function(){ 
                        res.status(200).json({message : 'Successfully Updated User'});
                      }, 3000);
                      
                  }
              });             
          }

      });// end find
    
    });
    //Delete user by email.Admin section
    userRouter.post('/:email/delete',adminAuth.check,function(req,res){
        
      //Remove user
      userModel.remove({'email':req.params.email},function(err,user){
          if(err){
              res.status(401).json({ errors: { form: 'Invalid Credentials' } });
           }
          else
          {
            setTimeout(function(){ 
              res.status(200).json({message : 'Successfully Deleted User'});
            }, 3000);
          }
    });//end remove


  });//end remove user


  //name api
  app.use('/api/users', userRouter);




};//end contoller code
