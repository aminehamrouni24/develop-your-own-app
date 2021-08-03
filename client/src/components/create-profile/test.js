import React, { Component } from 'react'
import {Form , Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class test extends Component {
    render() {
        return (
<Form>
<Form.Select aria-label="Default select example">
  <option>Open this select menu</option>
  <option value="0">Select Professional Status</option>
  <option value="Developper">Developper</option>
  <option value="Junior Developper">Junior Developper</option>
  <option value="Senior Developper">Senior Developper</option>
  <option value="Manager">Manager</option>
  <option value="Student or Learning">Student or Learning</option>
  <option value="Instructor or Teacher">Instructor or Teacher</option>
  <option value="Intern">Intern</option>
  <option value="Other">Other</option>
  <Form.Text className="text-muted">
      Give us an idea of where you are at in your carrer
    </Form.Text> 
</Form.Select> 

  <Form.Group className="mb-3" >
    <Form.Control 
    type="text"
    placeholder="Company"
    name="company"/>
    <Form.Text className="text-muted">
    Could be your own or a company website.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Control 
    type="text"
    placeholder="Location"
    name="location"/>
    <Form.Text className="text-muted">
    City & state suggested (eg. Boston, MA)
    </Form.Text>
  </Form.Group> 

    <Form.Group className="mb-3" >
    <Form.Control 
    type="text"
    placeholder="Skills"
    name="skills"/>
    <Form.Text className="text-muted">
    Please use comma separated values (eg.
    HTML,CSS,JavaScript,PHP)
    </Form.Text>
    </Form.Group> 

    <Form.Group className="mb-3" >
    <Form.Control 
    type="text"
    placeholder="Github Username"
    name="githubusername"/>
    <Form.Text className="text-muted">
    If you want your latest repos and a Github link,
    include your username
    </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" >
    <Form.Control 
    type="text"
    placeholder="A Short bio of yourself"
    name="bio"/>
    <Form.Text className="text-muted">
    Tell us a little about yourself
    </Form.Text>
    </Form.Group>

    <div className="my-2">
    <Button type="button" className="btn btn-light">
            Add Social Network Links
    </Button>
    <span>Optional</span>
    </div>

    <div className="my-2">
    <i class="fab fa-twitter fa-2x"></i>        
    <Form.Control 
    type="text"
    placeholder="Twitter Url"
    name="twitter"/>        
    <span>Optional</span>
    </div>

    <div className="my-2">
    <i class="fab fa-facebook fa-2x"></i>        
    <Form.Control 
    type="text"
    placeholder="Facebook Url"
    name="facebook"/>        
    <span>Optional</span>
    </div>

    <div className="my-2">
    <i class="fab fa-youtube fa-2x"></i>        
    <Form.Control 
    type="text"
    placeholder="youtube Url"
    name="youtube"/>        
    <span>Optional</span>
    </div>

    <div className="my-2">
    <i class="fab fa-linkedin fa-2x"></i>        
    <Form.Control 
    type="text"
    placeholder="linkedin Url"
    name="linkedin"/>        
    <span>Optional</span>
    </div>

    <div className="my-2">
    <i class="fab fa-instagram fa-2x"></i>        
    <Form.Control 
    type="text"
    placeholder="instagram Url"
    name="instagram"/>        
    <span>Optional</span>
    </div>
    

  
  <Button variant="danger"><Link to ="/dashboard">Go Back</Link></Button>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
        )
    }
}
