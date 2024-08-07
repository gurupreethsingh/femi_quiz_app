import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Projects from "./pages/Projects";
import PageNotFound from "./pages/PageNotFound";
import Allusers from "./pages/Allusers";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/all-users" element={<Allusers />}></Route>
          <Route path="/page-not-found" element={<PageNotFound />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
