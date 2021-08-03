const User = require('../models/User')
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const validateRegisterInput=require('../validation/register')
const validateLoginInput=require('../validation/login')

//keyOrSECRET
const key = require('../config/Key')

// @Route   /api/users/register
//@desc     Post sign up user
//@access   public 

module.exports.userRegister=(req,res)=>{
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const password2 = req.body.password2;
  
  const {errors, isValid} = validateRegisterInput(req.body);
  
  if(!isValid) {
    return res.status(400).json(errors)
  }

  User
    .findOne({
      email
    })
    .then(user => {
      if (user) {
        errors.email = 'Email already exist';
        return res.status(400).json(errors );
      } else {
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm' //size, rating, default
        })

        const newUser = new User({
          name,
          email,
          avatar,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            newUser.password = hash;

            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => {
                return res.status(400).json(err);
              })
          });
        });

      }
    });

  
  }
// @Route   /api/users/login
//@desc     sign in user / returning the token
//@access   public
module.exports.userLogin=(req,res)=>{

  const {isValid,errors}=validateLoginInput(req.body);
  const email = req.body.email;
  const password = req.body.password;   
  //check validations :
   if(!isValid){
   return res.status(400).json(errors)}

  //find user
  User.findOne({email})
  //checkuser
  .then(user=>{
      if(!user){
      errors.email = 'User not found';
      res.status(404).json(errors)}
  //check password : remember one password is given by user , the other is hushed
  bcrypt.compare(password, user.password)
  .then(isMatch=>{
      if(isMatch){
       //user matched
      const payload={id:user.id,name:user.name,avatar:user.avatar} //jwt payload
       //jwt sign
       jwt.sign(
           payload,
           key.SECRETORKEY,
           {expiresIn:7200},
           (err,token)=>{
             res.json({
                success:true, 
                token:'Bearer '+ token
             })
           })
    }
      else{
       errors.password='Password Incorrect'
      return res.status(400).json(errors)
      }
  })
  ;    
  })
}

// @Route   /api/users/current
//@desc     return current user/a test using the token
//@access   private
module.exports.userCurrent=(req,res)=>{

    res.json({name:req.user.name,
              email:req.user.email,
              id:req.user.id})
 }