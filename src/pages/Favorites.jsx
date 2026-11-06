
import { Heart } from "lucide-react";
import MovieCard from "../components/MovieCard";

function Favorites({ favorites, onToggleFavorite }) {
  return (
    <main className="catalog-page">
      <section className="catalog-heading">
        <p className="hero-tag">TU COLECCIÓN PERSONAL</p>
        <h1>Mis favoritos <Heart size={30} /></h1>
        <p>Aquí encontrarás las películas que has guardado.</p>
      </section>

      {favorites.length > 0 ? (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-favorites">
          <Heart size={55} />
          <h2>Aún no tienes favoritos</h2>
          <p>Explora películas y guarda las que más te gusten.</p>
        </div>
      )}
    </main>
  );
}

export default Favorites;
