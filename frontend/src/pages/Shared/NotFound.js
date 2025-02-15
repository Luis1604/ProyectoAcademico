import { Link } from "react-router-dom";
import "../../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Página No Encontrada</h2>
      <p className="notfound-text">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link to="/" className="notfound-btn">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
