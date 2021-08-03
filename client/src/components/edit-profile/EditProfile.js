import React, { Component } from 'react'
import{connect} from'react-redux'
import{Link , withRouter} from 'react-router-dom'
import {createProfile} from '../../actions/profileActions'
import { getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/is-empty'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import "./EditProfile.css"
import { Form , Button } from 'react-bootstrap'

 class CreateProfile extends Component {
     constructor(props){
         super(props)
         this.state={
             displaySocialInputs:false,
             handle:'',
             company:'',
             website:'',
             location:'',
             status:'',
             skills:'',
             githubusername:'',
             bio:'',
             twitter:'',
             facebook:'',
             linkedin:'',
            youtube:'',
            instagram:'',
            errors:{} 
            }
    this.onChange=this.onChange.bind(this)
    this.onSubmit=this.onSubmit.bind(this)

     }
      
     componentDidMount(){
         this.props.getCurrentProfile()
     }

     componentWillReceiveProps(nextProps){
         if(nextProps.errors){
             this.setState({errors:nextProps.errors})
         }
         if(nextProps.profile.profile){
            const profile =nextProps.profile.profile
           // comma seperate string for the skills CSV
           const skillsCSV= profile.skills.join(',')
           //if profile field doesnt exist , make empty string
           profile.company=!isEmpty(profile.company)?profile.company:'';
           profile.website=!isEmpty(profile.website)?profile.website:'';
           profile.location=!isEmpty(profile.location)?profile.location:'';
           profile.githubusername=!isEmpty(profile.githubusername)?profile.githubusername:'';
           profile.bio=!isEmpty(profile.bio)?profile.bio:'';
           profile.social=!isEmpty(profile.social)?profile.social:{};
           profile.twitter=!isEmpty(profile.social.twitter)?profile.social.twitter:'';
           profile.facebook=!isEmpty(profile.social.facebook)?profile.social.facebook:'';
           profile.linkedin=!isEmpty(profile.social.linkedin)?profile.social.linkedin:'';
           profile.youtube=!isEmpty(profile.social.youtube)?profile.social.youtube:'';
           profile.instagram=!isEmpty(profile.social.instagram)?profile.social.instagram:'';
           //set component fileds state
           this.setState({
            handle:profile.handle,
            company:profile.company,
            website:profile.website,
            location:profile.location,
            status:profile.status,
            skills:skillsCSV,
            githubusername:profile.githubusername,
            bio:profile.bio,
            twitter:profile.twitter,
            facebook:profile.facebook,
            linkedin:profile.linkedin,
           youtube:profile.youtube,
           instagram:profile.instagram,               
           })

        }
     }
     
     onSubmit(e){
        e.preventDefault()
        const profileData ={
          handle:this.state.handle,
          company:this.state.company,
          website:this.state.website,
          location:this.state.location,
          status:this.state.status,
          skills:this.state.skills,
          githubusername:this.state.githubusername,
          bio:this.state.bio,
          twitter:this.state.twitter,
          facebook:this.state.facebook,
          linkedin:this.state.linkedin,
         youtube:this.state.youtube,
         instagram:this.state.instagram,
        }
        this.props.createProfile(profileData , this.props.history)
    }
     onChange(e){
     this.setState({[e.target.name]:e.target.value})
      }


    render() {
        const {errors , displaySocialInputs}=this.state
        let socialInputs;
        if(displaySocialInputs){
            socialInputs= (
    <div>
    <div className="my-2">
    <i className="fab fa-twitter fa-2x"></i>        
    <Form.Control 
    type="text"
    placeholder="Twitter Url"
    name="twitter"
    value={this.state.twitter}
    onChange={this.onChange}
    className={classnames({'is-invalid':errors.twitter})} /> 
    {errors.twitter&&(<div className="invalid-feedback">{errors.twitter}</div>)}

    </div>

    <div className="my-2">
    <i className="fab fa-facebook fa-2x"></i>        
    <Form.Control 
    type="text"
    placeholder="Facebook Url"
    name="facebook"
    value={this.state.facebook}
    onChange={this.onChange}
    className={classnames({'is-invalid':errors.facebook})}/> 
    {errors.facebook&&(<div className="invalid-feedback">{errors.facebook}</div>)}

    </div>

    <div className="my-2">
    <i className="fab fa-youtube fa-2x"></i>        
    <Form.Control 
    type="text"
    placeholder="youtube Url"
    name="youtube"
    value={this.state.youtube}
    onChange={this.onChange}
    className={classnames({'is-invalid':errors.youtube})}/> 
    {errors.youtube&&(<div className="invalid-feedback">{errors.youtube}</div>)}

    </div>

    <div className="my-2">
    <i className="fab fa-linkedin fa-2x"></i>        
    <Form.Control 
    type="text"
    placeholder="linkedin Url"
    name="linkedin"
    value={this.state.linkedin}
    onChange={this.onChange}
    className={classnames({'is-invalid':errors.linkedin})}/>
    {errors.linkedin&&(<div className="invalid-feedback">{errors.linkedin}</div>)}

    </div>

    <div className="my-2">
    <i className="fab fa-instagram fa-2x"></i>        
    <Form.Control 
    type="text"
    placeholder="instagram Url"
    name="instagram"
    value={this.state.instagram}
    onChange={this.onChange}
    className={classnames({'is-invalid':errors.instagram})}/>
    {errors.instagram && (<div className="invalid-feedback">{errors.instagram}</div>)}

    </div>
    </div>

            )
        }

        return (
<div className="editprofile">           
<div className="create-profile">
<div className="container">
<div className="row">
<div className="col-md-8 m-auto">
<h1 className="display-4 text-center large text-primary text-center">Edit Your Profile</h1>


<Button variant="primary" style={{marginBottom : '30px' , marginTop:'30px'}} 
componentclass={Link} href="/dashboard" >Go Back</Button>

<Form  className="form" onSubmit={this.onSubmit}>
<Form.Select
name="status"
value={this.state.status}
onChange={this.onChange}
aria-label="Default select example"
className={classnames({'is-invalid':errors.status})}
>
  <option>Select your current Status</option>
  <option value="Developper">Developper</option>
  <option value="Junior Developper">Junior Developper</option>
  <option value="Senior Developper">Senior Developper</option>
  <option value="Manager">Manager</option>
  <option value="Student or Learning">Student or Learning</option>
  <option value="Instructor or Teacher">Instructor or Teacher</option>
  <option value="Intern">Intern</option>
  <option value="Other">Other</option> 
</Form.Select> 
{errors.status &&(<div className="invalid-feedback">{errors.status}</div>)}

<Form.Text className="text-muted">
      Give us an idea of where you are at in your carreer
    </Form.Text>

    <Form.Group className="mb-3" >
    <Form.Control 
    type="text"
    placeholder=" Profile Handle"
    name="handle"
    value={this.state.handle}
    onChange={this.onChange}
    className={classnames({'is-invalid':errors.handle})}/>
    {errors.handle &&(<div className="invalid-feedback">{errors.handle}</div>)}

    <Form.Text className="text-muted">
    A unique Handle for your Profile URL
    </Form.Text>
    </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Control 
    type="text"
    placeholder="Company"
    name="company"
    value={this.state.company}
    onChange={this.onChange}
 />

    <Form.Text className="text-muted">
    Could be your own or a company website.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Control 
    type="text"
    placeholder="Location"
    name="location"
    value={this.state.location}
    onChange={this.onChange}/>

    <Form.Text className="text-muted">
    City & state suggested (eg. Boston, MA)
    </Form.Text>
  </Form.Group> 

    <Form.Group className="mb-3" >
    <Form.Control 
    type="text"
    placeholder="Skills"
    name="skills"
    value={this.state.skills}
    onChange={this.onChange}
    className={classnames({'is-invalid':errors.skills})}/>
    {errors.skills&&(<div className="invalid-feedback">{errors.skills}</div>)}
    <Form.Text className="text-muted">
    Please use comma separated values (eg.
    HTML,CSS,JavaScript,PHP)
    </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" >
    <Form.Control 
    type="text"
    placeholder="Website"
    name="website"
    value={this.state.website}
    onChange={this.onChange}
 />
    <Form.Text className="text-muted">
    Please fill the URL of your website , if it exists
    </Form.Text>
 </Form.Group>


    <Form.Group className="mb-3" >
    <Form.Control 
    type="text"
    placeholder="Github Username"
    name="githubusername"
    value={this.state.githubusername}
    onChange={this.onChange}
    />
    <Form.Text className="text-muted">
    If you want your latest repos and a Github link,
    include your username
    </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" >
    <Form.Control 
    type="text"
    placeholder="A Short bio of yourself"
    name="bio"
    value={this.state.bio}
    onChange={this.onChange}
    className={classnames({'is-invalid':errors.bio})}    />
    {errors.bio&&(<div className="invalid-feedback">{errors.bio}</div>)}

    <Form.Text className="text-muted">
    Tell us a little about yourself
    </Form.Text>
    </Form.Group>

    <div className="my-2">
    <Button type="button" className="btn btn-light"
    onClick={()=>this.setState(prevState=>
    ({displaySocialInputs:!prevState.displaySocialInputs}))}>
            Add Social Network Links
    </Button>
    </div>
    {socialInputs}

    
    

  

  <Button variant="primary" type="onSubmit" >
    Submit
  </Button>
</Form>
                            
</div>
                        
</div>
</div>
</div>
</div>
        )
    }
}
CreateProfile.propTypes={
    getCurrentProfile: PropTypes.func.isRequired,
    createProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    profile:state.profile,
    errors:state.errors
})
export default connect(mapStateToProps,{createProfile , getCurrentProfile})(withRouter(CreateProfile))