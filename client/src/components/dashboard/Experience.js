import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Button , Table} from 'react-bootstrap'
import Moment from 'react-moment'
import './TabEdu.css'
import PropTypes from 'prop-types'
import {deleteExperience} from '../../actions/profileActions'

 class Experience extends Component {
     onDeleteClick(id){
         this.props.deleteExperience(id)
     }
    render() {
        const experience=this.props.experience
        .map(exp=>(<tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> 
            - {exp.to===null?( 'Now'):(<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
            </td>
            <td><Button onClick={this.onDeleteClick.bind(this , exp._id)} variant="danger"> Delete</Button></td>
        </tr>))
        return (
            <div className="tabedu">                
              <h2 className="my-2">Experience Credentials</h2>              
            <Table >
            <thead>
            <tr>
            <th >Company</th>
            <th >Title</th>
            <th >Years</th>
            <th></th>
            </tr>
            </thead>
            <tbody>
            {experience}
            </tbody>
            </Table>

            </div>
        )
    }
}
Experience.propTypes={
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null , {deleteExperience})(Experience)
