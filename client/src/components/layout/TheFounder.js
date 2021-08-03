import React from 'react'
import './TheFounder.css'
function TheFounder() {
    return (
        <div className="thefounder">
            <h1 style={{color:"white" , textAlign:"center"}}>For Who ? </h1>
            <div className="containner">
                
        <div className="card">
            <div className="content">
                <h1>01</h1>
                <h3>Developpers</h3>
                <p>
                    This App is dedicated to developpers all across 
                    the country , so can they interact freely and 
                    make good relations ..
                </p>
                <a href="/register">Read More!</a>
            </div>
        </div>
        <div className="card">
            <div className="content">
                <h1>02</h1>
                <h3>You want to become a developper?</h3>
                <p>
                    One of our basic roles is to guide 
                    the new generation throught the web development world
                    by providing them with advice and good ressources..
                </p>
                <a href="/register">Read More!</a>
            </div>
        </div>  
        <div className="card">
            <div className="content">
                <h1>03</h1>
                <h3>Companies</h3>
                <p>
                    This plateform can afford to help any developper
                    get the joob of his dreams , and guiding him 
                    throught the job interviews .
                    You can find a lot of job offers on the site..
                </p>
                <a href="/register">Read More!</a>
            </div>
        </div> 
        </div>
        </div>
    )
}

export default TheFounder
