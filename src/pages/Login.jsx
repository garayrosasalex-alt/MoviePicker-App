
import { useState } from "react";
import { Film, Lock, Mail, User } from "lucide-react";

function Login({ onLogin, onRegister }) {
  const [modo, setModo] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Completa todos los campos.");
      return;
    }

    if (modo === "register" && !name.trim()) {
      setError("Ingresa tu nombre.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);

      if (modo === "login") {
        await onLogin(email.trim(), password);
      } else {
        await onRegister(name.trim(), email.trim(), password);
      }
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Este correo ya está registrado.");
          break;
        case "auth/invalid-email":
          setError("El correo electrónico no es válido.");
          break;
        case "auth/invalid-credential":
          setError("Correo o contraseña incorrectos.");
          break;
        case "auth/weak-password":
          setError("La contraseña debe tener al menos 6 caracteres.");
          break;
        default:
          setError("Ocurrió un error. Inténtalo nuevamente.");
          console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const cambiarModo = () => {
    setModo(modo === "login" ? "register" : "login");
    setError("");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">
          <Film size={38} />
          <h1>MOVIE<span>PICKER</span></h1>
        </div>

        <p className="login-subtitle">
          Descubre tu próxima película favorita.
        </p>

        <h2>
          {modo === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h2>

        <form onSubmit={manejarEnvio}>
          {modo === "register" && (
            <>
              <label>Nombre completo</label>
              <div className="input-group">
                <User size={19} />
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </>
          )}

          <label>Correo electrónico</label>
          <div className="input-group">
            <Mail size={19} />
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label>Contraseña</label>
          <div className="input-group">
            <Lock size={19} />
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            className="login-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Procesando..."
              : modo === "login"
                ? "INGRESAR"
                : "REGISTRARME"}
          </button>
        </form>

        <p className="login-footer">
          {modo === "login"
            ? "¿No tienes una cuenta?"
            : "¿Ya tienes una cuenta?"}
          {" "}
          <button
            type="button"
            onClick={cambiarModo}
            className="auth-switch"
          >
            {modo === "login" ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;

