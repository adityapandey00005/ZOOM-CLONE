import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Route, BrowserRouter as Router, Routes,  } from 'react-router-dom'
import './App.css';
import Landingpage from "./pages/landing.jsx";
import Authentication from "./pages/authentication.jsx";
import { AuthProvider } from './contexts/AuthContext.jsx';
import VedioMeetComponent from "./pages/vedioMeet.jsx";
import HomeComponent from './pages/home';

import History from './pages/history';

function App() {
  return (
    <Router>

      <AuthProvider>
      <Routes>
        
        <Route path="/" element={<Landingpage />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path='/home' element={<HomeComponent />} />
        <Route path='/history' element={<History />} />
        <Route path="/:url" element={<VedioMeetComponent />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
