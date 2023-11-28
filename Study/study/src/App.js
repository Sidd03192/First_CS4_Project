import React, { useState,useEffect } from 'react';
import { Auth } from './pages/Auth/Authh';
import { Roomz } from './pages/roomz';

import "./styles/App.css";
import { FaHamburger } from "react-icons/fa";
import { BrowserRouter, Routes, Route, Link,useLocation } from "react-router-dom"; // Import Link from React Router
import { Dash } from "./pages/dash";
import { About } from "./pages/about";
import {Loader} from "./components/Loader";
import {Header} from "./pages/header"

import { SignUp } from './pages/Auth/SignUp';

function App() {
  // navigation states
  
  
 const [isLoading,setIsLoading]=useState(false);
  //  preloader
  /*useEffect(()=>{
    const fakedataFetch =()=>{
      setTimeout(()=>{
        setIsLoading(false);
      },2000);
    }
    fakedataFetch();
  },[])
  
**/
  // Check if authenticated :)



  const[isAuth, setIsAuth] =useState(false);
  return (
    
      isLoading? <Loader/>: <div className="app">
      <BrowserRouter>

        <Header>
          
          {/* Use Link to make "Website Name" clickable */}
        </Header>


        <Routes >
            <Route path="/chat" element={<Roomz />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/" element={<Dash />}></Route>
            <Route path="/auth" element={<Auth />}></Route>
            <Route path= "/SignUp" element={<SignUp/>}></Route>
          </Routes>

        

      </BrowserRouter>
    </div>
    
   
  );
}

export default App;
