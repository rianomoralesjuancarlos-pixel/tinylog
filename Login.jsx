import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h1 className="text-center h3 mb-1">Liceo Infantil Nany</h1>

        <p className="text-center text-muted mb-4">
          Inicia sesión para continuar
        </p>

        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>

            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>

            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Tipo de usuario:
            </label>

            <select
              className="form-select"
              id="role"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Selecciona una opción
              </option>

              <option value="admin">Administrador</option>
              <option value="docente">Docente</option>
              <option value="estudiante">
                Estudiante / Acudiente
              </option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>

        <div className="text-center mt-3">
          <Link
            className="text-decoration-none"
            to="/recuperar-password"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
}