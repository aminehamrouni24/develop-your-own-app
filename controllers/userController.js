const UserSchema =require('../models/User')


// @Route   /api/users/test
//@desc     get all users
//@access   public 

module.exports.getAllUsers=(req,res)=>{
    res.send('this is a simple test & i am glad it works')
}




