import React from "react";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-10 shadow-md">
      <div className="flex items-center justify-between p-4 select-none gap-4">
        <Link to="/" className="text-3xl font-bold hover:underline">C2U</Link>
        <Link to="/">CPU</Link>
        <Link to="/">GPU</Link>
        <Link to="/">PSU</Link>
        <Link to="/">BOARD</Link>
        <Link to="/">COOLER</Link>
        <form className="flex">
          <input type="text" placeholder="Search" className="border border-gray-300 rounded-tl-3xl rounded-bl-3xl p-2 pr-16 mr-0 ml-10" />
          <button className="bg-blue-500 text-white p-2 rounded-tr-2xl rounded-br-2xl"><IoSearchSharp /></button>
        </form>
        <div className="flex gap-4 ml-auto">
          <Link to="/register" className="flex border border-gray-300 rounded-full p-2 justify-end mt-3">SignUp/SignIn</Link>
          <Link to="/register" className="flex border border-gray-300 rounded-full p-2 justify-end mr-10 mt-3">SELL WITH US</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;