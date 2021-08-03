import React, { Component } from 'react'
import {Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile , deleteAccount} from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'
import './Dashboard.css'

class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile()
    }
    onDeleteClick(e){
        this.props.deleteAccount()
    }
    render() {
        const {user} = this.props.auth;
        const {profile,loading}=this.props.profile;

        let dashboardContent;
        if( profile ===null || loading){
            dashboardContent = <Spinner/>
        }else{
            //check if logged in user has profile data 
            if(Object.keys( profile ).length> 0){
                dashboardContent =(
                    <div className="dashboard">
                        <div>
                        <p className="lead text-muted">
                             welcome  <Link to ={`/profile/${profile.handle}`}>{user.name}</Link> </p>
                        <ProfileActions/> 
                        <Experience experience = {profile.experience} />
                        <Education education = {profile.education} />
                        <div style={{marginBottom : '60px' , marginTop:'30px'}}>
                            <Button onClick={this.onDeleteClick.bind(this)} variant="danger">
                                Delete My Account
                            </Button>
                        </div>
                        </div>
                    </div>
                    
                )
            }
            else{
                //user is logged in but has no profile
                dashboardContent= (
                    <div>
                        <p className="lead text-muted"> welcome {user.name}</p>
                        <p>You have not yet setup your profile, please add some info</p>
                        <Link to ='/create-profile'><Button variant="primary"Primary>Create Your Profile
                        </Button></Link>
                    </div>
                )
            }
        }
     return (
           <div className="bigbox" >
           <h1>Dashboard</h1>
           {dashboardContent}
           </div>
        )
    }
}
Dashboard.propTypes={
    getCurrentProfile:PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    profile:state.profile,
    auth:state.auth
})
export default connect(mapStateToProps,{getCurrentProfile , deleteAccount})(Dashboard)
