import { useEffect, useState } from "react";
import {
  Navigate,
  redirect,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navebar";
import Protected from "./components/Protected";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Singnup from "./pages/Singnup";

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/singnup" element={<Singnup />} />
        {/* <Route path="/singnup" element={<Protected Component={Singnup}/>}/> */}
        <Route path="/home" element={<Protected Component={Home}/> } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
