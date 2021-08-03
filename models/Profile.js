const mongoose=require('mongoose')
const Schema= mongoose.Schema

//create profile
const ProfileSchema = new Schema({
    
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    handle:{
        type:String,
        required:true,
        max:40 },
    company:{
        type:String
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    status:{ //this is a gonna be a select
        type:String,
        required:true
    },
    skills:{//this is going to be an array of skills
        type:[String],
        required:true
    },
    bio:{
        type:String
    },
    githubusername:{
        type:String
    },
    experience:[
        {
            title:{
                type:String,
                required:true
            },
            company:{
                type:String,
                required:true
            },
            location:{
                type:String
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
            },
            description:{
                type:String
            }
        }
    ],
    education:[
        {
            school:{
                type:String,
                required:true
            },
            degree:{
                type:String,
                required:true
            },
            fieldofstudy:{
                type:String
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }
        }
    ],
    social:{
        youtube:{
            type:String
        },
        twitter:{
            type:String
        },
        facebook:{
            type:String
        },
        linkedin:{
            type:String
        },
        instagram:{
            type:String
        }
    }

              
},{timestamps:true} )



const Profile = mongoose.model('profile',ProfileSchema)
module.exports=Profile