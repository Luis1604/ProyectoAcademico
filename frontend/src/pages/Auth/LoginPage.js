import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/Auth.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleLogin, usuario } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !contrasena.trim()) {
      setError("Por favor, ingresa tu correo y contraseña");
      return;
    }

    try {
      await handleLogin({ email: email.trim(), contrasena: contrasena.trim() });
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  useEffect(() => {
    if (usuario) {
      if (usuario.rol === "admin") navigate("/admin/dashboard");
      else if (usuario.rol === "profesor") navigate("/profesor/dashboard");
      else if (usuario.rol === "estudiante") navigate("/estudiante/dashboard");
    }
  }, [usuario, navigate]);

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      <p>
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
      </p>
    </div>
  );
};

export default LoginPage;
