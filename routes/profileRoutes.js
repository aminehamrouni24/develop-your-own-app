const router = require('express').Router()
const passport=require('passport')
const profileController = require('../controllers/profileController')



//test for a private route 
//getting profile route
//@desc in profileController.js
router.get('/', passport.authenticate('jwt',{session:false}), profileController.profileCurrent)


//create & update profile route 
//@desc in profileController.js
router.post('/', passport.authenticate('jwt',{session:false}), profileController.profileCreate)


//get profile by handle 
//@desc in profileController.js
router.get('/handle/:handle', profileController.profileHandle)

//get profile by User ID
//@desc in profileController.js
router.get('/user/:user_id', passport.authenticate('jwt',{session:false}), profileController.getProfile)


//get all profiles
//@desc in profileController.js
router.get('/all',  profileController.getAllProfiles)


//add experience to profile
//@desc in profileController.js
router.post('/experience', passport.authenticate('jwt',{session:false}), profileController.addExperience)


//add education to profile
//@desc in profileController.js
router.post('/education', passport.authenticate('jwt',{session:false}), profileController.addEducation)


//delete experience from profile
//@desc in profileController.js
router.delete('/experience/:experience_id', passport.authenticate('jwt',{session:false}), profileController.deleteExperience)


//delete education from profile
//@desc in profileController.js
router.delete('/education/:education_id', passport.authenticate('jwt',{session:false}), profileController.deleteEducation)

//delete profile & user
router.delete('/',passport.authenticate('jwt',{session:false}), profileController.deleteProfile)

module.exports=router