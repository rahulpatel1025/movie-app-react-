import '../css/Moviecard.css'
import { Link } from "react-router-dom";
import { useMovieContext } from '../context/MovieContext';

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-poster">
        <img 
          src={posterUrl}
          alt={movie.Title || movie.title || "Movie Poster"} 
        />

        {movie.vote_average > 0 && (
          <span className="user-rating">
            {Math.round(movie.vote_average * 10)}%
          </span>
        )}
      </div>

      <div className="movie-overlay">
        <button 
          className={`favorite-btn ${favorite ? 'active' : ''}`} 
          onClick={onFavClick}
          type="button"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12.1 8.64l-.1.1-.11-.11C9.14 6.02 5.6 6.24 3.5 8.36c-2.24 2.27-2.08 5.93.36 8.18l7.41 7.06c.41.39 1.05.39 1.46 0l7.41-7.06c2.44-2.25 2.6-5.91.36-8.18-2.1-2.12-5.64-2.34-8.09.28z" fill="currentColor"/>
          </svg>
        </button>
      </div>

     <div className="movie-info">
  <h3>
    {movie.Title || movie.title}{" "} <span className="year">({releaseYear})</span>
  </h3>
</div>
    </Link>
  );
}

export default MovieCard;
