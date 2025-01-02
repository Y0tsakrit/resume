"use client";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from "./register";
import Login from "./login";
import Home from "./home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />}/>
      </Routes>
    </Router>
  );
}
