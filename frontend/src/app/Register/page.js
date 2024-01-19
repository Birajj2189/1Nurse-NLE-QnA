"use client"
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


function Register() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [formData, setFormData] = useState({
    user_id:'',
    username: '',
    email: '',
    password: '',
    user_type: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uniqueUserId = `u-${uuidv4()}`;
    console.log(formData)

    try {
      const response = await axios.post(`${backendUrl}/api/users/create/`, {
        ...formData,
        user_id: uniqueUserId
      });

   
      window.location.replace('/Login');
    } catch (error) {
        console.error(error); // Handle errors
    }
  };

  return (
      <div className="my-lg-5 p-lg-5">
        <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput2" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter your email id"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput3" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="input-group mb-3">
        <label htmlFor="dropdown">Select Usertype</label>
        <select
          id="user_type"
          name="user_type"
          value={formData.user_type}
          onChange={handleChange}
        >
          <option value="none">None</option>
          <option value="1">Admin</option>
          <option value="0">Normal</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
      </div>

  );
}

export default Register;
