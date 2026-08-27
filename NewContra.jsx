import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function NewContra() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Debes completar todos los campos.",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Contraseña cambiada",
      text: "Tu contraseña ha sido actualizada exitosamente.",
      confirmButtonText: "Continuar",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h1 className="text-center h3 mb-4">
          Nueva Contraseña
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Nueva Contraseña
            </label>

            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Ingresa tu nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Nueva Contraseña
            </label>

            <input
              id="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Confirma tu nueva contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Cambiar contraseña
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="text-decoration-none">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}