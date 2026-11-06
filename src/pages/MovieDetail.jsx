
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/movies";

function MovieDetail({ favorites, onToggleFavorite }) {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true);
        const result = await getMovieDetails(id);
        setMovie(result);
      } catch (err) {
        setError(err.message || "No se pudo cargar la película.");
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) return <p>Cargando película...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Película no encontrada.</p>;

  const isFavorite = favorites.some(
    (favorite) => favorite.id === movie.id
  );

  return (
    <main className="movie-detail">
      <div className="detail-poster">
        {movie.poster && (
          <img src={movie.poster} alt={movie.title} />
        )}
      </div>

      <div className="detail-info">
        <h1>{movie.title}</h1>

        <p>Año: {movie.year}</p>
        <p>Género: {movie.genre}</p>
        <p>Calificación: ⭐ {movie.rating}</p>

        <h3>Sinopsis</h3>
        <p>{movie.description}</p>

        <button onClick={() => onToggleFavorite(movie)}>
          {isFavorite ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
        </button>

        <br />
        <br />

        <Link to="/explorar">← Volver a explorar</Link>
      </div>
    </main>
  );
}

export default MovieDetail;
