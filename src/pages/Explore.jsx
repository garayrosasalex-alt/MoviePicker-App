
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

import {
  getPopularMovies,
  getMovieGenres,
  getMoviesByGenre,
  searchMovies,
} from "../services/movies";

function Explore({ favorites, onToggleFavorite }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar géneros desde TMDB
  useEffect(() => {
    getMovieGenres()
      .then(setGenres)
      .catch(() => setError("No se pudieron cargar los géneros."));
  }, []);

  // Cargar películas según búsqueda o género
  useEffect(() => {
    let active = true;

    async function loadMovies() {
      setLoading(true);
      setError("");

      try {
        let results;

        if (search.trim()) {
          results = await searchMovies(search.trim());
        } else if (selectedGenre !== "all") {
          results = await getMoviesByGenre(selectedGenre);
        } else {
          results = await getPopularMovies();
        }

        if (active) {
          setMovies(results);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "No se pudieron cargar las películas.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    const timeout = setTimeout(loadMovies, 350);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [search, selectedGenre]);

  return (
    <main className="explore-page">
      <div className="explore-header">
        <h1>Explorar películas</h1>
        <p>Descubre películas de todos los géneros.</p>

        <input
          type="text"
          placeholder="Buscar una película..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedGenre("all");
          }}
          className="search-input"
        />
      </div>

      <div className="genre-filters">
        <button
          className={selectedGenre === "all" ? "genre-btn active" : "genre-btn"}
          onClick={() => setSelectedGenre("all")}
        >
          Todas
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            className={
              selectedGenre === String(genre.id)
                ? "genre-btn active"
                : "genre-btn"
            }
            onClick={() => {
              setSelectedGenre(String(genre.id));
              setSearch("");
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {loading && <p>Cargando películas...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p>No se encontraron películas.</p>
      )}

      {!loading && !error && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Explore;
