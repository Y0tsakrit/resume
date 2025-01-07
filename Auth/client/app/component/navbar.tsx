import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";

const Navbar = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("authToken");
  if (token) {
    setIsLoggedIn(true);
  }
}, []);


  const [search, setSearch] = useState("");
  
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <nav className="sticky top-0 bg-white z-10 ">
      <div className="flex items-center justify-between p-4 select-none gap-4">
        <Link to="/" className="text-3xl font-bold hover:underline">C2U</Link>
        <Link to="/">CPU</Link>
        <Link to="/">GPU</Link>
        <Link to="/">PSU</Link>
        <Link to="/">BOARD</Link>
        <Link to="/">COOLER</Link>
        <form className="flex">
          <input type="text" onChange={handleChange} placeholder="Search" className="border border-gray-300 rounded-tl-3xl rounded-bl-3xl p-2 pr-16 mr-0 ml-10" />
          <button onSubmit={handleSubmit} className="bg-blue-500 text-white p-2 rounded-tr-2xl rounded-br-2xl"><IoSearchSharp /></button>
        </form>
        <div className="flex gap-4 ml-auto">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="flex border border-gray-300 rounded-full p-2 justify-end mt-3">Logout</button>
            
          ) : (
            <Link to="/register" className="flex border border-gray-300 rounded-full p-2 justify-end mt-3">SignUp/SignIn</Link>
          )}
          <Link to="/register" className="flex border border-gray-300 rounded-full p-2 justify-end mt-3">SELL WIHT US</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;