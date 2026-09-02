import { useState, useEffect } from "react";

export default function ControlDeAsistencia() {
  // Datos de ejemplo de estudiantes
  const estudiantesIniciales = [
    { id: 1, nombre: "Ana López", curso: "3° A" },
    { id: 2, nombre: "Carlos Méndez", curso: "3° A" },
    { id: 3, nombre: "María González", curso: "3° B" },
    { id: 4, nombre: "Pedro Ramírez", curso: "3° A" },
    { id: 5, nombre: "Lucía Fernández", curso: "3° B" },
    { id: 6, nombre: "Diego Torres", curso: "3° A" },
    { id: 7, nombre: "Sofía Vargas", curso: "3° B" },
    { id: 8, nombre: "Mateo Díaz", curso: "3° A" },
  ];

  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [estudiantes, setEstudiantes] = useState(estudiantesIniciales);
  const [asistencias, setAsistencias] = useState({});
  const [filtro, setFiltro] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Cargar asistencias guardadas del día
  useEffect(() => {
    const guardadas = localStorage.getItem(`asistencia_${fecha}`);
    if (guardadas) {
      setAsistencias(JSON.parse(guardadas));
    } else {
      // Inicializar todos como "pendiente"
      const inicial = {};
      estudiantes.forEach((est) => {
        inicial[est.id] = "pendiente";
      });
      setAsistencias(inicial);
    }
  }, [fecha]);

  const marcarAsistencia = (id, estado) => {
    setAsistencias((prev) => ({
      ...prev,
      [id]: estado,
    }));
  };

  const guardarAsistencia = () => {
    localStorage.setItem(`asistencia_${fecha}`, JSON.stringify(asistencias));
    setMensaje("✓ Asistencia guardada correctamente");
    setTimeout(() => setMensaje(""), 3000);
  };

  const estudiantesFiltrados = estudiantes.filter((est) =>
    est.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    est.curso.toLowerCase().includes(filtro.toLowerCase())
  );

  // Resumen
  const total = estudiantes.length;
  const presentes = Object.values(asistencias).filter((e) => e === "presente").length;
  const ausentes = Object.values(asistencias).filter((e) => e === "ausente").length;
  const tardanzas = Object.values(asistencias).filter((e) => e === "tardanza").length;
  const pendientes = Object.values(asistencias).filter((e) => e === "pendiente").length;

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "32px 20px 48px",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#1f2937",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    title: {
      margin: 0,
      fontSize: "2.2rem",
      color: "#111827",
    },
    subtitle: {
      margin: "8px 0 0",
      color: "#6b7280",
      fontSize: "1rem",
    },
    dateBox: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      backgroundColor: "#f8fafc",
      padding: "12px 14px",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
    },
    label: {
      fontSize: "0.8rem",
      fontWeight: 600,
      color: "#374151",
    },
    dateInput: {
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      padding: "8px 10px",
      fontSize: "0.95rem",
    },
    summaryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "16px",
      marginBottom: "24px",
    },
    summaryCard: {
      backgroundColor: "#ffffff",
      borderRadius: "14px",
      padding: "20px",
      boxShadow: "0 10px 25px rgba(15, 23, 42, 0.06)",
      border: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    summaryNumber: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#111827",
    },
    summaryLabel: {
      fontSize: "0.9rem",
      color: "#4b5563",
      fontWeight: 600,
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
      marginBottom: "18px",
      flexWrap: "wrap",
    },
    searchInput: {
      flex: 1,
      minWidth: "220px",
      padding: "10px 14px",
      borderRadius: "10px",
      border: "1px solid #d1d5db",
      fontSize: "1rem",
    },
    saveBtn: {
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "10px",
      padding: "10px 18px",
      fontSize: "0.95rem",
      fontWeight: 600,
      cursor: "pointer",
      boxShadow: "0 8px 18px rgba(37, 99, 235, 0.25)",
    },
    successMsg: {
      backgroundColor: "#dcfce7",
      color: "#166534",
      border: "1px solid #86efac",
      borderRadius: "10px",
      padding: "10px 12px",
      marginBottom: "16px",
      fontWeight: 600,
    },
    tableContainer: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      border: "1px solid #e5e7eb",
      boxShadow: "0 10px 25px rgba(15, 23, 42, 0.04)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#f3f4f6",
      textAlign: "left",
      padding: "14px 16px",
      fontSize: "0.9rem",
      color: "#374151",
      borderBottom: "1px solid #e5e7eb",
    },
    tr: {
      borderBottom: "1px solid #f1f5f9",
    },
    td: {
      padding: "16px",
      verticalAlign: "middle",
      color: "#1f2937",
    },
    actions: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
    },
    actionBtn: {
      border: "none",
      borderRadius: "8px",
      padding: "8px 12px",
      fontSize: "0.8rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Control de Asistencia</h1>
          <p style={styles.subtitle}>Registro diario de estudiantes</p>
        </div>
        <div style={styles.dateBox}>
          <label style={styles.label}>Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={styles.dateInput}
          />
        </div>
      </div>

      {/* Resumen */}
      <div style={styles.summaryGrid}>
        <div style={{ ...styles.summaryCard, borderLeft: "4px solid #0d6efd" }}>
          <span style={styles.summaryNumber}>{presentes}</span>
          <span style={styles.summaryLabel}>Presentes</span>
        </div>
        <div style={{ ...styles.summaryCard, borderLeft: "4px solid #dc3545" }}>
          <span style={styles.summaryNumber}>{ausentes}</span>
          <span style={styles.summaryLabel}>Ausentes</span>
        </div>
        <div style={{ ...styles.summaryCard, borderLeft: "4px solid #fd7e14" }}>
          <span style={styles.summaryNumber}>{tardanzas}</span>
          <span style={styles.summaryLabel}>Tardanzas</span>
        </div>
        <div style={{ ...styles.summaryCard, borderLeft: "4px solid #6c757d" }}>
          <span style={styles.summaryNumber}>{pendientes}</span>
          <span style={styles.summaryLabel}>Pendientes</span>
        </div>
      </div>

      {/* Buscador + Botón Guardar */}
      <div style={styles.toolbar}>
        <input
          type="text"
          placeholder="Buscar estudiante o curso..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={guardarAsistencia} style={styles.saveBtn}>
          Guardar Asistencia
        </button>
      </div>

      {mensaje && <div style={styles.successMsg}>{mensaje}</div>}

      {/* Lista de estudiantes */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Estudiante</th>
              <th style={styles.th}>Curso</th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantesFiltrados.map((est) => (
              <tr key={est.id} style={styles.tr}>
                <td style={styles.td}>{est.nombre}</td>
                <td style={styles.td}>{est.curso}</td>
                <td style={styles.td}>
                  <span style={getBadgeStyle(asistencias[est.id])}>
                    {asistencias[est.id] || "pendiente"}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button
                      onClick={() => marcarAsistencia(est.id, "presente")}
                      style={{
                        ...styles.actionBtn,
                        backgroundColor: asistencias[est.id] === "presente" ? "#0d6efd" : "#e9ecef",
                        color: asistencias[est.id] === "presente" ? "white" : "#495057",
                      }}
                    >
                      Presente
                    </button>
                    <button
                      onClick={() => marcarAsistencia(est.id, "tardanza")}
                      style={{
                        ...styles.actionBtn,
                        backgroundColor: asistencias[est.id] === "tardanza" ? "#fd7e14" : "#e9ecef",
                        color: asistencias[est.id] === "tardanza" ? "white" : "#495057",
                      }}
                    >
                      Tardanza
                    </button>
                    <button
                      onClick={() => marcarAsistencia(est.id, "ausente")}
                      style={{
                        ...styles.actionBtn,
                        backgroundColor: asistencias[est.id] === "ausente" ? "#dc3545" : "#e9ecef",
                        color: asistencias[est.id] === "ausente" ? "white" : "#495057",
                      }}
                    >
                      Ausente
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Estilos de badges
function getBadgeStyle(estado) {
  const base = {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "600",
    textTransform: "capitalize",
  };

  switch (estado) {
    case "presente":
      return { ...base, backgroundColor: "#d1e7dd", color: "#0f5132" };
    case "ausente":
      return { ...base, backgroundColor: "#f8d7da", color: "#842029" };
    case "tardanza":
      return { ...base, backgroundColor: "#fff3cd", color: "#664d03" };
    default:
      return { ...base, backgroundColor: "#e9ecef", color: "#495057" };
  }
}

