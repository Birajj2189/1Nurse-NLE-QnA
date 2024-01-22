// authContext.js
"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedAuthData = localStorage.getItem('authData');
            return storedAuthData ? JSON.parse(storedAuthData) : { isLoggedIn: false, userId: null, userName: null };
        }
        return { isLoggedIn: false, userId: null, userName: null };
    });

    const login = (userId, userName) => {
        console.log(userId,userName)
        setAuthData({
            isLoggedIn: true,
            userId,
            userName,
        });
    };

    const logout = () => {
        setAuthData({
            isLoggedIn: false,
            userId: null,
            userName: null,
        });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('authData', JSON.stringify(authData));
        }
    }, [authData]);

    return (
        <AuthContext.Provider value={{ ...authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
