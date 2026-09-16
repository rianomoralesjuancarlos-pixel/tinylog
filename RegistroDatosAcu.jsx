import { useState } from "react";
import { UserRound, ShieldCheck, Plus, Trash2, Lock } from "lucide-react";
import AcuPageLayout from "./AcuPageLayout.jsx";

const datosIniciales = [
  ["Nombre del estudiante", "Juan Pérez"],
  ["Curso", "101"],
  ["Documento", "Información protegida"],
  ["Acudiente", "Información protegida"],
];

const crearHijoVacio = () => ({
  nombre: "",
  curso: "",
  edad: "",
  documento: "",
});

export default function RegistroDatosAcu() {
  const usuario = (localStorage.getItem("usuario") || "").toLowerCase();
  const esDirectivo = ["administrador", "directivo"].includes(usuario);
  const [hijos, setHijos] = useState([crearHijoVacio()]);
  const [mensaje, setMensaje] = useState("");

  const agregarHijo = () => {
    if (!esDirectivo) return;
    setHijos((prev) => [...prev, crearHijoVacio()]);
  };

  const removerHijo = (index) => {
    if (!esDirectivo) return;
    if (hijos.length === 1) return;
    setHijos((prev) => prev.filter((_, indice) => indice !== index));
  };

  const actualizarHijo = (index, campo, valor) => {
    if (!esDirectivo) return;
    setHijos((prev) => prev.map((hijo, i) => i === index ? { ...hijo, [campo]: valor } : hijo));
  };

  const guardarFamilia = () => {
    if (!esDirectivo) return;
    const hayCamposVacios = hijos.some((hijo) => !hijo.nombre.trim() || !hijo.curso.trim() || !hijo.documento.trim());

    if (hayCamposVacios) {
      setMensaje("Completa los datos de cada niño antes de guardar.");
      return;
    }

    setMensaje("Información familiar actualizada correctamente.");
  };

  return (
    <AcuPageLayout
      title="Registro de datos"
      description={esDirectivo ? "Consulta y actualiza la información de cada niño de la familia." : "Tu familia puede revisar esta información, pero solo la institución puede editarla."}
    >
      <section className="calendar-card acu-data-panel">
        <div className="section-header">
          <h2><UserRound size={24} /> Información del estudiante</h2>
          <p>{esDirectivo ? "Puedes registrar y actualizar la información del estudiante cuando lo necesites." : "Este apartado es de consulta para la familia y la edición corresponde a la institución."}</p>
        </div>

        <div className="table-container table-scroll">
          <table>
            <thead><tr><th>Dato</th><th>Información</th><th>Permiso</th></tr></thead>
            <tbody>{datosIniciales.map(([label, value]) => (
              <tr key={label}>
                <td><strong>{label}</strong></td><td>{value}</td>
                <td><span className="acu-readonly"><ShieldCheck size={15} /> {esDirectivo ? "Editable por directivo" : "Solo lectura"}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section className="calendar-card family-panel">
        <div className="section-header family-header">
          <h2><UserRound size={24} /> Familia escolar</h2>
          {esDirectivo && (
            <button type="button" className="btn-primary-modern btn-small" onClick={agregarHijo}>
              <Plus size={18} /> Agregar otro niño
            </button>
          )}
          {!esDirectivo && (
            <span className="acu-readonly acu-readonly-lock"><Lock size={15} /> Solo revisión</span>
          )}
        </div>

        <div className="family-list">
          {hijos.map((hijo, index) => (
            <div className="family-child-card" key={`hijo-${index}`}>
              <div className="family-child-header">
                <h3>Niño {index + 1}</h3>
                {esDirectivo && hijos.length > 1 && (
                  <button type="button" className="btn-inline-danger" onClick={() => removerHijo(index)}>
                    <Trash2 size={16} /> Quitar
                  </button>
                )}
              </div>

              <div className="family-grid">
                <label>
                  Nombre completo
                  <input type="text" value={hijo.nombre} onChange={(event) => actualizarHijo(index, "nombre", event.target.value)} placeholder="Ej. Andrés Pérez" readOnly={!esDirectivo} />
                </label>

                <label>
                  Curso
                  <select value={hijo.curso} onChange={(event) => actualizarHijo(index, "curso", event.target.value)} disabled={!esDirectivo}>
                    <option value="">Selecciona</option>
                    <option value="Párvulos">Párvulos</option>
                    <option value="Prejardín">Prejardín</option>
                    <option value="Jardín">Jardín</option>
                    <option value="Transición">Transición</option>
                    <option value="101">101</option>
                    <option value="102">102</option>
                  </select>
                </label>

                <label>
                  Edad
                  <input type="number" min="2" max="12" value={hijo.edad} onChange={(event) => actualizarHijo(index, "edad", event.target.value)} placeholder="Ej. 5" readOnly={!esDirectivo} />
                </label>

                <label>
                  Documento
                  <input type="text" value={hijo.documento} onChange={(event) => actualizarHijo(index, "documento", event.target.value)} placeholder="Ej. 1087654321" readOnly={!esDirectivo} />
                </label>
              </div>
            </div>
          ))}
        </div>

        {mensaje && <p className="family-message">{mensaje}</p>}

        {esDirectivo && (
          <button type="button" className="auth-btn-submit" onClick={guardarFamilia}>
            Guardar información familiar
          </button>
        )}
      </section>
    </AcuPageLayout>
  );
}
