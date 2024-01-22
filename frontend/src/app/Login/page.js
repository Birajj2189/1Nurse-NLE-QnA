"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/components/authContext';
function Login() {
  const { login } = useAuth();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handle login")
    try {
      const response = await axios.post(`${backendUrl}/api/users/login/`, {
        ...formData,
      }, );
      // Extract access token from the response
      const accessToken = response.data.user_data.access_token;
      const refreshToken = response.data.user_data.refresh_token;
      const yourAccessTokenExpiry = response.data.user_data.access_token_expiry;
      const yourRefreshTokenExpiry = response.data.user_data.refresh_token_expiry;

      // Set cookies using document.cookie
      document.cookie = `access_token=${accessToken}; HttpOnly; Path=/api; Max-Age=${yourAccessTokenExpiry}`;
      document.cookie = `refresh_token=${refreshToken}; HttpOnly; Path=/api; Max-Age=${yourRefreshTokenExpiry}`;
      login(response.data.user_data.user_id,response.data.user_data.username);
      // Redirect to a protected route or perform other actions as needed
      window.location.replace('/');
    } catch (error) {
      console.error('Login failed', error);
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
