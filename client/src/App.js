import "./App.css";
import { Button, Flex } from "antd";
import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textelements.css";
import "./stylesheets/custome-components.css";
import "./stylesheets/form-elements.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/common/Login/Login";
import Register from "./pages/common/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
