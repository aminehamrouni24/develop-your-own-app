import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import{Button} from 'react-bootstrap'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import LandingScroll from './LandingScroll'


class Landing extends Component {

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
          this.props.history.push('/dashboard')
        }
      }

    render() {
      return( 
        <div>
        <div className="landing">
<div className="dark-overlay landing-inner text-light">
<div className="container">
<div className="row">
<div className="col-md-12 text-center">
<h1 className="display-3 mb-4">The First Tunisian Developers Community</h1>
<h3 className="lead">Create a developper profile/portfolio , share
posts and get help from other developpers</h3>

<hr/>
<h2>WELCOME TO THE FAMILY</h2>
<Button>
<Link to="/register" className="btn btn-lg btn-ligth mr-2 ">Get Started </Link>
</Button>

</div>
</div>
</div>
</div>
<div>
</div>
</div>
<LandingScroll/>
</div>
    )
}}
Landing.propTypes={
    auth:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
    auth:state.auth
})
  

export default connect(mapStateToProps)(Landing)
