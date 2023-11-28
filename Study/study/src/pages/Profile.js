import React, { useState, useEffect, useRef } from 'react';
import "../styles/App.css";
import Login from "../img/Login.png";
import user from '../img/user.png';
import edit from '../img/edit.png';
import inbox from '../img/envelope.png';
import settings from '../img/settings.png';
import help from '../img/question.png';
import logout from '../img/log-out.png';
import { Auth } from './Auth/Authh';
import Cookies from "universal-cookie";
import { BrowserRouter, Routes, Route, Link,useLocation } from "react-router-dom"; // Import Link from React Router


const cookies= new Cookies();

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [isAuth,setIsAuth] = useState(cookies.get("auth-token"));

const toggle =()=>{
  setOpen(!open);
}
const login =()=>{
  return(Auth);
}



  if ( !isAuth)
  {
    return (
      <div className='profile' >
      <div className='menu-container'>
        <div className='menu-trigger'>
          <img onClick={toggle} src={Login} alt={Login} />
        </div>
        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} ref={menuRef}>
          

          
          <ul>
            <DropdownItem onClick={login} img={user} text={"Login"} page={"/Auth"} />

          </ul>
          
        </div>
      </div>
    </div>
    );
  }
  else{
    return (
      <div className='profile' >
        <div className='menu-container'>
          <div className='menu-trigger'>
            <img onClick={toggle} src={Login} alt={Login} />
          </div>
          <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} ref={menuRef}>
            
  
            <h3> User Name <br /><span>User membership</span></h3>
            <ul>
              <DropdownItem img={user} text={"My Profile"} />
              <DropdownItem img={edit} text={"Edit Profile"} />
              <DropdownItem img={inbox} text={"Inbox"} />
              <DropdownItem img={settings} text={"Settings"} />
              <DropdownItem img={help} text={"Help"} />
              <DropdownItem img={logout} text={"Logout"} />
            </ul>
            
          </div>
        </div>
      </div>
    );
  }
  
}

const DropdownItem = ({ img, text, page }) => {
  return (
    <li className="dropdownItem">
      <img src={img} alt={text} />
      <Link to={page}>{text}</Link>
    </li>
  );
};

