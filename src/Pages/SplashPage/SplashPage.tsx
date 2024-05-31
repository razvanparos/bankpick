import './SplashPage.css';
import React from 'react'
import logo from '../../Assets/logo.png'
import { Fade } from "react-awesome-reveal";

function SplashPage() {
  return (
    <div className="splash-page-div">
        <Fade duration={2000}>
            <img src={logo} alt="" />
            <h1>BANKPICK</h1>
        </Fade>
        
    </div>
  );
}

export default SplashPage;
