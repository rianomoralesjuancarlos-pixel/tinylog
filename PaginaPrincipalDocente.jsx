import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  FileText,
  BarChart3,
  LogOut,
} from "lucide-react";

const modulos = [
  {
    to: "/calendario-docente",
    icon: Calendar,
    title: "Calendario",
    description: "Consulta eventos, clases y actividades escolares.",
    color: "icon-blue",
  },
  {
    to: "/control-asistencia-docente",
    icon: CheckCircle2,
    title: "Control de asistencia",
    description: "Registra la asistencia de tus estudiantes.",
    color: "icon-green",
  },
  {
    to: "/justificaciones-docente",
    icon: FileText,
    title: "Justificaciones",
    description: "Revisa y gestiona las novedades de asistencia.",
    color: "icon-purple",
  },
  {
    to: "/reportes-docente",
    icon: BarChart3,
    title: "Reportes",
    description: "Consulta el resumen de asistencia de tus cursos.",
    color: "icon-blue",
  },
];

export default function PaginaPrincipalDocente() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="background-blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <header>
        <div className="container-nav">
          <div className="logo">
            <GraduationCap size={28} />
            <span>Liceo Infantil Nany</span>
          </div>
          <div className="nav-actions">
            <span className="btn-perfil">Docente</span>
            <button className="btn-nav-logout" onClick={() => setShowLogoutModal(true)}>
              <LogOut size={16} /> Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="docente-home">
        <section className="brand-showcase">
          <div className="brand-showcase-card">
            <div className="brand-showcase-copy">
              <h3>Herramientas de trabajo para una gestión más eficaz</h3>
              <p>
                Organiza tu jornada, controla la asistencia y comparte reportes con la institución desde un entorno
                pensado para apoyar el trabajo docente y la comunicación escolar.
              </p>
            </div>
            <div className="brand-points">
              <div className="brand-point">✔ Reportes al día</div>
              <div className="brand-point">✔ Asistencia centralizada</div>
              <div className="brand-point">✔ Comunicación institucional</div>
            </div>
          </div>
        </section>

        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badges">
              <span>Panel docente</span>
              <span>Gestión académica</span>
            </div>
            <h2>Panel del docente</h2>
            <p>Organiza tus clases, controla la asistencia, revisa justificaciones y acompaña el progreso de tus estudiantes desde un solo lugar.</p>

            <div className="hero-metrics">
              <div className="metric-card">
                <strong>8</strong>
                <span>Clases</span>
              </div>
              <div className="metric-card">
                <strong>12</strong>
                <span>Estudiantes</span>
              </div>
              <div className="metric-card">
                <strong>Hoy</strong>
                <span>Reporte listo</span>
              </div>
            </div>
          </div>
        </section>

        <section className="insight-section">
          <div className="section-header">
            <h2>Resumen del día</h2>
            <p>Mantén un control claro de las actividades y novedades del aula.</p>
          </div>

          <div className="insight-grid">
            <article className="insight-card insight-primary">
              <span className="insight-label">Asistencia</span>
              <strong>92%</strong>
              <p>Buen registro de estudiantes hoy frente a la jornada.</p>
            </article>
            <article className="insight-card">
              <span className="insight-label">Tareas pendientes</span>
              <strong>04</strong>
              <p>Seguimiento para actividades y entregas del grupo.</p>
            </article>
            <article className="insight-card">
              <span className="insight-label">Comunicaciones</span>
              <strong>06</strong>
              <p>Mensajes y recordatorios para padres y coordinación.</p>
            </article>
          </div>
        </section>

        <section className="features-section" aria-labelledby="modulos-docente">
          <div className="section-header">
            <h2 id="modulos-docente">Mis herramientas</h2>
            <p>Selecciona una opción para comenzar.</p>
          </div>
          <div className="grid-container">
            {modulos.map(({ to, icon: Icon, title, description, color }) => (
              <Link to={to} className="card-link" key={to}>
                <article className="feature-card">
                  <div className={`icon-box ${color}`}><Icon size={28} /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer id="contacto" className="footer-docente">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <GraduationCap size={24} />
              <span>Liceo Infantil Nany</span>
            </div>
            <p>Plataforma institucional para gestionar la vida escolar con mayor organización y acompañamiento.</p>
          </div>

          <div className="footer-info">
            <h4>Contacto</h4>
            <p><Mail size={16} /> docentes@liceonany.edu.co</p>
            <p>📞 +57 311 765 4321</p>
            <p>📍 Sede principal - Bogotá</p>
          </div>

          <div className="footer-info">
            <h4>Soporte docente</h4>
            <p>Horario: 7:00 a. m. - 5:00 p. m.</p>
            <p>Coordinación académica</p>
            <p>Seguimiento de asistencia y reportes</p>
          </div>
        </div>
      </footer>

      {showLogoutModal && (
        <div className="modal" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <h3>¿Cerrar sesión?</h3>
            <p>¿Estás seguro de que deseas cerrar tu sesión?</p>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
              <button className="btn-confirm" onClick={cerrarSesion}>Sí, cerrar sesión</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
