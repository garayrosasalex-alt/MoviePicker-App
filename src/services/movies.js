
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// Función general para realizar peticiones a TMDB
async function request(endpoint) {
  if (!TOKEN) {
    throw new Error("No se encontró el token de TMDB. Revisa .env.local");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error de TMDB: ${response.status}`);
  }

  return response.json();
}

// Convertir los datos de TMDB al formato de MoviePicker
function formatMovie(movie) {
  return {
    id: movie.id,
    title: movie.title || "Sin título",
    genre: movie.genres
      ? movie.genres.map((g) => g.name).join(", ")
      : "Película",
    year: movie.release_date
      ? movie.release_date.substring(0, 4)
      : "N/D",
    rating: movie.vote_average
      ? movie.vote_average.toFixed(1)
      : "N/D",
    poster: movie.poster_path
      ? `${IMAGE_URL}${movie.poster_path}`
      : null,
    description: movie.overview || "Sin descripción disponible.",
  };
}

// Obtener películas populares
export async function getPopularMovies() {
  const data = await request(
    "/movie/popular?language=es-ES&page=1"
  );

  return data.results.map(formatMovie);
}

// Obtener géneros de películas
export async function getMovieGenres() {
  const data = await request(
    "/genre/movie/list?language=es-ES"
  );

  return data.genres;
}

// Obtener películas por género
export async function getMoviesByGenre(genreId) {
  const data = await request(
    `/discover/movie?language=es-ES&with_genres=${genreId}&sort_by=popularity.desc&page=1`
  );

  return data.results.map(formatMovie);
}

// Buscar películas por nombre
export async function searchMovies(query) {
  const data = await request(
    `/search/movie?language=es-ES&query=${encodeURIComponent(query)}&page=1`
  );

  return data.results.map(formatMovie);
}

// Obtener información detallada de una película
export async function getMovieDetails(id) {
  const data = await request(
    `/movie/${id}?language=es-ES`
  );

  return formatMovie(data);
}

