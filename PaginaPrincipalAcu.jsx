import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Mail 
} from "lucide-react";

export default function PaginaPrincipal() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAcudiente, setIsAcudiente] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario === "administrador") {
      setIsAdmin(true);
    }
    if (usuario === "acudiente") {
      setIsAcudiente(true);
    }
  }, []);

  const handleLogoutConfirm = () => {
    localStorage.removeItem("usuario");
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <header>
        <div className="container-nav">
          <div className="logo">
            <GraduationCap size={28} />
            <span>Liceo Infantil Nany</span>
          </div>

          <nav>
            <a href="#" className="active">Inicio</a>
            <a href="#caracteristicas">Características</a>
            <a href="#datos">Datos</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <div className="nav-actions">
            {isAcudiente && (
              <button className="btn-perfil">
                👔 Acudiente
              </button>
            )}
            <button 
              className="btn-nav-logout"
              onClick={() => setShowLogoutModal(true)}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="brand-showcase">
          <div className="brand-showcase-card">
            <div className="brand-showcase-copy">
              <h3>Un espacio pensado para acompañar a tu familia</h3>
              <p>
                Consulta información escolar, revisa la asistencia de tu hijo, recibe recordatorios del calendario y
                mantiene una comunicación directa con la institución de forma segura y ordenada.
              </p>
            </div>
            <div className="brand-points">
              <div className="brand-point">✔ Seguimiento familiar</div>
              <div className="brand-point">✔ Justificaciones rápidas</div>
              <div className="brand-point">✔ Calendario claro y actualizado</div>
            </div>
          </div>
        </section>
        
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badges">
              <span>Portal familiar</span>
              <span>Información segura</span>
            </div>
            <h2>Tu información escolar al día</h2>
            <p>
              Consulta la asistencia, revisa los eventos del jardín, presenta justificaciones 
              y recibe información importante de forma clara y oportuna.
            </p>

            <div className="hero-metrics">
              <div className="metric-card">
                <strong>1</strong>
                <span>Familia</span>
              </div>
              <div className="metric-card">
                <strong>3</strong>
                <span>Hijos</span>
              </div>
              <div className="metric-card">
                <strong>Hoy</strong>
                <span>Actualizado</span>
              </div>
            </div>
          </div>
        </section>

        <section className="insight-section">
          <div className="section-header">
            <h2>Resumen familiar</h2>
            <p>Todo lo importante para seguir el proceso escolar de tu hijo.</p>
          </div>

          <div className="insight-grid">
            <article className="insight-card insight-primary">
              <span className="insight-label">Próximo evento</span>
              <strong>Reunión de padres</strong>
              <p>Se realizará el próximo martes en la sede principal.</p>
            </article>
            <article className="insight-card">
              <span className="insight-label">Asistencia</span>
              <strong>Excelente</strong>
              <p>No hay novedades importantes en la última semana.</p>
            </article>
            <article className="insight-card">
              <span className="insight-label">Mensajes</span>
              <strong>02</strong>
              <p>Recordatorios y comunicaciones recientes del jardín.</p>
            </article>
          </div>
        </section>

        {/* Características */}
        <section id="caracteristicas" className="features-section">
          <div className="section-header">
            <h2>Características</h2>
            <p>Todo lo que necesitas para optimizar la gestión escolar.</p>
          </div>

          <div className="grid-container">
            <Link to="/calendario-acudiente" className="card-link">
              <article className="feature-card">
                <div className="icon-box icon-blue">
                  <Calendar size={28} />
                </div>
                <h3>Calendario Inteligente</h3>
                <p>Organiza eventos, exámenes y actividades escolares.</p>
              </article>
            </Link>

            <Link to="/control-asistencia-acudiente" className="card-link">
              <article className="feature-card">
                <div className="icon-box icon-green">
                  <CheckCircle2 size={28} />
                </div>
                <h3>Control de Asistencia</h3>
                <p>Registra y controla diariamente la asistencia de los estudiantes.</p>
              </article>
            </Link>

            <Link to="/justificaciones-acudiente" className="card-link">
              <article className="feature-card">
                <div className="icon-box icon-purple">
                  <FileText size={28} />
                </div>
                <h3>Justificaciones</h3>
                <p>Sistema digital para recibir y aprobar ausencias.</p>
              </article>
            </Link>
          </div>
        </section>

        {/* Datos */}
        <section id="datos" className="data-section">
          <div className="section-header">
            <h2>Datos</h2>
            <p>Accede a la información y reportes detallados del proceso escolar.</p>
          </div>

          <div className="grid-container">
            <Link to="/registro-datos-acudiente" className="card-link">
              <article className="feature-card">
                <div className="icon-box icon-blue">
                  <TrendingUp size={28} />
                </div>
                <h3>Registro de Datos</h3>
                <p>Consulta la información del estudiante y la familia.</p>
              </article>
            </Link>

            <Link to="/reportes-acudiente" className="card-link">
              <article className="feature-card">
                <div className="icon-box icon-green">
                  <FileText size={28} />
                </div>
                <h3>Reportes</h3>
                <p>Genera reportes detallados de asistencia y datos.</p>
              </article>
            </Link>
          </div>
        </section>
      </main>

      <footer id="contacto">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <GraduationCap size={24} />
              <span>Liceo Infantil Nany</span>
            </div>
            <p>Comunicación y acompañamiento escolar para fortalecer la experiencia educativa de cada familia.</p>
          </div>

          <div className="footer-info">
            <h4>Contacto institucional</h4>
            <p><Mail size={16} /> contacto@liceonany.edu.co</p>
            <p>📞 +57 310 987 6543</p>
            <p>📍 Cra 12 # 45-67, Bogotá</p>
          </div>

          <div className="footer-info">
            <h4>Atención a familias</h4>
            <p>Lunes a viernes: 7:30 a. m. - 4:30 p. m.</p>
            <p>WhatsApp: +57 300 123 4567</p>
            <p>Soporte académico y administrativo</p>
          </div>
        </div>
      </footer>

      {showLogoutModal && (
        <div className="modal" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>¿Cerrar sesión?</h3>
            <p>¿Estás seguro de que deseas cerrar tu sesión?</p>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setShowLogoutModal(false)}>
                Cancelar
              </button>
              <button className="btn-confirm" onClick={handleLogoutConfirm}>
                Sí, cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}