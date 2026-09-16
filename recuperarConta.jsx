import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Recuperar() {
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);

  const navigate = useNavigate();

  const enviarCodigo = (e) => {
    e.preventDefault();

    if (!correo) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Por favor, ingresa tu correo electrónico.',
      });
      return;
    }

    setCodigoEnviado(true);
    Swal.fire({
      icon: 'success',
      title: '¡Código enviado!',
      text: 'Revisa tu correo electrónico para obtener el código.',
    });
  };

  const verificarCodigo = (e) => {
    e.preventDefault();

    if (!codigo) {
      Swal.fire({
        icon: 'warning',
        title: 'Código vacío',
        text: 'Por favor, ingresa el código de verificación.',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Código verificado',
      text: 'Ahora puedes establecer tu nueva contraseña.',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate('/nueva-contrasena');
    });
  };

  return (
    <div className="dashboard-container auth-wrapper">
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="auth-card">
        <h1 className="auth-title" style={{ fontSize: "1.4rem" }}>Recuperar Contraseña</h1>
        <p className="auth-subtitle">
          Ingresa tu correo electrónico para recuperar tu contraseña
        </p>

        <form onSubmit={enviarCodigo}>
          <div className="auth-form-group">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              placeholder="Ingresa tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn-submit" style={{ marginBottom: "15px" }}>
            Enviar código de verificación
          </button>
        </form>

        {codigoEnviado && (
          <form onSubmit={verificarCodigo}>
            <div className="auth-form-group">
              <label htmlFor="codigo">Código de verificación</label>
              <input
                id="codigo"
                type="text"
                placeholder="Ingresa el código"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-btn-submit">
              Nueva contraseña
            </button>
          </form>
        )}

        <div className="auth-footer-link">
          <Link to="/">Volver al Inicio</Link>
        </div>
      </div>
    </div>
  );
}