const router = require('express').Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const passport=require('passport')



//user routes : first test of  routes 
router.get('/test', userController.getAllUsers)

//user auth routes
router.post('/register', authController.userRegister)
router.post('/login', authController.userLogin)
//test for a private route 
router.get('/current', passport.authenticate('jwt',{session:false}),
 authController.userCurrent)






module.exports=router