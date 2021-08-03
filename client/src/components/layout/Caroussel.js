import React from 'react'
import {Form , Button} from 'react-bootstrap'
import './Caroussel.css'
function Caroussel() {
    return (
        <div className="containeer">
		<div className="contaact-box">
			<div className="leeft">
                
            </div>
			<div className="riight">
				<h2>Contact Us</h2>
				<input type="text" className="fiield" placeholder="Your Name"/>
				<input type="text" className="fiield" placeholder="Your Email"/>
				<input type="text" className="fiield" placeholder="Phone"/>
				<textarea placeholder="Message" className="fiield"></textarea>
				<button className="btn">Send</button>
			</div>
		</div>
	</div>
    )
}

export default Caroussel
