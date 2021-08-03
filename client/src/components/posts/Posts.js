
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import PostForm from './PostForm'
import Spinner from '../common/Spinner'
import {getPosts} from '../../actions/postActions'
import PostFeed from './PostFeed'
import './Posts.css'

 class Posts extends Component {
     componentDidMount(){
         this.props.getPosts()
     }
    render() {
        const {posts , loading}= this.props.post;
        let postContent;
        if(posts === null || loading){
            postContent=<Spinner/>
        }else{ 
            postContent = <PostFeed posts={posts}/>
        }
        return (
            <div className="feed">
            <h1 className="display-4 text-center" style={{color:"purple"}}><strong>Create and share your Post</strong></h1>
            <div className="container">
                <div className="row">
                    <div style={{marginLeft:"140px"}} className="col-md-8">
                        
                     <PostForm/>
                     {postContent}
                    </div>
                </div>
            </div>                   
            </div>
        )
    }
}
Posts.propTypes={
post:PropTypes.object.isRequired,
getPosts: PropTypes.func.isRequired

}
const mapStateToProps=(state)=>({
post:state.post
})
export default connect(mapStateToProps, {getPosts})(Posts)
