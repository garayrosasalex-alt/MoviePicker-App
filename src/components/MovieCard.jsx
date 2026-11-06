
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  return (
    <article className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />

        <button
          className={`favorite-button ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(movie)}
          aria-label="Agregar o quitar de favoritos"
        >
          <Heart
            size={22}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>{movie.genre} · {movie.year}</p>

        <div className="movie-rating">
          <Star size={16} fill="currentColor" />
          <span>{movie.rating}</span>
        </div>

        <Link
          to={`/pelicula/${movie.id}`}
          className="detail-button"
        >
          Ver detalles
        </Link>
      </div>
    </article>
  );
}

export default MovieCard;
