import React, { createContext, useState } from "react";
import { login } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = async (email, contrasena) => {
        try {
            const data = await login(email, contrasena);
            setUser(data.usuario);
            localStorage.setItem("token", data.token);
        } catch (error) {
            console.error("Error en autenticación:", error);
            throw error;
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
