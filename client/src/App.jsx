import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Allusers from "./pages/Allusers";
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
import SingleExam from "./pages/SingleExam";
import SingleTutorial from "./pages/SingleTutorial";
import SingleUser from "./pages/SingleUser";
import StudentDashboard from "./pages/student_pages/StudentDashboard";
import TeacherDashboard from "./pages/teacher_pages/TeacherDashboard";
import RegisterTeacher from "./pages/teacher_pages/RegisterTeacher";
import TeacherLogin from "./pages/teacher_pages/TeacherLogin";
import TeacherApprovalPending from "./pages/teacher_pages/TeacherApprovalPending";
import AdminLogin from "./pages/admin_pages/AdminLogin";
import StudentLogin from "./pages/student_pages/StudentLogin";
import AdminDashboard from "./pages/admin_pages/AdminDashboard";
import AdminRegister from "./pages/admin_pages/AdminRegister";

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
          <Route path="/single-course/:id" element={<SingleCourse />}></Route>
          <Route path="/all-exams" element={<Exams />}></Route>
          <Route path="/api/all-users" element={<Allusers />}></Route>
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
          <Route path="/teacher-register" element={<RegisterTeacher />}></Route>
          <Route path="/teacher-login" element={<TeacherLogin />}></Route>
          <Route path="/admin-login" element={<AdminLogin />}></Route>
          <Route path="/admin-register" element={<AdminRegister />}></Route>
          <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
          <Route path="/student-login" element={<StudentLogin />}></Route>
          <Route
            path="/teacher-approval-pending"
            element={<TeacherApprovalPending />}
          ></Route>

          <Route
            path="/single-tutorial/:id"
            element={<SingleTutorial />}
          ></Route>
          <Route path="/single-user/:id" element={<SingleUser />}></Route>
          <Route
            path="/student-dashboard"
            element={<StudentDashboard />}
          ></Route>
          <Route
            path="/teacher-dashboard"
            element={<TeacherDashboard />}
          ></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
