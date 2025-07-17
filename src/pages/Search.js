import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Loader from "../components/animation/Loader";
import { fetchSearchData } from "../services/tmdb";

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      setLoading(true);
      setError("");

      try {
        const searchData = await fetchSearchData(query)

        console.log(searchData);
        
        setResults(searchData.results || []);
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className=" min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-8 text-blue-400">🔎 Search Results for: <span className="italic">{query}</span></h1>

      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && results.length === 0 && <p>No movies found.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {results.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;