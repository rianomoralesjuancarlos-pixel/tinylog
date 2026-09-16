import React, { useState } from 'react';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Registro.css';

export default function RegistroEstudiante() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    tipo_doc_estudiante: '',
    doc_estudiante: '',
    fecha_nacimiento: '',
    genero_estudiante: '',
    curso_registro: '',
    observaciones: '',
    acudiente: '',
    parentesco: '',
    edad_acudiente: '',
    tipo_doc_acudiente: '',
    doc_acudiente: '',
    telefono: '',
    correo: '',
    direccion: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'El estudiante y su acudiente han sido registrados correctamente.',
        confirmButtonColor: '#4f46e5'
      });
      navigate('/pagina-principal');
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo completar el registro. Intente nuevamente.',
        confirmButtonColor: '#4f46e5'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="registro-page">
        <div className="registro-background-blobs">
          <div className="registro-blob registro-blob-1"></div>
          <div className="registro-blob registro-blob-2"></div>
          <div className="registro-blob registro-blob-3"></div>
        </div>

        <header className="registro-header">
          <div className="registro-container-nav">
            <div className="registro-logo">
              <GraduationCap size={24} color="#4f46e5" />
              <span>Liceo Infantil Nany</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/pagina-principal')}
              className="back-home-button"
            >
              <ArrowLeft size={18} />
              Volver al Inicio
            </button>
          </div>
        </header>

        <main className="registro-main">
          <h1 className="registro-title">Registro de Estudiante</h1>

          <div className="registro-info">
            <form onSubmit={handleSubmit}>
              <div className="registro-form-grid">

                {/* Datos del Estudiante */}
                <fieldset className="registro-fieldset">
                  <legend className="registro-legend">Datos del Estudiante</legend>

                  <div className="registro-field">
                    <label className="registro-label">Nombres del Niño/a:</label>
                    <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} placeholder="Ej. Juan Carlos" required className="registro-input" />
                  </div>

                  <div className="registro-field">
                    <label className="registro-label">Apellidos:</label>
                    <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Ej. Pérez Gómez" required className="registro-input" />
                  </div>

                  <div className="registro-row">
                    <div className="registro-field">
                      <label className="registro-label">Tipo de Documento:</label>
                      <select name="tipo_doc_estudiante" value={formData.tipo_doc_estudiante} onChange={handleChange} required className="registro-select">
                        <option disabled value="">Seleccione</option>
                        <option value="RC">Registro Civil</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="CE">Cédula de Extranjería</option>
                      </select>
                    </div>
                    <div className="registro-field">
                      <label className="registro-label">Número de Documento:</label>
                      <input type="text" name="doc_estudiante" value={formData.doc_estudiante} onChange={handleChange} placeholder="Ej. 10234567" required className="registro-input" />
                    </div>
                  </div>

                  <div className="registro-row">
                    <div className="registro-field">
                      <label className="registro-label">Fecha de Nacimiento:</label>
                      <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required className="registro-input" />
                    </div>
                    <div className="registro-field">
                      <label className="registro-label">Género:</label>
                      <select name="genero_estudiante" value={formData.genero_estudiante} onChange={handleChange} required className="registro-select">
                        <option disabled value="">Seleccione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div className="registro-field">
                    <label className="registro-label">Curso al que se matricula:</label>
                    <select name="curso_registro" value={formData.curso_registro} onChange={handleChange} required className="registro-select">
                      <option disabled value="">Seleccione el curso</option>
                      <option value="Parvulos">Párvulos</option>
                      <option value="Prejardin">Pre-Jardín</option>
                      <option value="Jardin">Jardín</option>
                      <option value="Transicion">Transición</option>
                      <option value="101">101</option>
                      <option value="102">102</option>
                    </select>
                  </div>

                  <div className="registro-field">
                    <label className="registro-label">Observaciones Médicas o Alergias:</label>
                    <textarea name="observaciones" rows={3} value={formData.observaciones} onChange={handleChange} placeholder="Ej. Alérgico al maní, usa gafas..." className="registro-textarea" />
                  </div>
                </fieldset>

                {/* Datos del Acudiente */}
                <fieldset className="registro-fieldset">
                  <legend className="registro-legend">Datos del Padre o Acudiente</legend>

                  <div className="registro-field">
                    <label className="registro-label">Nombre Completo del Acudiente:</label>
                    <input type="text" name="acudiente" value={formData.acudiente} onChange={handleChange} placeholder="Ej. María Gómez Pérez" required className="registro-input" />
                  </div>

                  <div className="registro-row">
                    <div className="registro-field">
                      <label className="registro-label">Parentesco:</label>
                      <select name="parentesco" value={formData.parentesco} onChange={handleChange} required className="registro-select">
                        <option disabled value="">Seleccione</option>
                        <option value="Madre">Madre</option>
                        <option value="Padre">Padre</option>
                        <option value="Abuelo">Abuelo/a</option>
                        <option value="Tio">Tío/a</option>
                        <option value="Legal">Apoderado Legal</option>
                      </select>
                    </div>
                    <div className="registro-field">
                      <label className="registro-label">Edad:</label>
                      <input type="number" name="edad_acudiente" min={18} max={100} value={formData.edad_acudiente} onChange={handleChange} placeholder="Ej. 35" required className="registro-input" />
                    </div>
                  </div>

                  <div className="registro-row">
                    <div className="registro-field">
                      <label className="registro-label">Tipo de Documento:</label>
                      <select name="tipo_doc_acudiente" value={formData.tipo_doc_acudiente} onChange={handleChange} required className="registro-select">
                        <option disabled value="">Seleccione</option>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="Pasaporte">Pasaporte</option>
                      </select>
                    </div>
                    <div className="registro-field">
                      <label className="registro-label">Número de Documento:</label>
                      <input type="text" name="doc_acudiente" value={formData.doc_acudiente} onChange={handleChange} placeholder="Ej. 80123456" required className="registro-input" />
                    </div>
                  </div>

                  <div className="registro-row">
                    <div className="registro-field">
                      <label className="registro-label">Teléfono de Contacto:</label>
                      <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Ej. 3123456789" required className="registro-input" />
                    </div>
                    <div className="registro-field">
                      <label className="registro-label">Correo Electrónico:</label>
                      <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="ejemplo@correo.com" required className="registro-input" />
                    </div>
                  </div>

                  <div className="registro-field">
                    <label className="registro-label">Dirección de Residencia:</label>
                    <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Ej. Calle 145 # 50-22" required className="registro-input" />
                  </div>
                </fieldset>

                <button type="submit" className="registro-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Registrando...' : 'Registrar Estudiante'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}