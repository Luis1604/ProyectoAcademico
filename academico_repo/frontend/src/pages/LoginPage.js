import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2 p-2 w-full border rounded"/>
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-2 p-2 w-full border rounded"/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginPage;
