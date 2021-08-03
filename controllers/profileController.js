const User = require('../models/User')
const Profile = require('../models/Profile')

const validateProfileInput=require('../validation/profile')
const validateExperienceInput=require('../validation/experience')
const validateEducationInput=require('../validation/education')



// @Route   /api/profile/current
//@desc     get profile of a user/test
//@access   private 
module.exports.profileCurrent=(req,res)=>{
    const errors={};
    Profile.findOne({user:req.user.id})
    .populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile='there is no profile for this user'
            return res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err=>res.status(404).json(err))
}


// @Route   /api/profile/handle/:handle
//@desc     get profile by handle
//@access   private 
module.exports.profileHandle=(req,res)=>{
    const errors={};
    Profile.findOne({handle:req.params.handle})
    .populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile='there is no profile for this user'
            return res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err=>res.status(404).json(err))
}


// @Route   /api/profile/user/:user_id
//@desc     get profile by user ID
//@access   private 
module.exports.getProfile=(req,res)=>{
    const errors={};
    Profile.findOne({user:req.params.user_id})
    .populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile='there is no profile for this user'
            return res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err=>res.status(404).json({profile:'there is no profile for this user'}))
}


// @Route   /api/profile/all
//@desc     get all profiles
//@access   public 
module.exports.getAllProfiles=(req,res)=>{
    const errors={};
    Profile.find()
    .populate('user',['name','avatar'])
    .then(profiles=>{
        if(!profiles){
            errors.noprofiles='there is no profiles'
            return res.status(404).json(errors)
        }
        res.json(profiles)
    })
    .catch(err=>res.status(404).json({profile:'there is no profiles'}))
}



//@Route   /api/profile/
//@desc     create or update profile
//@access   private 
module.exports.profileCreate=(req,res)=>{

    const {isValid,errors}=validateProfileInput(req.body);
     
    //check validations :
    if(!isValid){
     return res.status(400).json(errors)}
     
    //Get fields :
    const profileFields={};
    profileFields.user=req.user.id;
    if(req.body.handle)  profileFields.handle=req.body.handle;
    if(req.body.company) profileFields.company=req.body.company;
    if(req.body.website) profileFields.website=req.body.website;
    if(req.body.location)profileFields.location=req.body.location;
    if(req.body.bio)     profileFields.bio=req.body.bio;
    if(req.body.status)  profileFields.status=req.body.status;
    if(req.body.githubusername) profileFields.githubusername=req.body.githubusername;
    //Skills field- nedd to be split in an array
    if(typeof req.body.skills !== undefined){
        profileFields.skills = req.body.skills.split(',')
    }
    //social
    profileFields.social={}
    if(req.body.twitter) profileFields.social.twitter=req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook=req.body.facebook;
    if(req.body.instagram) profileFields.social.instagram=req.body.instagram;
    if(req.body.youtube) profileFields.social.youtube=req.body.youtube;
    if(req.body.github) profileFields.social.github=req.body.github;



    Profile.findOne({user:req.user.id})
    .then(profile=>{
        if(profile){
            //we do have a profile ; so this is going to be an update
            Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFields},
                {new:true})
            .then(profile=> res.json(profile))    
        }
        else{
            //this is a create profile
            //check if handle exist : wich is an seo friendly access
            Profile.findOne({handle:profileFields.handle})
            .then(profile=>{
                if(profile){
                    errors.handle='Handle already exists'
                   return res.status(400).json(errors)
                }
                //save profile
                new Profile(profileFields).save()
                .then(profile=>  res.json(profile))
            })
        }

    })  


}

//@Route   /api/profile/experience
//@desc     add experience to profile
//@access   private

module.exports.addExperience=(req,res)=>{

    const {isValid,errors}=validateExperienceInput(req.body);
     
    //check validations :
    if(!isValid){
     return res.status(400).json(errors)}
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        const newExp={
            title:req.body.title,
            company:req.body.company,
            location:req.body.location ,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            description:req.body.description
        }
        //Add to experience array
        profile.experience.unshift(newExp);
        profile.save().then(profile=>res.json(profile))
    })
}

//@Route   /api/profile/education
//@desc     add education to profile
//@access   private

module.exports.addEducation=(req,res)=>{

    const {isValid,errors}=validateEducationInput(req.body);
     
    //check validations :
    if(!isValid){
     return res.status(400).json(errors)}
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        const newEdu={
            school:req.body.school,
            degree:req.body.degree,
            fieldofstudy:req.body.fieldofstudy ,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            description:req.body.description
        }
        //Add to experience array
        profile.education.unshift(newEdu);
        profile.save().then(profile=>res.json(profile))
    })
}


//@Route   /api/profile/experience/:experience_id
//@desc     delete experience from profile
//@access   private

module.exports.deleteExperience=(req,res)=>{


    Profile.findOne({user:req.user.id})
    .then(profile=>{
      //get index and remove
      const removeIndex = profile.experience
      .map(item=>item.id)
      .indexOf(req.params.experience_id)
      //splice out of array
      profile.experience.splice(removeIndex,1)
      //save
      profile.save().then(profile=>res.json(profile))
    })
    .catch(err=>res.status(404).json(err))
}


//@Route   /api/profile/education/:education_id
//@desc     delete education from profile
//@access   private

module.exports.deleteEducation=(req,res)=>{


    Profile.findOne({user:req.user.id})
    .then(profile=>{
      //get index and remove
      const removeIndex = profile.education
      .map(item=>item.id)
      .indexOf(req.params.education_id)
      //splice out of array
      profile.education.splice(removeIndex,1)
      //save
      profile.save().then(profile=>res.json(profile))
    })
    .catch(err=>res.status(404).json(err))
}


//@Route   /api/profile
//@desc     delete user & profile
//@access   private
module.exports.deleteProfile=(req,res)=>{
    Profile.findOneAndRemove({user:req.user.id})
    .then(()=>
    User.findOneAndRemove({_id:req.user.id})
    .then(()=>{res.json({success:true})}))

}