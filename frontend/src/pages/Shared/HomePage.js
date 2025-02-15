import { Link } from "react-router-dom";
import "../../styles/Home.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <h1>Académico</h1>
          <nav>
            <Link to="/login" className="nav-link">Iniciar Sesión</Link>
          </nav>
        </div>
      </header>

      <main className="home-main">
        <div className="hero-section">
          <h2>Bienvenido a Académico</h2>
          <p>Optimiza la gestión educativa con nuestra plataforma eficiente.</p>
          <Link to="/login" className="btn-primary">Comenzar Ahora</Link>
        </div>

        <section className="features">
          <div className="feature-card">
            <h3>📚 Gestión de Cursos</h3>
            <p>Organiza y administra tus cursos de manera fácil y rápida.</p>
          </div>
          <div className="feature-card">
            <h3>✅ Control de Asistencias</h3>
            <p>Registra y visualiza la asistencia de tus estudiantes.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Reportes Personalizados</h3>
            <p>Descarga reportes detallados en formatos PDF y Excel.</p>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Académico. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
