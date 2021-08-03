import React, { Component } from 'react'
import {Form} from 'react-bootstrap'
import classnames from 'classnames'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addExperience} from '../../actions/profileActions'
import "./AddExperience.css"


class AddExperience extends Component {
    constructor(props){
        super(props)
        this.state={
            company:'',
            title:'',
            location:'',
            from:'',
            to:'',
            current:false,
            description:'',
            errors:{},
            disabled:false
        };

            this.onChange=this.onChange.bind(this)
            this.onSubmit=this.onSubmit.bind(this)
            this.onCheck=this.onCheck.bind(this)
            
                
        
    }
	componentWillReceiveProps(nextProps){
      if(nextProps.errors){
		  this.setState({errors: nextProps.errors })
	  }
	}
    onSubmit(e){
        e.preventDefault()
        const expData={
			company:this.state.company,
			title:this.state.title,
			location:this.state.location,
			from:this.state.from,
			to:this.state.to,
			current:this.state.current,
			description:this.state.description
		}
		this.props.addExperience(expData, this.props.history)
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onCheck(e){
        this.setState({
            disabled:!this.state.disabled,
            current:!this.state.current
        })
    }
    render() {
        const {errors}= this.state
        return (
            <div className="addexperience">
            <div className="container">
            <h1 className="large text-primary">
             Add An Experience
            </h1>
            <p className="lead">
              <i className="fas fa-code-branch"></i> Add any developer/programming
              positions that you have had in the past
            </p>
            <small>* = required field</small>
            <Form onSubmit={this.onSubmit} className="form">
              <div className="form-group">
                <Form.Control
                type="text"
                placeholder="* Job Title"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                className={classnames("mb-3",{'is-invalid':errors.title})} />
                {errors.title&&(<div className="invalid-feedback">{errors.title}</div>)}

              </div>
              <div className="form-group">
                <Form.Control
                type="text"
                placeholder="* Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                className={classnames("mb-3",{'is-invalid':errors.company})}/>
                {errors.company&&(<div className="invalid-feedback">{errors.company}</div>)}

              </div>
              <div className="form-group">
                <Form.Control
                className="mb-3"
                type="text"
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <h4>From Date</h4>
                <Form.Control
                type="date"
                name="from"
                value={this.state.from}
                onChange={this.onChange}
                className={classnames("mb-3",{'is-invalid':errors.from})}/>
                {errors.from&&(<div className="invalid-feedback">{errors.from}</div>)}

              </div>
              <div className="form-group">
                <h4>To Date</h4>
                <Form.Control
                type="date"
                name="to"
                value={this.state.to}
                onChange={this.onChange}
                className="mb-3"
                disabled={this.state.disabled ?'disabled':''}/>
              </div>

               <div className="form-group">
               
               <Form.Check
                type="checkbox"
                name="current"
                label="Current"
                value={this.state.current}
                checked={this.state.current}
                onChange={this.onCheck}
                 />
               </div> 

              <div className="form-group">
                <Form.Control
                  as="textarea"
                  name="description"
                  cols="30"
                  rows="5"
                  placeholder="Job Description"
                  value={this.state.description}
                  onChange={this.onChange}
                ></Form.Control>
              </div>
              
              <Form.Control type="submit"  className="btn btn-primary my-1" />
              {/* <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link> */}
            </Form> 
            </div>
          </div>
        )
    }
}
AddExperience.propTypes={
	addExperience:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
	
    profile:state.profile,
    errors:state.errors
})
export default connect(mapStateToProps,{addExperience})(withRouter(AddExperience))
