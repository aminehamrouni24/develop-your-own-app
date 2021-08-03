import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Button , Table} from 'react-bootstrap'
import Moment from 'react-moment'
import './TabEdu.css' 
import PropTypes from 'prop-types'
import {deleteEducation} from '../../actions/profileActions'

 class Education extends Component {
     onDeleteClick(id){
         this.props.deleteEducation(id)
     }
    render() {
        const education=this.props.education
        .map(edu=>(<tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> 
            - {edu.to===null?( 'Now'):(<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
            </td>
            <td><Button onClick={this.onDeleteClick.bind(this , edu._id)} variant="danger"> Delete</Button></td>
        </tr>))
        return (
            <div className="tabedu">                
              <h2 className="my-2">Education Credentials</h2>              
            <Table >
            <thead>
            <tr>
            <th >School</th>
            <th >Degree</th>
            <th >Years</th>
            <th></th>
            </tr>
            </thead>
            <tbody>
            {education}
            </tbody>
            </Table>

            </div>
        )
    }
}
Education.propTypes={
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null , {deleteEducation})(Education)