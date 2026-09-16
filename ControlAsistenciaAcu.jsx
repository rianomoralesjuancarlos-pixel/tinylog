import { useState } from "react";
import { CalendarDays, Search } from "lucide-react";
import AcuPageLayout from "./AcuPageLayout.jsx";

const asistencias = [
  { fecha: "2026-06-16", curso: "101", estado: "Presente", observacion: "Ingreso normal" },
  { fecha: "2026-06-15", curso: "101", estado: "Presente", observacion: "Ingreso normal" },
  { fecha: "2026-06-14", curso: "101", estado: "Ausente", observacion: "Justificación pendiente" },
  { fecha: "2026-06-13", curso: "102", estado: "Presente", observacion: "Ingreso normal" },
  { fecha: "2026-06-12", curso: "103", estado: "Tardanza", observacion: "Llegó a las 8:15 a. m." },
];

export default function ControlAsistenciaAcu() {
  const [curso, setCurso] = useState("101");
  const [fecha, setFecha] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const registrosFiltrados = asistencias.filter((registro) => (
    registro.curso === curso &&
    (!fecha || registro.fecha === fecha) &&
    `${registro.estado} ${registro.observacion}`.toLowerCase().includes(busqueda.toLowerCase())
  ));

  const resumen = {
    presentes: registrosFiltrados.filter((registro) => registro.estado === "Presente").length,
    ausentes: registrosFiltrados.filter((registro) => registro.estado === "Ausente").length,
    tardanzas: registrosFiltrados.filter((registro) => registro.estado === "Tardanza").length,
  };

  return (
    <AcuPageLayout
      title="Control de asistencia"
      description="Consulta el registro de asistencia de tu niño."
    >
      <section className="calendar-card">
        <div className="section-header">
          <h2>Registro del estudiante</h2>
          <p>Los estados solo pueden ser modificados por la institución.</p>
        </div>
        <div className="acu-filters">
          <label>
            Curso
            <select value={curso} onChange={(event) => setCurso(event.target.value)}>
              <option value="101">101</option>
              <option value="102">102</option>
              <option value="103">103</option>
            </select>
          </label>
          <label>
            <CalendarDays size={16} /> Fecha
            <input type="date" value={fecha} onChange={(event) => setFecha(event.target.value)} />
          </label>
          <label className="acu-search">
            <Search size={16} /> Buscar
            <input
              type="search"
              placeholder="Estado u observación"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
            />
          </label>
        </div>
        <div className="acu-summary-grid">
          <div><strong>{resumen.presentes}</strong><span>Presentes</span></div>
          <div><strong>{resumen.ausentes}</strong><span>Ausentes</span></div>
          <div><strong>{resumen.tardanzas}</strong><span>Tardanzas</span></div>
        </div>
        <div className="table-container table-scroll">
          <table>
            <thead><tr><th>Fecha</th><th>Curso</th><th>Estado</th><th>Observación</th></tr></thead>
            <tbody>
              {registrosFiltrados.length ? registrosFiltrados.map((registro) => (
                <tr key={`${registro.fecha}-${registro.curso}`}>
                  <td>{registro.fecha}</td>
                  <td>{registro.curso}</td>
                  <td><span className={`acu-status acu-status-${registro.estado.toLowerCase()}`}>{registro.estado}</span></td>
                  <td>{registro.observacion}</td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="acu-empty">No hay registros para los filtros seleccionados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AcuPageLayout>
  );
}
