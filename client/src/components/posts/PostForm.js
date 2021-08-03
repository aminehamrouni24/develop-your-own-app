import React, { Component } from 'react'
import classnames from 'classnames'
import {Form} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addPost} from '../../actions/postActions'
import './Posts.css'

 class PostForm extends Component {
     constructor(props){
         super(props)
         this.state={
             text:'',
             errors:{}
         }
         this.onChange=this.onChange.bind(this)
         this.onSubmit=this.onSubmit.bind(this)         
     }
     
     onSubmit(e){
        e.preventDefault();
          const {user}=this.props.auth
          const newPost={
              text:this.state.text,
              name:user.name,
              avatar:user.avatar
          }
          this.props.addPost(newPost)
          this.setState({text:''})

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }     
    render() {
        const {errors}=this.state
        return (
            
            <div className="post-form mb-3 mt-4">
            <div className="card card-dark">
            <div className="card-header bg-dark text-white">
                Say Something  ...
            </div>
            <div className="card-body"> 
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <Form.Control
                  as="textarea"
                  name="text"
                  cols="20"
                  rows="2"
                  placeholder="Enter Your Post Here..."
                  value={this.state.text}
                  onChange={this.onChange}
                  className={classnames("mb-3",{'is-invalid':errors.text})}                 
                />
                {errors.text&&(<div className="invalid-feedback">{errors.text}</div>)}                

              </div> 
              <hr/>           
            <button type="submit" className="btn btn-dark">  Submit </button>     
            </form>
            </div>
            </div>  
            </div>
        )
    }
}
PostForm.propTypes={
    addPost:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired    
}
const mapStateToProps=(state)=>({
    errors:state.errors,
    auth:state.auth
})

export default connect(mapStateToProps , {addPost})(PostForm)
