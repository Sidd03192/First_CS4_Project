import React, { useState,useEffect } from 'react';
import { Auth } from './pages/Auth';
import { Roomz } from './pages/roomz';
import Navbar from './components/Navbar';
import "./styles/App.css";
import { FaHamburger } from "react-icons/fa";
import { BrowserRouter, Routes, Route, Link,useLocation } from "react-router-dom"; // Import Link from React Router
import { Dash } from "./pages/dash";
import { About } from "./pages/about";
import {Loader} from "./components/Loader";
import {Header} from "./pages/header"

function App() {
  // navigation states
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(!showNav); // toggles nav
  }
  const removeNav=()=>{
    setShowNav(false);
  }
  const [isLoading,setIsLoading]=useState(true);
  //  preloader
  useEffect(()=>{
    const fakedataFetch =()=>{
      setTimeout(()=>{
        setIsLoading(false);
      },2000);
    }
    fakedataFetch();
  },[])

  return (
    
      isLoading? <Loader/>: <div className="app">
      <BrowserRouter>

        <Header>
          <FaHamburger className="burger" onClick={toggleNav} />
          
          {/* Use Link to make "Website Name" clickable */}
          <Link to="/" className='websiteName' onClick={removeNav}>Website Name</Link>
        </Header>

        <Navbar visible={false} />

        <div className="main" onClick={removeNav}>
        <Routes >
            <Route path="/chat" element={<Roomz />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/" element={<Dash />}></Route>
          </Routes>

        </div>

      </BrowserRouter>
    </div>
    
   
  );
}

export default App;
