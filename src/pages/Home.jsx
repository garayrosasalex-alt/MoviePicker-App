
import { Link } from "react-router-dom";
import { Film, Compass, Heart } from "lucide-react";

function Home({ usuario }) {
  const nombreUsuario = usuario?.displayName || usuario?.email;

  return (
    <div className="home-page">
      <main className="hero">

        <p className="hero-tag">
          BIENVENIDO A MOVIEPICKER
        </p>

        <h1>
          Encuentra tu próxima
          <span> película favorita.</span>
        </h1>

        <p className="hero-description">
          {nombreUsuario
            ? `Hola, ${nombreUsuario}. Explora películas, descubre nuevos géneros y guarda tus favoritas.`
            : "Explora películas, descubre nuevos géneros y encuentra tus favoritas."}
        </p>

        <Link to="/explorar" className="explore-button">
          <Compass size={20} />
          EXPLORAR PELÍCULAS
        </Link>

        <div className="home-features">

          <div>
            <Film size={28} />
            <h3>Descubre</h3>
            <p>Encuentra nuevas películas.</p>
          </div>

          <div>
            <Compass size={28} />
            <h3>Explora</h3>
            <p>Busca por diferentes géneros.</p>
          </div>

          <div>
            <Heart size={28} />
            <h3>Guarda</h3>
            <p>Organiza tus favoritas.</p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Home;
