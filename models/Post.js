const mongoose = require('mongoose');
const Schema = mongoose.Schema
const PostSchema = new Schema(
  {
    user:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },
    
    text: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    name:{
      type:String,
      
    },
    name:{
      type:String
    },
    avatar:{
      type:String
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likes:[
      {
        user:{type:Schema.Types.ObjectId, ref:'user'}
      } 
    ],
    comments:[
      {
        user:{
          type:Schema.Types.ObjectId,
           ref:'user'}
      ,
      text:{
          type:String,
          required:true},
      date:{
          type:Date,
          default:Date.now}
      },

    ],
  },
  {
    timestamps: true,
  }
);

module.exports=Post = mongoose.model('post', PostSchema);