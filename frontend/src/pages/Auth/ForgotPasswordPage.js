import { useState } from "react";
import "../../styles/Auth.css"; // Importamos los estilos

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("Si el correo está registrado, recibirás instrucciones para restablecer la contraseña.");
  };

  return (
    <div className="auth-container">
      <h2>Recuperar Contraseña</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      <p>
        <a href="/login">Volver al inicio de sesión</a>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
