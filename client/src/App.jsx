import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import Allusers from "./pages/Allusers";
import BlogPage from "./pages/BlogPage";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import Exams from "./pages/Exams";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import HrDashboard from "./pages/HrDashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import SingleBlog from "./pages/SingleBlog";
import SingleCourse from "./pages/SingleCourse";
<<<<<<< HEAD
=======
import SingleExam from "./pages/SingleExam";
>>>>>>> 033917d046c9641d5a34dbdb93b5edd3a65971a5
import SingleTutorial from "./pages/SingleTutorial";
import SingleUser from "./pages/SingleUser";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
          <Route path="/all-courses" element={<Courses />}></Route>
<<<<<<< HEAD
          <Route path="/single-course/:id" element={<SingleCourse />}></Route>
=======
          <Route path="/all-exams" element={<Exams />}></Route>
          <Route path="/all-users" element={<Allusers />}></Route>
          <Route path="/blogpage" element={<BlogPage />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/hr-dashboard" element={<HrDashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/page-not-found" element={<PageNotFound />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/single-blog/:id" element={<SingleBlog />}></Route>
          <Route path="/single-course/:id" element={<SingleCourse />}></Route>
          <Route path="/single-exam/:id" element={<SingleExam />}></Route>
>>>>>>> 033917d046c9641d5a34dbdb93b5edd3a65971a5
          <Route
            path="/single-tutorial/:id"
            element={<SingleTutorial />}
          ></Route>
          <Route path="/single-user/:id" element={<SingleUser />}></Route>
          <Route path="/student-dashboard" element={<StudentDashboard />}></Route>
          <Route path="/teacher-dashboard" element={<TeacherDashboard />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;