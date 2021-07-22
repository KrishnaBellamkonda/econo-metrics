import React from 'react';
import hero from './pics/phone_person_buildings.jpg';

const landingPageStyle = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), 
url(${hero})`;

const LandingPage = ()=>{
    return (
        <div className="landing-page">
            <div className="hero" style={{
                backgroundImage:landingPageStyle}}>
                
                <div className="grid-center container">
                    <div className="nav">
                        <a href="#sidebar-open">
                            <svg className="hamburger" viewBox="0 0 100 80" width="40" height="40">
                                <rect width="100" height="20"></rect>
                                <rect y="30" width="100" height="20"></rect>
                                <rect y="60" width="100" height="20"></rect>
                            </svg>
                        </a>
                        <nav>
                            <ul className="nav-links">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">How to Use</a></li>
                                <li><a href="#">About Us</a></li>
                            </ul>
                        </nav>
                    </div>

                    <div className="landing-page-text">
                        <h1>EconoMetrics</h1>
                        <h2>Analyze the world through indicators by one click</h2>
                        <div className="buttons">
                            <a href="#explore" className="explore">Explore</a>
                            <a href="#about-us" className="about-us">About us</a>
                        </div>
                    </div>

                </div>

            </div>

            
            
        </div>
    )
}

export default LandingPage;