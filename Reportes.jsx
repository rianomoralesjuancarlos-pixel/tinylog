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
  const puedeEnviarCorreo = ["administrador", "directivo"].includes(usuario);
  const [fecha, setFecha] = useState("2026-09-08");
  const [curso, setCurso] = useState("todos");
  const [correosEnviados, setCorreosEnviados] = useState({});

  const datosFiltrados = useMemo(
    () => [
      { nombre: "Ana López", curso: "3° A", fecha: "2026-09-08", estado: "presente", emailPadre: "ana.padre@correo.com" },
      { nombre: "Carlos Méndez", curso: "3° A", fecha: "2026-09-08", estado: "tardanza", emailPadre: "carlos.padre@correo.com" },
      { nombre: "María González", curso: "3° B", fecha: "2026-09-08", estado: "ausente", emailPadre: "maria.padre@correo.com" },
      { nombre: "Pedro Ramírez", curso: "3° A", fecha: "2026-09-08", estado: "presente", emailPadre: "pedro.padre@correo.com" },
    ].filter((registro) => (
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

  const enviarCorreoPadre = (registro) => {
    if (!puedeEnviarCorreo) return;

    const asunto = encodeURIComponent(`Reporte de asistencia de ${registro.nombre}`);
    const cuerpo = encodeURIComponent(
      `Estimado padre o acudiente,\n\nLe informamos que el estado de asistencia de ${registro.nombre} para la fecha ${registro.fecha} fue: ${registro.estado}.\n\nCordialmente,\nDirección académica.`
    );

    window.location.href = `mailto:${registro.emailPadre}?subject=${asunto}&body=${cuerpo}`;
    setCorreosEnviados((prev) => ({ ...prev, [registro.nombre + registro.fecha]: true }));
  };

  return (
    <main className="reportes-page">
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
        </section>

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
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                      <span className={`reportes-status ${registro.estado}`}>{registro.estado}</span>
                      {puedeEnviarCorreo && (
                        <button
                          type="button"
                          className="reportes-filter-button"
                          onClick={() => enviarCorreoPadre(registro)}
                          style={{
                            padding: "8px 12px",
                            fontSize: "0.8rem",
                            backgroundColor: correosEnviados[registro.nombre + registro.fecha] ? "#16a34a" : "#2563eb"
                          }}
                        >
                          {correosEnviados[registro.nombre + registro.fecha] ? "Correo enviado" : "Enviar correo"}
                        </button>
                      )}
                    </div>
                  </td>
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
