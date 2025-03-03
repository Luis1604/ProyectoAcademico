import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/Auth.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleLogin, usuario } = useAuth();

  // Definir navigateBasedOnRole usando useCallback
  const navigateBasedOnRole = useCallback((rol) => {
    switch (rol) {
      case "administrador":
        navigate("/admin/dashboard");
        break;
      case "profesor":
        navigate("/profesor/dashboard");
        break;
      case "estudiante":
        navigate("/estudiante/dashboard");
        break;
      default:
        navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !contrasena.trim()) {
      setError("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    try {
      await handleLogin({ email: email.trim(), contrasena: contrasena.trim() });
    } catch (err) {
      setError(err.message || "Credenciales incorrectas.");
    }
  };

  useEffect(() => {
    if (usuario && usuario.rol) {
      navigateBasedOnRole(usuario.rol);
    }
  }, [usuario, navigateBasedOnRole]); // Se asegura que `navigateBasedOnRole` esté en las dependencias

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginPage;
