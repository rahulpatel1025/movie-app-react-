// ✅ Load API key and base URL from .env
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

// ✅ Helper function for safe fetch with error handling
const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.results || data; // handle both array results and single object
  } catch (error) {
    console.error('Fetch error:', error);
    return []; // fallback to avoid crashes
  }
};

// ✅ API functions
export const getPopularMovies = () => fetchData(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
export const searchMovies = (query) =>
  fetchData(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
export const getMoviesByGenre = (genreId) =>
  fetchData(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}`);
export const getMovieDetails = (id) => fetchData(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
export const getMovieCredits = (id) =>
  fetchData(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);

export default API_KEY;
