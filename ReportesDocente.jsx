import { useMemo, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Reportes.css";

const datosIniciales = [
  { nombre: "Ana López", curso: "3° A", fecha: "2026-09-08", estado: "presente" },
  { nombre: "Carlos Méndez", curso: "3° A", fecha: "2026-09-08", estado: "tardanza" },
  { nombre: "María González", curso: "3° B", fecha: "2026-09-08", estado: "ausente" },
  { nombre: "Pedro Ramírez", curso: "3° A", fecha: "2026-09-08", estado: "presente" },
];

export default function Reportes() {
  const navigate = useNavigate();
  const usuario = (localStorage.getItem("usuario") || "").toLowerCase().trim();
  const puedeEnviarReporte = ["docente", "profesor"].includes(usuario);
  const [fecha, setFecha] = useState("2026-09-08");
  const [curso, setCurso] = useState("todos");
  const [reporteEnviado, setReporteEnviado] = useState(false);

  const datosFiltrados = useMemo(
    () => datosIniciales.filter((registro) => (
      registro.fecha === fecha && (curso === "todos" || registro.curso === curso)
    )),
    [curso, fecha]
  );

  const resumen = {
    total: datosFiltrados.length,
    presentes: datosFiltrados.filter((registro) => registro.estado === "presente").length,
    ausentes: datosFiltrados.filter((registro) => registro.estado === "ausente").length,
    tardanzas: datosFiltrados.filter((registro) => registro.estado === "tardanza").length,
  };

  const enviarReporteDirectivo = () => {
    if (!puedeEnviarReporte) return;

    const asunto = encodeURIComponent("Reporte de asistencia del curso");
    const cuerpo = encodeURIComponent(
      `Estimado directivo,\n\nAdjunto el resumen del reporte de asistencia del ${fecha}:\n- Total: ${resumen.total}\n- Presentes: ${resumen.presentes}\n- Ausentes: ${resumen.ausentes}\n- Tardanzas: ${resumen.tardanzas}\n\nQuedo atento.`
    );

    window.location.href = `mailto:directivo@liceonany.edu.co?subject=${asunto}&body=${cuerpo}`;
    setReporteEnviado(true);
  };

  return (
    <main className="reportes-page docente-module-page reportes-docente-page">
      <div className="reportes-container">
        <div className="back-home-wrapper">
          <button
            type="button"
            onClick={() => navigate(localStorage.getItem("usuario") === "docente" ? "/pagina-docente" : "/pagina-principal")}
            className="btn-control back-home-button"
          >
            <ArrowLeft size={18} />
            Volver al Inicio
          </button>
        </div>

        <header className="reportes-header">
          <div>
            <h1 className="reportes-title"><FileText size={32} /> Reportes</h1>
            <p className="reportes-subtitle">Consulta el resumen de asistencia por fecha y curso.</p>
          </div>
        </header>

        <section className="reportes-filters" aria-label="Filtros de reportes">
          <div className="reportes-field">
            <label htmlFor="reporte-fecha">Fecha</label>
            <input
              id="reporte-fecha"
              type="date"
              value={fecha}
              onChange={(event) => setFecha(event.target.value)}
            />
          </div>
          <div className="reportes-field">
            <label htmlFor="reporte-curso">Curso</label>
            <select
              id="reporte-curso"
              value={curso}
              onChange={(event) => setCurso(event.target.value)}
            >
              <option value="todos">Todos los cursos</option>
              <option value="3° A">3° A</option>
              <option value="3° B">3° B</option>
            </select>
          </div>
          <button type="button" className="reportes-filter-button">Consultar reporte</button>
          <button
            type="button"
            className="reportes-filter-button"
            onClick={enviarReporteDirectivo}
            disabled={!puedeEnviarReporte}
            style={{
              opacity: puedeEnviarReporte ? 1 : 0.6,
              cursor: puedeEnviarReporte ? "pointer" : "not-allowed",
              backgroundColor: "#059669"
            }}
          >
            {reporteEnviado ? "Reporte enviado" : "Enviar reporte al directivo"}
          </button>
        </section>

        {reporteEnviado && (
          <div className="reportes-summary-card" style={{ marginBottom: "18px", borderLeft: "4px solid #059669" }}>
            El reporte fue preparado para enviarse al directivo por correo.
          </div>
        )}

        <section className="reportes-summary" aria-label="Resumen de asistencia">
          <div className="reportes-summary-card"><strong>{resumen.total}</strong><span>Total registros</span></div>
          <div className="reportes-summary-card"><strong>{resumen.presentes}</strong><span>Presentes</span></div>
          <div className="reportes-summary-card"><strong>{resumen.ausentes}</strong><span>Ausentes</span></div>
          <div className="reportes-summary-card"><strong>{resumen.tardanzas}</strong><span>Tardanzas</span></div>
        </section>

        <div className="reportes-table-wrapper">
          <table className="reportes-table">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Curso</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.length > 0 ? datosFiltrados.map((registro) => (
                <tr key={`${registro.nombre}-${registro.fecha}`}>
                  <td>{registro.nombre}</td>
                  <td>{registro.curso}</td>
                  <td>{registro.fecha}</td>
                  <td><span className={`reportes-status ${registro.estado}`}>{registro.estado}</span></td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4">No hay registros para los filtros seleccionados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
