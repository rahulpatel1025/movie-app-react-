import { useEffect, useState } from "react";
import API_KEY from "../services/api";
import "../css/Genre.css";  

function Genre({ onFilter, activeGenre }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setGenres(data.genres); 
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    }
    fetchGenres();
  }, []);

  return (
    <div className="genre-filter">
      {/* All button */}
      <button 
        className={`genre-button ${activeGenre === null ? "active" : ""}`} 
        onClick={() => onFilter(null)}
      >
        All
      </button>

      {/* Genre buttons */}
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`genre-button ${activeGenre === genre.id ? "active" : ""}`}
          onClick={() => onFilter(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default Genre;
