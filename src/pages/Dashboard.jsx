import { useEffect, useState } from "react";
import {
  Film,
  Heart,
  Clapperboard,
  Star,
  TrendingUp
} from "lucide-react";

import {
  getPopularMovies,
  getMovieGenres
} from "../services/movies";

function Dashboard({ usuario, favorites = [] }) {
  const [peliculas, setPeliculas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [popular, listaGeneros] = await Promise.all([
          getPopularMovies(),
          getMovieGenres()
        ]);

        setPeliculas(popular || []);
        setGeneros(listaGeneros || []);
      } catch (error) {
        console.error("Error al cargar el Dashboard:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const nombreUsuario =
    usuario?.displayName || usuario?.email || "Invitado";

  return (
    <main className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <p className="dashboard-tag">PANEL DE CONTROL</p>
          <h1>Dashboard</h1>
          <p>
            Bienvenido, <strong>{nombreUsuario}</strong>.
            Aquí tienes un resumen de MoviePicker.
          </p>
        </div>

        <div className="dashboard-icon">
          <Clapperboard size={35} />
        </div>
      </section>

      <section className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-icon purple">
            <Film size={24} />
          </div>
          <div>
            <p>Películas populares</p>
            <h2>{cargando ? "..." : peliculas.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pink">
            <Heart size={24} />
          </div>
          <div>
            <p>Mis favoritas</p>
            <h2>{favorites.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <Clapperboard size={24} />
          </div>
          <div>
            <p>Géneros disponibles</p>
            <h2>{cargando ? "..." : generos.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <Star size={24} />
          </div>
          <div>
            <p>Estado de cuenta</p>
            <h2>{usuario ? "Activo" : "Invitado"}</h2>
          </div>
        </div>

      </section>

      <section className="dashboard-content">

        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <h2>Géneros disponibles</h2>
              <p>Explora las categorías de películas.</p>
            </div>
            <TrendingUp size={23} />
          </div>

          <div className="genres-list">
            {generos.map((genero) => (
              <div className="genre-item" key={genero.id}>
                <span>{genero.name}</span>
                <span className="genre-number">
                  #{genero.id}
                </span>
              </div>
            ))}

            {!cargando && generos.length === 0 && (
              <p>No se pudieron cargar los géneros.</p>
            )}
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <h2>Películas populares</h2>
              <p>Algunas recomendaciones de TMDB.</p>
            </div>
            <Film size={23} />
          </div>

          <div className="popular-list">
            {peliculas.slice(0, 5).map((pelicula) => (
              <div className="popular-item" key={pelicula.id}>
                <img
                  src={pelicula.poster}
                  alt={pelicula.title}
                />

                <div>
                  <h3>{pelicula.title}</h3>
                  <p>{pelicula.year}</p>
                </div>

                <span>
                  <Star size={14} />
                  {pelicula.rating}
                </span>
              </div>
            ))}

            {!cargando && peliculas.length === 0 && (
              <p>No hay películas disponibles.</p>
            )}
          </div>
        </div>

      </section>
    </main>
  );
}

export default Dashboard;