import MovieCard from '../components/MovieCard';
import Genre from '../components/Genre';
import '../css/Home.css'
import '../css/Loader.css'
import { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies, getMoviesByGenre } from '../services/api';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOption, setSortOption] = useState('popularity');

  const sortMovies = (movies, option) => {
    switch (option) {
      case 'title':
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      case 'release_date':
        return [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      case 'rating':
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      case 'popularity':
      default:
        return [...movies].sort((a, b) => b.popularity - a.popularity);
    }
  };

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch popular movies');
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);

    try {
      let searchResult = await searchMovies(searchQuery);

      if (selectedGenre) {
        searchResult = searchResult.filter((movie) =>
          movie.genre_ids.includes(selectedGenre)
        );
      }

      setMovies(searchResult);
      setError(null);
    } catch (err) {
      console.log(err);
      setError('Failed to search movies.');
    } finally {
      setLoading(false);
    }
    setSearchQuery('');
  };

  const handleGenreFilter = async (genreId) => {
    setSelectedGenre(genreId);
    setLoading(true);

    try {
      if (genreId === null) {
        const popular = await getPopularMovies();
        setMovies(popular);
      } else {
        const byGenre = await getMoviesByGenre(genreId);
        setMovies(byGenre);
      }
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch movies by genre.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loader"></div>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <Genre onFilter={handleGenreFilter} activeGenre={selectedGenre} />

      <div className="sort-container">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="title">Title</option>
          <option value="release_date">Release Date</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="movies-grid">
        {sortMovies(movies, sortOption).length > 0 ? (
          sortMovies(movies, sortOption).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#aaa" }}>No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
