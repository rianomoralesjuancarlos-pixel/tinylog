import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, Search, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../index.css';


const styles = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    color: '#1e293b',
    position: 'relative',
    overflowX: 'hidden',
  },
  backgroundBlobs: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
    pointerEvents: 'none',
  },
  blob: {
    position: 'absolute',
    filter: 'blur(80px)',
    opacity: 0.15,
    borderRadius: '50%',
  },
  blob1: { top: '-10%', left: '-10%', width: '400px', height: '400px', backgroundColor: '#6366f1' },
  blob2: { bottom: '10%', right: '-5%', width: '450px', height: '450px', backgroundColor: '#38bdf8' },
  blob3: { top: '40%', left: '30%', width: '350px', height: '350px', backgroundColor: '#a855f7' },
  
  header: {
    position: 'relative',
    zIndex: 10,
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #e2e8f0',
    padding: '1rem 2rem',
  },
  containerNav: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '600',
    fontSize: '1.1rem',
    color: '#0f172a',
  },
  navLink: {
    textDecoration: 'none',
    color: '#4f46e5',
    fontWeight: '500',
    fontSize: '0.95rem',
  },
  main: {
    position: 'relative',
    zIndex: 10,
    padding: '40px 20px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  cardHeader: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '0.95rem',
  },
  infoAsistencia: {
    background: '#ffffff',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    marginBottom: '24px',
    border: '1px solid #e2e8f0',
  },
  filtrosWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  campoGrupo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: '1',
    minWidth: '200px',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#475569',
  },
  select: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.95rem',
    outline: 'none',
    backgroundColor: '#fff',
    color: '#1e293b',
  },
  inputIconWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputDate: {
    width: '100%',
    padding: '10px 14px 10px 38px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.95rem',
    outline: 'none',
    backgroundColor: '#fff',
    color: '#1e293b',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
  },
  btnFiltrar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    padding: '11px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
  },
  tableContainer: {
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  tableHeaderRow: {
    backgroundColor: '#f1f5f9',
    borderBottom: '1px solid #e2e8f0',
  },
  th: {
    padding: '16px',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  tableRow: {
    borderBottom: '1px solid #f1f5f9',
  },
  td: {
    padding: '16px',
    verticalAlign: 'middle',
  },
  tdFecha: {
    padding: '16px',
    color: '#64748b',
    fontSize: '0.95rem',
  },
  nombreInput: {
    border: 'none',
    background: 'transparent',
    width: '100%',
    fontFamily: 'inherit',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#0f172a',
    outline: 'none',
  },
  motivoInput: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: '#fff',
  },
  selectEstado: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: 'none',
    fontWeight: '600',
    fontSize: '0.85rem',
    outline: 'none',
    cursor: 'pointer',
  }
};

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
      alert("Por favor seleccione un curso antes de consultar.");
      return;
    }
    setJustificaciones(prev => prev.map(item => ({ ...item, fecha: fecha })));
  };

  const handleMotivoChange = (id, nuevoMotivo) => {
    setJustificaciones(prev => prev.map(item => 
      item.id === id ? { ...item, motivo: nuevoMotivo } : item
    ));
  };

  const handleEstadoChange = (id, nuevoEstado) => {
    setJustificaciones(prev => prev.map(item => 
      item.id === id ? { ...item, estado: nuevoEstado } : item
    ));
  };

  return (
    <div className="docente-module-page justificacion-docente-page" style={styles.page}>
      <div style={styles.backgroundBlobs}>
        <div style={{...styles.blob, ...styles.blob1}}></div>
        <div style={{...styles.blob, ...styles.blob2}}></div>
        <div style={{...styles.blob, ...styles.blob3}}></div>
      </div>

      <main className="justificacion-content" style={styles.main}>
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

        <div style={styles.cardHeader}>
          <h1 style={styles.title}>Justificaciones de Ausencias</h1>
          <p style={styles.subtitle}>Gestiona y aprueba las ausencias de los estudiantes por curso y fecha.</p>
        </div>
        
        <div className="justificacion-filters-card" style={styles.infoAsistencia}>
          <div className="justificacion-filters" style={styles.filtrosWrapper}>
            <div style={styles.campoGrupo}>
              <label htmlFor="curso" style={styles.label}>Curso:</label>
              <select 
                id="curso" 
                value={curso} 
                onChange={(e) => setCurso(e.target.value)}
                style={styles.select}
              >
                <option value="" disabled>Escoja el curso</option>
                <option value="101">101</option>
                <option value="102">102</option>
                <option value="103">103</option>
                <option value="104">104</option>
              </select> 
            </div>
            
            <div style={styles.campoGrupo}>
              <label htmlFor="fecha" style={styles.label}>Fecha:</label>
              <div style={styles.inputIconWrapper}>
                <Calendar size={18} color="#6b7280" style={styles.inputIcon} />
                <input 
                  type="date" 
                  id="fecha" 
                  value={fecha} 
                  onChange={(e) => setFecha(e.target.value)}
                  style={styles.inputDate} 
                />
              </div>
            </div>

            <button className="justificacion-filter-button" type="button" onClick={handleConsultar} style={styles.btnFiltrar}>
              <Search size={18} /> Consultar
            </button>
          </div>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Nombre del Niño</th>
                <th style={styles.th}>Fecha de Ausencia</th>
                <th style={styles.th}>Motivo de Justificación</th>
                <th style={styles.th}>Estado de Revisión</th>
              </tr>
            </thead>
            <tbody>
              {justificaciones.map((item) => (
                <tr key={item.id} style={styles.tableRow}>
                  <td style={styles.td}>
                    <input 
                      type="text" 
                      value={item.nombre} 
                      readOnly 
                      style={styles.nombreInput} 
                    />
                  </td>
                  <td style={styles.tdFecha}>{item.fecha}</td>
                  <td style={styles.td}>
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
                      style={{
                        ...styles.motivoInput,
                        opacity: puedeEditarMotivo ? 1 : 0.9,
                        cursor: puedeEditarMotivo ? 'text' : 'not-allowed',
                        backgroundColor: puedeEditarMotivo ? '#fff' : '#f8fafc'
                      }} 
                    />
                  </td>
                  <td style={styles.td}>
                    <select 
                      value={item.estado}
                      disabled={!puedeCambiarEstado}
                      onChange={(e) => handleEstadoChange(item.id, e.target.value)}
                      style={{
                        ...styles.selectEstado,
                        backgroundColor: 
                          item.estado === 'aprobado' ? '#dcfce7' : 
                          item.estado === 'rechazado' ? '#fee2e2' : '#fef3c7',
                        color: 
                          item.estado === 'aprobado' ? '#166534' : 
                          item.estado === 'rechazado' ? '#991b1b' : '#92400e',
                        cursor: puedeCambiarEstado ? 'pointer' : 'not-allowed',
                        opacity: puedeCambiarEstado ? 1 : 0.8
                      }}
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
      </main>
    </div>
  );
}