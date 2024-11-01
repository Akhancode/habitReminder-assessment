// TokenContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { login } from "../api/authApi";

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        axios.interceptors.request.use(
            (config) => {
                // You can add additional headers if needed
                return config;
            },
            (error) => Promise.reject(error)
        );
    }, []);


    const loginUser = async (userData) => {
        const response = await login(userData);
        setUser(response.user); // Assuming your API response includes user data
    };

    const registerUser = async (userData) => {
        const response = await register(userData);
        setUser(response.user); // Assuming your API response includes user data
    };

    const logoutUser = async () => {
        await logout();
        setUser(null);
    };

    return (
        <TokenContext.Provider value={{ user,setUser, loginUser, registerUser, logoutUser }}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenProvider;
