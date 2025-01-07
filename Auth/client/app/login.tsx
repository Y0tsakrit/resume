"use client";

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import React from 'react';

const Login = () =>{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3001/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            })
            if(response.ok){
                const data = await response.json();
                localStorage.setItem("authToken", data.token);
                alert("User logged in successfully");
                navigate('/');
            }else {
                alert("Invalid email or password");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    }
      return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <div className="flex flex-col items-center gap-10 border border-gray-300 rounded-md p-10">
            <h1>Login</h1>
            <form className="flex flex-col gap-4 mt-4 pd-10" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="p-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                className="p-2 border border-gray-300 rounded-md"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-md"
              >
                Login
              </button>
              <Link to="/register" className='text-blue-500 flex justify-center mt-4 underline'>Register</Link>
            </form>
          </div>
        </div>
      );    
}

export default Login;
