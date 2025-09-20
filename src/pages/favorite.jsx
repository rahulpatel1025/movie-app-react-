import '../css/Favorites.css'
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
function Favorite() {
    const{favorites} = useMovieContext()
    if(Array.isArray(favorites) && favorites.length > 0){
        return (
            <div className = 'favorites'>
                <h2>Your favorites</h2>
                <div className="movies-grid">
                {favorites.map((movie) => 
            (<MovieCard movie= {movie} key = {movie.id}/>))
            }
            </div>
            </div>
        )
    }
    return <div className = 'favorites-empty'>
        <h2>Your favorites list is empty!</h2>
        <p>Add movies to your favorites to see them here.</p>
    </div>
}
export default Favorite;