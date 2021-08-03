const mongoose=require('mongoose')


const Schema= mongoose.Schema
const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true},
    email:{
        type:String,
        required:true,
        lowercase: true,
         trim: true} ,
    password:{
        type:String,
        required:true,
        trim:true},
    avatar:{
        type:String,

    }          
},{timestamps:true} )



const UserModel = mongoose.model('user',UserSchema)
module.exports=UserModel