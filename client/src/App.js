import logo from "./logo.svg";
import "./App.css";
import Layouts from "./Components/layout";
import LoginPage from "./Components/Login";
import RegisterPage from "./Components/Register";
// import User from "./Components/User";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function App() {
  // if (
  //   localStorage.getItem("user_id") == null &&
  //   localStorage.getItem("access_token") == null
  // ) {
  //   navigate("/login");
  // }

  return (
    // <div>
    <Router>
      {/* <Layouts /> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/home" element={<Layouts />} /> */}
        {/* <Route path="/user" element={<User />} /> */}
      </Routes>
      <Layouts />
      {/* <Layouts /> */}
    </Router>
    // </div>
  );
}
export default App;
