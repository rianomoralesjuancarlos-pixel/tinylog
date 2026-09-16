import React, { useState } from 'react';
import { ArrowLeft, Search, Calendar, FileText, CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Justificaciones() {
  const navigate = useNavigate();
  const usuario = (localStorage.getItem('usuario') || '').toLowerCase().trim();
  const puedeEditarMotivo = usuario === 'acudiente';
  const puedeCambiarEstado = ['administrador', 'directivo', 'docente', 'profesor'].includes(usuario);
  const [curso, setCurso] = useState('');
  const [fecha, setFecha] = useState('2026-06-16');

  const [justificaciones, setJustificaciones] = useState([
    { id: 1, nombre: 'Juan', fecha: '2026-06-16', motivo: '', estado: 'pendiente' },
    { id: 2, nombre: 'Sebastián', fecha: '2026-06-16', motivo: '', estado: 'pendiente' }
  ]);

  const handleConsultar = () => {
    if (!curso) {
      alert('Por favor seleccione un curso antes de consultar.');
      return;
    }
    setJustificaciones((prev) => prev.map((item) => ({ ...item, fecha })));
  };

  const handleMotivoChange = (id, nuevoMotivo) => {
    setJustificaciones((prev) => prev.map((item) => (item.id === id ? { ...item, motivo: nuevoMotivo } : item)));
  };

  const handleEstadoChange = (id, nuevoEstado) => {
    setJustificaciones((prev) => prev.map((item) => (item.id === id ? { ...item, estado: nuevoEstado } : item)));
  };

  return (
    <div className="justificacion-page">
      <div className="background-blobs justificacion-blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <main className="justificacion-main">
        <div className="back-home-wrapper">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate(localStorage.getItem('usuario') === 'docente' ? '/pagina-docente' : '/pagina-principal');
            }}
            className="btn-control back-home-button"
          >
            <ArrowLeft size={18} />
            Volver al Inicio
          </button>
        </div>

        <header className="justificacion-card-header">
          <div className="justificacion-title-row">
            <FileText size={28} className="title-icon" />
            <div>
              <h1 className="justificacion-title">Justificaciones de Ausencias</h1>
              <p className="justificacion-subtitle">Gestiona y aprueba las ausencias de los estudiantes por curso y fecha.</p>
            </div>
          </div>
        </header>

        <section className="calendar-card justificacion-panel">
          <div className="justificacion-toolbar">
            <div className="justificacion-field">
              <label htmlFor="curso">Curso</label>
              <select id="curso" value={curso} onChange={(e) => setCurso(e.target.value)}>
                <option value="" disabled>Escoja el curso</option>
                <option value="101">101</option>
                <option value="102">102</option>
                <option value="103">103</option>
                <option value="104">104</option>
              </select>
            </div>

            <div className="justificacion-field">
              <label htmlFor="fecha">Fecha</label>
              <div className="justificacion-date-wrap">
                <Calendar size={16} className="justificacion-date-icon" />
                <input type="date" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
              </div>
            </div>

            <button type="button" onClick={handleConsultar} className="justificacion-filter-btn">
              <Search size={18} /> Consultar
            </button>
          </div>
        </section>

        <section className="calendar-card justificacion-table-card">
          <div className="justificacion-table-wrap">
            <table className="justificacion-table">
              <thead>
                <tr>
                  <th>Nombre del Niño</th>
                  <th>Fecha de Ausencia</th>
                  <th>Motivo de Justificación</th>
                  <th>Estado de Revisión</th>
                </tr>
              </thead>
              <tbody>
                {justificaciones.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input type="text" value={item.nombre} readOnly className="justificacion-name-input" />
                    </td>
                    <td className="justificacion-date-cell">{item.fecha}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Ej. Cita médica"
                        value={item.motivo}
                        readOnly={!puedeEditarMotivo}
                        onChange={(e) => {
                          if (puedeEditarMotivo) {
                            handleMotivoChange(item.id, e.target.value);
                          }
                        }}
                        className={`justificacion-motivo-input ${puedeEditarMotivo ? '' : 'read-only'}`}
                      />
                    </td>
                    <td>
                      <select
                        value={item.estado}
                        disabled={!puedeCambiarEstado}
                        onChange={(e) => handleEstadoChange(item.id, e.target.value)}
                        className={`justificacion-status-select ${item.estado}`}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobado">Aprobado</option>
                        <option value="rechazado">Rechazado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="justificacion-inline-note">
          <CheckCheck size={18} />
          {puedeEditarMotivo ? 'Puedes registrar el motivo de la justificación.' : 'El motivo solo puede ser editado por el acudiente; la revisión del estado la realiza la institución.'}
        </div>
      </main>
    </div>
  );
}