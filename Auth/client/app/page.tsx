"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        alert("User registered successfully");
      } else {
        alert("Error registering user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering user");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center gap-10 border border-gray-300 rounded-md p-10">
        <h1>register</h1>
        <form className="flex flex-col gap-4 mt-4 pd-10" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="p-2 border border-gray-300 rounded-md"
            value={formData.username}
            onChange={handleChange}
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            className="p-2 border border-gray-300 rounded-md"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            register
          </button>
        </form>
      </div>
    </div>
  );
}
