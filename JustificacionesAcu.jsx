import { useState } from "react";
import { FileText, Send } from "lucide-react";
import AcuPageLayout from "./AcuPageLayout.jsx";

export default function JustificacionesAcu() {
  const [curso, setCurso] = useState("");
  const [motivo, setMotivo] = useState("");
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarJustificacion = (event) => {
    event.preventDefault();
    if (!curso || !fecha || !motivo.trim()) return;
    setMensaje("Justificación enviada correctamente.");
  };

  return (
    <AcuPageLayout
      title="Justificaciones"
      description="Envía una justificación de ausencia para tu niño."
    >
      <section className="calendar-card">
        <div className="section-header">
          <h2><FileText size={24} /> Justificar ausencia</h2>
          <p>Selecciona el curso y la fecha, y escribe el motivo de la ausencia.</p>
        </div>
        <form onSubmit={enviarJustificacion} className="auth-form-group">
          <label htmlFor="nombre-nino">Nombre del niño</label>
          <input id="nombre-nino" value="Juan Pérez" readOnly />
          <label htmlFor="curso">Curso</label>
          <select
            id="curso"
            value={curso}
            onChange={(event) => setCurso(event.target.value)}
            required
          >
            <option value="" disabled>Selecciona el curso</option>
            <option value="101">101</option>
            <option value="102">102</option>
            <option value="103">103</option>
            <option value="104">104</option>
          </select>
          <label htmlFor="fecha-ausencia">Fecha de ausencia</label>
          <input
            id="fecha-ausencia"
            type="date"
            value={fecha}
            onChange={(event) => setFecha(event.target.value)}
            required
          />
          <label htmlFor="motivo">Motivo de la ausencia</label>
          <textarea
            id="motivo"
            value={motivo}
            onChange={(event) => setMotivo(event.target.value)}
            placeholder="Escribe el motivo de la ausencia"
            rows="5"
            required
          />
          <button type="submit" className="auth-btn-submit">
            <Send size={18} /> Enviar justificación
          </button>
          {mensaje && <p role="status">{mensaje}</p>}
        </form>
      </section>
    </AcuPageLayout>
  );
}
