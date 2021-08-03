import React from 'react'
import {Link} from 'react-router-dom'
import './ProfileActions.css'

const ProfileActions=()=> {
    return (
        <div  className="actions">
        <Link to="/edit-profile" className="btna"
          ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        <Link to="/add-experience" className="btna"
          ><i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
        <Link to="/add-education" className="btna"
          ><i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
      </div>
    )
}
export default ProfileActions
