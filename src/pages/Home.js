import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../services/tmdb";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Loader from "../components/animation/Loader";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchPopularMovies();

        console.log(data);
        
        setMovies(data.results);
      } catch (err) {
        setError("Error fetching movies.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className=" min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">🔥 Popular Movies</h1>

      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;