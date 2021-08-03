import React, { Component } from 'react'
import PropTypes from 'prop-types'
import{withRouter , Link} from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {loginUser} from '../../actions/authActions'
import {Button , Form} from 'react-bootstrap'
import './Login.css'

 class Login extends Component {
    constructor(){
      super();
      this.state={
        email:"",
        password:"",
        errors:{}
      }
      this.onChange=this.onChange.bind(this)
      this.onSubmit=this.onSubmit.bind(this)
  
    }

    componentDidMount(){
      if(this.props.auth.isAuthenticated){

        this.props.history.push('/dashboard')
      }
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.auth.isAuthenticated){
        Swal.fire({
          title: 'Hello!',
          text: 'We are happy to see you again.',
          imageUrl: 'https://lh3.googleusercontent.com/proxy/WEBgA1v1ZFfMTfmpIzib6cPCROSYhDK3v-Ze5ChFNCXn5BGSQTewa2ezfeZKS5AmcO4zFlRsNk1GLbwdZFkK8uDBTe_UqL32FuuJNjWpSTfmttr6dNpezBYYl9BFek_EcPAeGMI5u8ZlwoFtQEQmeg7QH8sGOxJvPl4',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
       this.props.history.push('/dashboard')
     //console.log('hello')
      }
      if(nextProps.errors){
        this.setState({errors:nextProps.errors});
      }
    } 
    // static getDerivedStateFromProps(nextProps, props) {
    //   if (nextProps.auth.isAuthenticated) {
    //     return ( this.props.history.push('/login') ) // <- this is setState equivalent
    //   }
    //   return null
    // }   
    onChange(e){
      this.setState({[e.target.name]:e.target.value})
    }
    onSubmit(e){
      e.preventDefault();
      const userData={
        email:this.state.email,
        password:this.state.password,
      }
      this.props.loginUser(userData)

    }
    render() {
      const {errors}=this.state
      return (
        <div className="body1">
        <div className="body2" style={{color:"white", textAlign:"center"}}>
            
        <h1 style={{padding:"10px" , color:"white"}}>Sign In</h1>
        <h3 style={{padding:"10px" , color:"white"}}>OUR JOURNEY STARTS NOW !! </h3>
         
    <Form  className="form" onSubmit={this.onSubmit} >
    <Form.Group>

      <Form.Label style={{color:"white"}}>Email:</Form.Label>
      <Form.Control 
      type="email"
      placeholder="Enter your Email"
      name="email"
      value={this.state.email}    
      onChange={this.onChange}
      className={classnames({'is-invalid':errors.email})}
       />
      {errors.email&&(<div className="invalid-feedback">{errors.email}</div>)}

  
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password"
       placeholder="Enter your Password"
        name="password" 
        value={this.state.password}
        onChange={this.onChange}
        className={classnames({'is-invalid':errors.password})}
         />
        {errors.password&&(<div className="invalid-feedback">{errors.password}</div>)}
 
   
  
    </Form.Group>


  
    <Button style={{ marginTop:"20px" , marginBottom:"20px" }} variant="primary" type="onSubmit"
    //onClick={handleSubmit} 
     >
      Login
    </Button>
  </Form>
  </div>

  </div>
      )
    }
  }
   Login.propTypes={
  loginUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}

  const mapStateToProps=(state)=>({
    auth:state.auth,
    errors:state.errors
  })
export default connect(mapStateToProps, {loginUser})(withRouter(Login))
