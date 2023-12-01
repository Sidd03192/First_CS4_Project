import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth, firestore } from "./components/firebase"; // Assuming you have the firebase file in the same directory
import { Loader } from './components/Loader';
import { Header } from './pages/header';
import { Roomz } from './pages/roomz';
import { Dash } from './pages/dash';
import { About } from './pages/about';
import { Authh } from './pages/Auth/Authh';
import { SignUp } from './pages/Auth/SignUp';
import { Navigate } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);
      setIsAuth(!!user);
    });

    return () => unsubscribe();
  }, []);

  const PrivateRoute = ({ element, ...props }) => {
    return isAuth ? element : <Navigate to="/auth" />;
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Authh />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/chat" element={<PrivateRoute element={<Roomz />} />} />
          <Route path="/" element={<PrivateRoute element={<Dash />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
