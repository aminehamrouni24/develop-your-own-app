import React, { Component } from 'react'
import{Navbar,Nav,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import{connect} from 'react-redux'
import {logoutUser} from '../../actions/authActions'
import {clearCurrentProfile} from '../../actions/profileActions'
import './Mynav.css'

 class Mynav extends Component { 
   onLogoutClick(e){
     e.preventDefault()
     this.props.clearCurrentProfile()
     this.props.logoutUser()
   }
  render() {

      const{isAuthenticated, user}=this.props.auth;
      const authLinks=(
        <Nav className="nav">
          <Nav.Link componentclass={Link} href="/feed">Post feed</Nav.Link>          
          <Nav.Link componentclass={Link} href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link  href="#" onClick={this.onLogoutClick.bind(this)}>
            <img className="rounded-circle" src={user.avatar} alt={user.name} style={{width:'25px', marginRight:'5px'}} />
            Logout
          </Nav.Link>
          </Nav>
      )

      const guestLinks=(
        <Container >
        <Nav className="nav" > 
       <Nav.Link componentclass={Link} href="/login">Login</Nav.Link>
       <Nav.Link componentclass={Link} href="/register">Register</Nav.Link>
       </Nav>
       </Container>
   )      

    return (
      
        <Navbar style={{background : "black"}} variant="dark" className="mr-auto mr-10 my-2 my-lg-0">
        <Container className="nav">
        <Navbar.Brand href="/">GameOfCodes</Navbar.Brand>
        <Nav className="nav">
          {/* <Nav.Link componentclass={Link} href="/login">Login</Nav.Link>
          <Nav.Link componentclass={Link} href="/register">Register</Nav.Link> */}
          <Nav.Link componentclass={Link} href="/profiles">Developpers</Nav.Link>
        </Nav>
        {isAuthenticated ? authLinks:guestLinks}

        </Container>
      </Navbar>
      
    )
  }
}
Mynav.propTypes={
  logoutUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
  auth:state.auth
})

export default connect(mapStateToProps,{logoutUser , clearCurrentProfile})(Mynav)
