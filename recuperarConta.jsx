import { Link } from 'react-router-dom';

export default function RecuperarPassword() {
  // Función para manejar el envío del formulario
const handleSubmit = (e) => {
    e.preventDefault();
    alert('Código enviado correctamente');
};

return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
<div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 className="text-center h4 mb-2">Recuperar Contraseña</h1>
        <p className="text-center text-muted mb-4">Ingresa tu correo electrónico para recuperar tu contraseña</p>

        <form onSubmit={handleSubmit}>
<div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" placeholder="Ingresa tu correo" required />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-4">Enviar código de verificación</button>

          <div className="mb-3">
            <label className="form-label">Código de verificación</label>
            <input type="text" className="form-control" placeholder="Ingresa el código" required />
          </div>
        </form>

        <form action="/nueva-contrasena">
          <button type="button" className="btn btn-success w-100 mb-3">Nueva Contraseña</button>
        </form>

        <div className="text-center mt-3">
          {/* En lugar de etiqueta <a>, usamos Link en React */}
          <Link to="/" className="text-decoration-none">Volver al Inicio</Link>
        </div>
      </div>
    </div>
  );
}