import React from "react";
import Search from "./components/Search";
import { useEffect } from "react";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use"; 
import { updateSearchCount,getTrendingMovies } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
//     --url 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' \


const App = () => {
  const [searchItem, setSearchItem] = React.useState('');
  const [error, setError] = React.useState("");
  const [movieList, setMovieList] = React.useState([]);
  const [trendingMovies, setTrendingMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [debounceSearchItem, setDebounceSearchItem] = React.useState('');

  useDebounce(()=>setDebounceSearchItem(searchItem), 500, [searchItem]);


  const fetchMovies = async (query='') => {
    const API_URL = query?
    `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
    `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`


    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!data) {
        setError("No data found");
        setMovieList([]);
        return;
      }
      setMovieList(data.results);
      console.log(data);

      if(query&&data.results.length>0){
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies(debounceSearchItem);
  }, [debounceSearchItem]);
  useEffect(() => {
    loadTrendingMovies();
  }, []);


  const loadTrendingMovies = async () => {
    try{
      console.log(trendingMovies);
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
      console.log('this is movie list ');
      console.log(trendingMovies);
    }catch(error){
      console.error("Error loading trending movies:", error);
    }
  }



  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="" /> {/* Changed from "/hero-img.png" to "./hero-img.png" */}
          <h1>
            Find <span className="text-gradient">Movies</span> Where You'll
            Enjoy the Hassle
          </h1>
          <Search searchItem={searchItem} setSearchItem={setSearchItem} />
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {
                trendingMovies.map((movie,index) => (
                  <li key={movie.$id}>
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))
              }
            </ul>
            </section>
        )}


        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                // <p key={movie.id} className="text-white">
                //   {movie.title}
                // </p>
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
