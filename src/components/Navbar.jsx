import { NavLink, useNavigate } from "react-router-dom";

import {
  Film,
  Home,
  Compass,
  Heart,
  LayoutDashboard,
  LogOut,
  LogIn
} from "lucide-react";

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (typeof onLogout === "function") {
      await onLogout();
      navigate("/inicio");
    }
  };

  return (
    <header className="navbar">

      <NavLink to="/inicio" className="brand">
        <Film size={30} />
        <h2>MOVIE<span>PICKER</span></h2>
      </NavLink>

      <nav>
        <NavLink to="/inicio">
          <Home size={17} />
          Inicio
        </NavLink>

        <NavLink to="/dashboard">
          <LayoutDashboard size={17} />
          Dashboard
        </NavLink>

        <NavLink to="/explorar">
          <Compass size={17} />
          Explorar
        </NavLink>

        <NavLink to="/favoritos">
          <Heart size={17} />
          Favoritos
        </NavLink>
      </nav>

      {typeof onLogout === "function" ? (
        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Salir
        </button>
      ) : (
        <button
          className="logout-button"
          onClick={() => navigate("/login")}
        >
          <LogIn size={18} />
          Iniciar sesión
        </button>
      )}

    </header>
  );
}

export default Navbar;

