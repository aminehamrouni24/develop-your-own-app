const mongoose=require('mongoose')
const Post = require('../models/Post')
const Profile = require('../models/Profile')

const validatePostInput = require('../validation/post')



//@Route   /api/posts
//@desc     GET posts
//@access   public
module.exports.getPosts=(req,res)=>{
    Post.find()
    .sort({date:-1})
    .then(posts=>res.json(posts))
    .catch(err=>res.status(404).json({status:false,message:'There is no posts'}))
}

//@Route   /api/posts/:id
//@desc     GET post by id
//@access   public
module.exports.getPostById=(req,res)=>{
    Post.findById(req.params.id)
    .then(post=>res.json(post))
    .catch(err=>res.status(404).json({status:false,message:'No post available with that ID'}))
}



//@Route   /api/posts
//@desc     create post
//@access   private 
module.exports.createPost=(req,res)=>{

    const {isValid,errors}=validatePostInput(req.body);
     
    //check validations :
    if(!isValid){
     return res.status(400).json(errors)}

    const newPost = new Post({
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id
    })
    newPost.save().then(post=>res.status(201).json(post))
    
    }


//@Route   /api/posts/:id
//@desc     delete post  
//@access   private
module.exports.deletePost=(req,res)=>{

    Profile.findOne({user: req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
        .then(post=>{
            //check for post owner
            if(post.user.toString()!==req.user.id){
                return res.status(401).json({notauthorized:'User not authorized'})
            }
            //delete
            post.remove().then(()=>res.json({success:true}))
        })
        .catch(err=>res.status(404).json({nopost:"post not found"}))
    })
}

//@Route   POST /api/posts/like/:id (the id of the post)
//@desc     like post  
//@access   private
module.exports.likePost=(req,res)=>{

    Profile.findOne({user: req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
        .then(post=>{
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return res.status(400).json({alreadyliked:'User already liked this post'})
        }
        // remove the user id to likes array ( get remove index)
        post.likes.unshift({user:req.user.id})
        post.save().then(post=>res.json(post))
        })
        .catch(err=>res.status(404).json({nopost:"post not found"}))
    })
}

//@Route   POST /api/posts/unlike/:id (the id of the post)
//@desc     unlike post  
//@access   private
module.exports.unlikePost=(req,res)=>{

    Profile.findOne({user: req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
        .then(post=>{
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return res.status(400).json({notliked:'User have not liked the post'})
        }
             //get remove index
             const removeIndex=post.likes
             .map(item=>item.user.toString())
             .indexOf(req.user.id)
             //splice out of array
             post.likes.splice(removeIndex,1)
             //save
             post.save().then(post=>res.json(post))
        })
        .catch(err=>res.status(404).json({nopost:"post not found"}))
    })
}


//@Route   POST /api/posts/comment/:id (the id of the post)
//@desc     comment post  
//@access   private
module.exports.commentPost=(req,res)=>{
 
    const {isValid,errors}=validatePostInput(req.body);
     
    //check validations :
    if(!isValid){
     return res.status(400).json(errors)}

    Post.findById(req.params.id)
    .then(post=>{
        const newComment={
            text:req.body.text,
            name:req.body.name,
            avatar:req.body.avatar,
            user:req.user.id
        }
        //add to comments array
        post.comments.unshift(newComment);
        //save
    post.save().then(post=>res.json(post))
    })
    .catch(err=>res.status(404).json({postnotfound:'no post found'}))
}

//@Route   POST /api/posts/comment/:id/:comment_id (the first id is the id of the post)
//@desc     delete comment post  
//@access   private
module.exports.deleteCommentPost=(req,res)=>{

    Post.findById(req.params.id)
    .then(post=>{
        //check to see if comment exists 
        if(post.comments.filter(comment=>comment._id.toString()===req.params.comment_id)
        .length===0){
            return res.status(404).json({commentnotexists:'comment does not exist'})
        }
        //get the remove index
        const removeIndex = post.comments
        .map(item=>item._id.toString())
        .indexOf(req.params.comment_id)
        //splice it out of array
        post.comments.splice(removeIndex,1)
        post.save().then(post=>res.json(post))
    })

    .catch(err=>res.status(404).json({postnotfound:'no post found'}))
}