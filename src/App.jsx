import './css/App.css'
import Home from './pages/Home'
import Favorite from './pages/favorite'
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import {MovieProvider} from './context/MovieContext.jsx'
import MovieInfo from "./pages/MovieInfo";
function App() {
    return (
      <MovieProvider>
        <NavBar />
      <main className = 'main-content'>
    <Routes>
      <Route path = '/' element = {<Home />} />
      <Route path = '/favorite' element = {<Favorite />} />
      <Route path="/movie/:id" element={<MovieInfo />} />
    </Routes>
    </main>
    </MovieProvider>
  );
}
export default App;
