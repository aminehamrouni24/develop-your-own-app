import{Form,Button }from 'react-bootstrap'
import classnames from 'classnames'
import{withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import{registerUser} from '../../actions/authActions'
//import {useHistory} from 'react-router-dom'
//import Swal from 'sweetalert2'
//import{useState}from 'react'
import './Register.css'


import React, { Component } from 'react'

 class Register extends Component {
  constructor(){
    super();
    this.state={
      name:"",
      email:"",
      password:"",
      password2:"",
      errors:{}
    };
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this)
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.errors){
  //     this.setState({errors:nextProps.errors});
  //   }
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return ({ errors: nextProps.errors }) // <- this is setState equivalent
    }
    return null
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }
  onSubmit(e){
    e.preventDefault();
    const newUser={
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      password2:this.state.password2
    }

    this.props.registerUser(newUser,this.props.history)
  }
  render() {
    const {errors}=this.state
    return (

      
      <div className="body3">
          
      <h1 style={{padding:"10px" , color:"white"}}>Sign Up</h1>
      <h3 style={{padding:"10px" , color:"white"}}>Create your Developper account</h3>

      
  <Form  className="form" onSubmit={this.onSubmit} >
  <Form.Group>
    <Form.Label>Fullname:</Form.Label>
    <div>
    <Form.Control
     type="text"
     placeholder="Enter your username"
      name="name"
      value={this.state.name}
      onChange={this.onChange}
      className={classnames({'is-invalid':errors.name})}
       />
       {errors.name&&(<div className="invalid-feedback">{errors.name}</div>)}
      </div>
    <Form.Label>Email:</Form.Label>
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

    <Form.Label>Confirm your Password:</Form.Label>
    <Form.Control type="password"
     placeholder="Re-enter your Password"
      name="password2"
      value={this.state.password2}
     onChange={this.onChange}
     className={classnames({'is-invalid':errors.password2})} 
       />
     {errors.password2&&(<div className="invalid-feedback">{errors.password2}</div>)}


  </Form.Group>

  <Button style={{marginTop:"10px", marginBottom:"10px"}} variant="primary" type="onSubmit"
  //onClick={handleSubmit} 
   >
    Register
  </Button>
</Form>
</div>
    )
  }

}
Register.propTypes={
  registerUser:PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
  auth:state.auth,
  errors:state.errors
})
export default connect(mapStateToProps,{registerUser})(withRouter(Register))








   

