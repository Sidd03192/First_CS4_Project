import React from 'react'
import {FaHamburger} from "react-icons/fa";
import { Link } from "react-router-dom";
import {BiHomeAlt} from "react-icons/bi";
import "../styles/App.css";
import BrainLogo from "./BrainLogo.png";
export const Header =() =>{
  
  
  
    return (
<div className= "header" >
        <div className='title'>
            
            <img className="brain"src={BrainLogo}></img>
            Brain Flow
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

            <ul className="logout"> 
                <li>
                <Link to="/Auth"> Logout </Link>
                </li>
            </ul>

            </div>
        </div>
  );
}

