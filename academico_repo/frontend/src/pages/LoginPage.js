import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
    const { handleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin(email, contrasena);
            alert("Inicio de sesión exitoso");
        } catch (err) {
            setError("Credenciales incorrectas");
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default LoginPage;
