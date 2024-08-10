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
import Exams from "./pages/Exams";
import SingleBlog from "./pages/SingleBlog";
import Profile from "./pages/Profile";
import SingleUser from "./pages/SingleUser";
import SingleExam from "./pages/SingleExam";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Courses from "./pages/Courses";
import SingleCourse from "./pages/SingleCourse";
import SingleTutorial from "./pages/SingleTutorial";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/single-blog/:id" element={<SingleBlog />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/all-exams" element={<Exams />}></Route>
          <Route path="/single-exam/:id" element={<SingleExam />}></Route>
          <Route path="/all-users" element={<Allusers />}></Route>
          <Route path="/single-user/:id" element={<SingleUser />}></Route>
          <Route path="/page-not-found" element={<PageNotFound />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
          <Route path="/all-courses" element={<Courses />}></Route>
          <Route path="/single-course/:id" element={<SingleCourse />}></Route>
          <Route
            path="/single-tutorial/:id"
            element={<SingleTutorial />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
