import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth, db } from "./firebase"; // Assuming you have the firebase file in the same directory
import { Loader } from './components/Loader';
import { Header } from './pages/header';
import { Roomz } from './pages/roomz';
import { Dash } from './pages/dash';
import { About } from './pages/about';
import { Authh } from './pages/Auth/Authh';
import { SignUp } from './pages/Auth/SignUp';
import { Navigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import LevelsPage from './Levels/Levels';
import LevelDetailPage from './Levels/levelDetails';
function App() {

  let nombre ="";
  let email="";
  let photoURL=null;
  const auth = getAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
     nombre = user.displayName;
     email = user.email;
     photoURL = user.photoURL;
     
  // glow effect for sign in button
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);
      setIsAuth(!!user);
      setUser(user);
      
    });

    return () => unsubscribe();
  }, []);

  const PrivateRoute = ({ element, ...props }) => {
    if ( isAuth)
    {
      return element;
    }
    else{
      alert("please sign in first :)");
      return <Navigate to="/auth"/>
    }
  

    // put error message 
  };
 

  
  return isLoading ? (
    <Loader />
  ) : (
    <div className="app">
      <BrowserRouter>
        <Header name={nombre} email={email} photo={photoURL}/>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Authh />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/chat" element={<PrivateRoute element={<Roomz />} />} />
          <Route path="/" element={<PrivateRoute element={<Dash name={nombre}/>} />} />
          <Route path="/learn" element={<LevelsPage />} />
        <Route path="/level/:levelId" element={<LevelDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

  }
export default App;