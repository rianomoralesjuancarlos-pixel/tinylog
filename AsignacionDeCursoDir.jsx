import { useState } from "react";
import { ArrowLeft, BookOpen, CheckCircle2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cursosDisponibles, obtenerAsignacionesDocentes, obtenerDocentesDisponibles } from "../data/datosEscolares.js";
import "../index.css";

export default function AsignacionDeCursoDir() {
  const navigate = useNavigate();
  const [docentes, setDocentes] = useState(obtenerDocentesDisponibles);
  const [asignaciones, setAsignaciones] = useState(obtenerAsignacionesDocentes);
  const [mensaje, setMensaje] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [docenteEditando, setDocenteEditando] = useState(null);
  const [docentePorEliminar, setDocentePorEliminar] = useState(null);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [nuevoDocente, setNuevoDocente] = useState({ nombre: "", usuario: "", password: "", curso: cursosDisponibles[0] });

  const agregarDocente = () => {
    const nombre = nuevoDocente.nombre.trim();
    const usuario = nuevoDocente.usuario.trim().toLowerCase();
    if (!nombre || !usuario || !nuevoDocente.password || docentes.some((docente) => docente.usuario === usuario)) {
      setMensaje("Completa todos los campos y usa un usuario que no exista.");
      return;
    }

    setDocentes((previos) => [...previos, { nombre, usuario, password: nuevoDocente.password, cursoInicial: nuevoDocente.curso }]);
    setAsignaciones((previas) => ({ ...previas, [usuario]: nuevoDocente.curso }));
    setNuevoDocente({ nombre: "", usuario: "", password: "", curso: cursosDisponibles[0] });
    setMostrarFormulario(false);
    setMensaje("Profesor agregado. Pulsa Guardar cambios para confirmar.");
  };

  const guardarCambios = () => {
    localStorage.setItem("docentesDisponibles", JSON.stringify(docentes));
    localStorage.setItem("asignacionesDocentes", JSON.stringify(asignaciones));
    setMensaje("Cambios guardados correctamente.");
  };

  const cambiarAsignacion = (usuario, curso) => {
    setAsignaciones((previas) => ({ ...previas, [usuario]: curso }));
  };

  const eliminarDocente = (docente) => {
    setDocentes((previos) => previos.filter((actual) => actual.usuario !== docente.usuario));
    setAsignaciones((previas) => {
      const siguientes = { ...previas };
      delete siguientes[docente.usuario];
      return siguientes;
    });
    setDocenteEditando(null);
    setDocentePorEliminar(null);
    setMostrarExito(true);
  };

  return (
    <div className="dashboard-container acu-page asignacion-page">
      <div className="background-blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <main className="calendar-main acu-main">
        <div className="back-home-wrapper">
          <button type="button" onClick={() => navigate("/pagina-principal")} className="btn-control back-home-button">
            <ArrowLeft size={18} />
            Volver al inicio
          </button>
        </div>

        <header className="calendar-header-section acu-header">
          <div className="calendar-title-wrapper">
            <h1><BookOpen className="title-icon" /> Asignación de cursos</h1>
            <p>Asigna a cada docente el curso que podrá gestionar.</p>
          </div>
        </header>

        <section className="calendar-card">
          <div className="section-header">
            <h2><Users size={24} /> Docentes y cursos</h2>
            <p>Agrega docentes y confirma las asignaciones cuando estés listo.</p>
          </div>

          {mensaje && <div className="family-message"><CheckCircle2 size={17} /> {mensaje}</div>}

          <div className="asignacion-actions">
            <button type="button" className="btn-primary-modern btn-small" onClick={() => setMostrarFormulario((visible) => !visible)}>
              <Users size={17} /> {mostrarFormulario ? "Cerrar formulario" : "Agregar nuevo profesor"}
            </button>
            <button type="button" className="btn-primary-modern btn-small asignacion-save-button" onClick={guardarCambios}>
              <CheckCircle2 size={17} /> Guardar cambios
            </button>
          </div>

          {mostrarFormulario && (
            <div className="asignacion-form">
              <label>Nombre del docente<input value={nuevoDocente.nombre} onChange={(event) => setNuevoDocente({ ...nuevoDocente, nombre: event.target.value })} placeholder="Ej. Diana López" /></label>
              <label>Usuario<input value={nuevoDocente.usuario} onChange={(event) => setNuevoDocente({ ...nuevoDocente, usuario: event.target.value })} placeholder="Ej. docente106" /></label>
              <label>Contraseña<input type="password" value={nuevoDocente.password} onChange={(event) => setNuevoDocente({ ...nuevoDocente, password: event.target.value })} placeholder="Contraseña temporal" /></label>
              <label>Curso asignado<select value={nuevoDocente.curso} onChange={(event) => setNuevoDocente({ ...nuevoDocente, curso: event.target.value })}>{cursosDisponibles.map((curso) => <option key={curso} value={curso}>{curso}</option>)}</select></label>
              <button type="button" className="btn-primary-modern btn-small asignacion-add-button" onClick={agregarDocente}>Agregar profesor</button>
            </div>
          )}

          <div className="table-container table-scroll">
            <table>
              <thead>
                <tr><th>Docente</th><th>Curso asignado</th><th>Acción</th></tr>
              </thead>
              <tbody>
                {docentes.map((docente) => (
                  <tr key={docente.usuario}>
                    <td><strong>{docente.nombre}</strong></td>
                    <td>
                      {docenteEditando === docente.usuario ? (
                        <select
                          value={asignaciones[docente.usuario] || docente.cursoInicial}
                          onChange={(event) => cambiarAsignacion(docente.usuario, event.target.value)}
                          aria-label={`Modificar curso de ${docente.nombre}`}
                        >
                          {cursosDisponibles.map((curso) => <option key={curso} value={curso}>{curso}</option>)}
                        </select>
                      ) : (
                        <strong>{asignaciones[docente.usuario] || docente.cursoInicial}</strong>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-primary-modern btn-small asignacion-edit-button"
                        onClick={() => setDocenteEditando((actual) => actual === docente.usuario ? null : docente.usuario)}
                      >
                        {docenteEditando === docente.usuario ? "Listo" : "Modificar curso"}
                      </button>
                      <button
                        type="button"
                        className="btn-primary-modern btn-small asignacion-delete-button"
                        onClick={() => setDocentePorEliminar(docente)}
                      >
                        Eliminar docente
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {docentePorEliminar && (
          <div className="modal-overlay" role="presentation">
            <div className="modal-card asignacion-modal" role="dialog" aria-modal="true" aria-labelledby="confirmar-eliminacion">
              <div className="modal-header">
                <h3 id="confirmar-eliminacion">¿Eliminar docente?</h3>
              </div>
              <p>¿Deseas eliminar a <strong>{docentePorEliminar.nombre}</strong>?</p>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setDocentePorEliminar(null)}>Cancelar</button>
                <button type="button" className="btn-confirm-danger" onClick={() => eliminarDocente(docentePorEliminar)}>Sí, eliminar</button>
              </div>
            </div>
          </div>
        )}

        {mostrarExito && (
          <div className="modal-overlay" role="presentation">
            <div className="modal-card asignacion-modal" role="dialog" aria-modal="true" aria-labelledby="eliminacion-exitosa">
              <div className="modal-header">
                <h3 id="eliminacion-exitosa">Docente eliminado</h3>
              </div>
              <p>El docente se eliminó correctamente de la lista.</p>
              <div className="modal-footer">
                <button type="button" className="btn-confirm" onClick={() => setMostrarExito(false)}>Aceptar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}