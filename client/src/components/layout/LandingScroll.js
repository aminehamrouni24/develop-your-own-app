import React from 'react'
import './LandingScroll.css'
import aboutimg from './img/baack2.jpg'
import services from './img/ourservices.png'

import SmoothScroll from "smooth-scroll";
import TheFounder from './TheFounder'; 
import Caroussel from './Caroussel';
import MeetTeam from './MeetTeam';
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});


function LandingScroll() {
    return (
        <div className="about-section">
         <img src={aboutimg}  alt ="aboutus"/>
         <img src={services}  alt ="aboutus"/>
         <TheFounder/>
         <MeetTeam/>
         <Caroussel/>
        </div>
    )
}

export default LandingScroll
