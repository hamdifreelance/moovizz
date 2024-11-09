import {useEffect, useState} from 'react';

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
//http://omdbapi.com/apikey.aspx: movie api 

const API_URL = 'https://www.omdbapi.com?apikey=ac03e675';
const movie = {
    "Title": "Training Day",
    "Year": "2001",
    "imdbID": "tt0139654",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjRlNjUwOGYtNGQxZS00ZjhkLTg0NDgtYjcwNzZlNDU2YjBlXkEyXkFqcGc@._V1_SX300.jpg"
};

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // async means it takes some time to search movies
    // a function
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);  // `` is a template string 
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('Training Day');
    }, []); // [] if we only want to call it (the hook) at the start

    return (
        <div className="app">
            <h1>Moovizz</h1>

            <div className="search">
                <input
                  placeholder="Search for movies"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <img 
                  src={SearchIcon}
                  alt="search"
                  onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )}

            
        </div>
    );
}

export default App;