import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getMovieCredits } from "../services/api";
import "../css/MovieInfo.css";

function MovieInfo() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);
      const credits = await getMovieCredits(id);
      setCast(credits.cast.slice(0, 10));
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p style={{ color: "#fff" }}>Loading...</p>;

  return (
    <div className="movie-info">
      <div className="left-column">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-rating">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10
          </div>
        </div>

        <div className="cast-section">
          <h2>Top Cast</h2>
          <div className="cast-members">
            {cast.map((actor) => (
              <div key={actor.id} className="cast-member">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/100x150?text=No+Image"
                  }
                  alt={actor.name}
                />
                <span>
                  {actor.name} <br />
                  <small>{actor.character}</small>
                </span>
              </div>
            ))}
          </div> 
        </div> 
      </div>

      <div className="movie-details">
        <h1>{movie.title}</h1>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Runtime:</strong> {movie.runtime} min
        </p>
        <p>
          <strong>Language:</strong> {movie.original_language?.toUpperCase()}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres?.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <strong>Overview:</strong> {movie.overview}
        </p>
      </div>
    </div>
  );
}

export default MovieInfo;
