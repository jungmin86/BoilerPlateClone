import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage.js';
import RegisterPage from './components/views/RegisterPage/RegisterPage.js';
// import Auth from './hoc/auth.js';


function App() {

  // const AuthLandingPage = auth({LandingPage}, null);
  // const AuthRegisterPage = auth({RegisterPage}, false);
  // const AuthLoginPage = auth({LoginPage}, false);
  return (
    <div>
     <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

