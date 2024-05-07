import "./App.css";
import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textelements.css";
import "./stylesheets/custome-components.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/layout.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/common/Login/Login";
import Register from "./pages/common/Register/Register";
import Home from "./pages/common/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Exams from "./pages/admin/Exams/Exams";
import AddEditExam from "./pages/admin/Exams/AddEditExam";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* common routes */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        {/* all users routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>

        {/* only admin routes */}
        <Route
          path="/admin/exams"
          element={
            <ProtectedRoute>
              <Exams />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/exams/add"
          element={
            <ProtectedRoute>
              <AddEditExam />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/exams/edit/:id"
          element={
            <ProtectedRoute>
              <AddEditExam />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
