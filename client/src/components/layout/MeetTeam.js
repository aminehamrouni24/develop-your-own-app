import React from 'react'
import './TheFounder.css'
import teamimg from './img/aa001.png'
function MeetTeam() {
    return (
        <div className="thefounder">
            <h1 style={{color:"white" , textAlign:"center"}}>Meet The Founder </h1>
            <div className="containner">
                
        <div className="card">
            <div className="content">
                <h1>01</h1>
                <h3>Amine Hamrouni</h3>
                <img 
                src={teamimg}
                alt="logo"
                className="rounded-circle"
                style={{width:"100px"}}/>
                <p>
                    IT Network Administrator with 6 years of experience .
                    Also a fresh FullStack JS Developper.
                </p>

                <a href="https://www.linkedin.com/in/amine-hamrouni-b947a2202/">Get in Touch</a>
            </div>
        </div>
        <div className="card">
            <div className="content">
                <h1>02</h1>
                <h3>Profile Links</h3>
                <div>
                <i className="fab fa-github fa-3x"></i>
                <a href="https://github.com/aminehamrouni24">Github</a>
                </div>                
                <div>
                <i className="fab fa-facebook fa-3x"></i>
                <a href="https://www.facebook.com/amine.hamrouni.31/">facebook</a>
                </div>
                <div>
                <i className="fab fa-linkedin fa-3x"></i>
                <a href="https://www.linkedin.com/in/amine-hamrouni-b947a2202/">Linkedin</a>
                </div>
                <div>
                <i className="fab fa-instagram fa-3x"></i>
                <a href="/register">Instagram</a>
                </div>
        

                
            </div>
        </div>  
 
        </div>
        </div>
    )
}

export default MeetTeam
