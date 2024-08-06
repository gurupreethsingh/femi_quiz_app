import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/userRoutes/Login';
import About from './pages/common/About';
import Contact from './pages/common/Contact';
import Header from './components/Header';
import PageNotFound from './pages/common/PageNotFound';
import PrivacyPolicy from './pages/common/PrivacyPolicy';

function App() {

  return (
    <Router>
      <Header />
         <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/page-not-found" element={<PageNotFound />}></Route>
        <Route path="/*" element={<PageNotFound />}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
      </Routes>
    </Router>
  )
}

export default App
