// auth.js

import jwt from 'jsonwebtoken';
import { parse, serialize } from 'cookie';
import axios from "axios";

export const login = async (credentials) => {
    // Make API request to your authentication endpoint
    const response = await axios.post('/api/login', credentials);

    // Store the JWT token in cookies
    setTokenCookie(response.data.token);
};

export const logout = () => {
    // Remove the JWT token cookie
    removeTokenCookie();
};

export const getToken = (req) => {
    // Retrieve the JWT token from cookies (on the server) or localStorage (on the client)
    const token = process.browser ? localStorage.getItem('token') : parse(req.headers.cookie || '')['token'];
    return token;
};

export const isAuthenticated = (req) => {
    // Check if the user is authenticated based on the presence of the JWT token
    const token = getToken(req);
    return !!token;
};

export const decodeToken = (req) => {
    // Decode and return the information from the JWT token
    const token = getToken(req);
    return token ? jwt.decode(token) : null;
};

// Helper functions to set and remove the token cookie
const setTokenCookie = (token) => {
    // Set the token cookie with a 7-day expiration
    document.cookie = serialize('token', token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
        path: '/',
        httpOnly: true,
    });

    // Optionally, store the token in localStorage for client-side access
    localStorage.setItem('token', token);
};

const removeTokenCookie = () => {
    // Remove the token cookie
    document.cookie = serialize('token', '', {
        maxAge: -1,
        path: '/',
    });

    // Optionally, remove the token from localStorage
    localStorage.removeItem('token');
};
