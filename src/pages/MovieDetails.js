import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getDoc,onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import Loader from "../components/animation/Loader";
import { fetchMovieById } from "../services/tmdb";


const MovieDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [movie, setMovie] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = async () => {
    
   const data = await fetchMovieById(id)

   console.log(data);
   
    setMovie(data);
    setLoading(false);
  };

  const checkWatchlist = async () => {
    if (!user) return;
    const docRef = doc(db, "watchlists", `${user.uid}_${id}`);
    // const docSnap = await getDoc(docRef);
    onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
            setIsInWatchlist(true);
        } else {
          setIsInWatchlist(false);
        }
      });
    
  };

  const addToWatchlist = async () => {
    if (!user) return;
    const docRef = doc(db, "watchlists", `${user.uid}_${id}`);
    await setDoc(docRef, {
      userId: user.uid,
      movieId: id,
      title: movie.title,
      poster: movie.poster_path,
      year: movie.release_date?.split("-")[0],
    });
    setIsInWatchlist(true);
  };

  const removeFromWatchlist = async () => {
    const docRef = doc(db, "watchlists", `${user.uid}_${id}`);
    await deleteDoc(docRef);
    setIsInWatchlist(false);
  };

  useEffect(() => {
    fetchMovieDetails();
    if (user) checkWatchlist();
  }, [id, user,isInWatchlist]);

  if (loading) return <Loader />;
  if (!movie) return <div className="text-white p-6">Movie not found</div>;

  return (
    <div className=" text-white min-h-screen p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded w-full max-w-sm object-cover"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-blue-400">{movie.title}</h1>
          <p className="text-sm text-gray-400 mb-2">Release: {movie.release_date}</p>
          <p className="mb-4">{movie.overview}</p>

          <p><span className="font-semibold">Genres:</span> {movie.genres.map(g => g.name).join(", ")}</p>
          <p><span className="font-semibold">Rating:</span> {movie.vote_average}/10</p>

          {user && (
            <div className="mt-6">
              {isInWatchlist ? (
                <button
                  onClick={removeFromWatchlist}
                  className="bg-red-600 hover:bg-red-700 duration-300  px-4 py-2 rounded"
                >
                  Remove from Watchlist
                </button>
              ) : (
                <button
                  onClick={addToWatchlist}
                  className="bg-green-600 hover:bg-green-700 duration-300 px-4 py-2 rounded"
                >
                  + Add to Watchlist
                </button>
              )}
            </div>
          )}

          {!user && (
            <p className="mt-4 text-yellow-400">Login to add to your watchlist</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;