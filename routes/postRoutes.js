const router = require('express').Router()
const passport=require('passport')
const postController = require('../controllers/postController')


//@Route   /api/posts
//@desc     visit postController.js

router.get('/', postController.getPosts)

//@Route   /api/posts/:id
//@desc     visit postController.js

router.get('/:id', postController.getPostById)


//@Route   /api/posts
//@desc     visit postController.js

router.post('/',passport.authenticate('jwt',{session:false}), postController.createPost)

//@Route   /api/posts/:id
//@desc     visit postController.js

router.delete('/:id',passport.authenticate('jwt',{session:false}), postController.deletePost)

//@Route   /api/posts/like/:id
//@desc     visit postController.js

router.post('/like/:id',passport.authenticate('jwt',{session:false}), postController.likePost)

//@Route   /api/posts/unlike/:id
//@desc     visit postController.js

router.post('/unlike/:id',passport.authenticate('jwt',{session:false}), postController.unlikePost)

//@Route   /api/posts/comment/:id
//@desc     visit postController.js

router.post('/comment/:id',passport.authenticate('jwt',{session:false}), postController.commentPost)

//@Route   /api/posts/comment/:id/:comment_id
//@desc     visit postController.js

router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}), postController.deleteCommentPost)
module.exports=router 