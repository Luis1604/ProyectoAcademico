import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import useAuth from "../hooks/useAuth";

// Páginas
import HomePage from "../pages/Shared/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import GestionUsuarios from "../pages/Admin/GestionUsuarios";
import GestionCursos from "../pages/Admin/GestionCursos";
import DashboardProfesor from "../pages/Profesor/DashboardProfesor";
import AsistenciasProfesor from "../pages/Profesor/AsistenciasProfesor";
import ReportesProfesor from "../pages/Profesor/ReportesProfesor";
import DashboardEstudiante from "../pages/Estudiante/DashboardEstudiante";
import MisAsistencias from "../pages/Estudiante/MisAsistencias";
import MisCalificaciones from "../pages/Estudiante/MisCalificaciones";
import NotFound from "../pages/Shared/NotFound";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Página de inicio */}
        <Route path="/" element={<HomePage />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Rutas protegidas por rol */}
        <Route element={<PrivateRoute role="admin" user={user} />}>
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/usuarios" element={<GestionUsuarios />} />
          <Route path="/admin/cursos" element={<GestionCursos />} />
        </Route>

        <Route element={<PrivateRoute role="profesor" user={user} />}>
          <Route path="/profesor/dashboard" element={<DashboardProfesor />} />
          <Route path="/profesor/asistencias" element={<AsistenciasProfesor />} />
          <Route path="/profesor/reportes" element={<ReportesProfesor />} />
        </Route>

        <Route element={<PrivateRoute role="estudiante" user={user} />}>
          <Route path="/estudiante/dashboard" element={<DashboardEstudiante />} />
          <Route path="/estudiante/asistencias" element={<MisAsistencias />} />
          <Route path="/estudiante/calificaciones" element={<MisCalificaciones />} />
        </Route>

        {/* Ruta por defecto (debe estar al final) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
