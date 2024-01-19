"use client"
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  function getCSRFToken() {
    const csrfCookie = document.cookie.split('; ')
      .find(row => row.startsWith('csrftoken='));
    
    if (csrfCookie) {
      return csrfCookie.split('=')[1];
    }
  
    return null;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const csrfToken = getCSRFToken();
  
    if (!csrfToken) {
      console.error('CSRF token not found.');
      return;
    }
  
    const headers = {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    };
  
    try {
      const response = await axios.post(`${backendUrl}/api/users/login/`, {
        ...formData,
      }, { headers });
  
      // Check if the login was successful
      if (response.data.success) {
        console.log('Login successful!');
        // Handle successful login, for example, redirect to a different page
      } else {
        console.log('Invalid user ID or password');
      }
    } catch (error) {
      console.error(error); // Handle errors
    }
  };
  

  return (
      <div className="m-lg-5 p-lg-5">
          <form className={`mb-100`} onSubmit={handleSubmit}>
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
        Login
      </button>
</form>
      </div>

  );
}

export default Login;
