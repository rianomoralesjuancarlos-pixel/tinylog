import { BarChart3, Eye } from "lucide-react";
import AcuPageLayout from "./AcuPageLayout.jsx";

const reportes = [
  { titulo: "Asistencia mensual", detalle: "Resumen de asistencia de Juan Pérez" },
  { titulo: "Desempeño escolar", detalle: "Reporte académico de Juan Pérez" },
];

export default function ReportesAcu() {
  return (
    <AcuPageLayout
      title="Reportes"
      description="Consulta los reportes publicados sobre tu niño."
    >
      <section className="calendar-card">
        <div className="section-header">
          <h2>Reportes disponibles</h2>
          <p>Reportes de <strong>Juan Pérez</strong>, generados y administrados por la institución.</p>
        </div>
        <div className="table-container table-scroll">
          <table>
            <thead><tr><th>Reporte</th><th>Descripción</th><th>Estado</th><th>Acceso</th></tr></thead>
            <tbody>
          {reportes.map((reporte) => (
            <tr key={reporte.titulo}>
              <td><strong><BarChart3 size={17} /> {reporte.titulo}</strong></td>
              <td>{reporte.detalle}</td>
              <td><span className="acu-status acu-status-presente">Publicado</span></td>
              <td><button type="button" className="btn-control" disabled><Eye size={16} /> Solo consulta</button></td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
      </section>
    </AcuPageLayout>
  );
}
