import React from 'react'
import {FaHamburger} from "react-icons/fa";
import { useState } from 'react';
import { Link } from "react-router-dom";
import {BiHomeAlt} from "react-icons/bi";
import "../styles/App.css";

import { Auth } from './Auth/Authh';
import Cookies from "universal-cookie";
import { signOut,getAuth } from 'firebase/auth';
import {Profile} from "./Profile"
export const Header = () => {
    const cookies = new Cookies();
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  
    const logout = () => {
      console.log("hello");
      const auth = getAuth();
      signOut(auth);
      setIsAuth(false); // Corrected the assignment
    };
  
    // Rest of your component code
  
  
  
  
    return (
<div className= "header" >




        <div className='title'>           
            <img className="brain"src="/BrainLogo.png"></img>
            <h1> Brain Flow </h1>       
        </div>
          <div className="pages">
          {/* Use Link to make "Website Name" clickable */}
            <ul>
                <li className = "headerLink">
                
                <Link to="/"> <BiHomeAlt className='headersvg'></BiHomeAlt> Dashboard </Link>
                </li>
            </ul>

            <ul>
                <li>
                <Link to="/chat"> Chat </Link>
                </li>
            </ul>

            <ul>
                <li>
                <Link to="/about"> About </Link>
                </li>
            </ul>

            <ul className="profile"> 
                <li>                 <Profile/>
                
                </li>
            </ul>

          </div>
</div>
  );
}

