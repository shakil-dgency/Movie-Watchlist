import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../services/firebase";
import Loader from "../components/animation/Loader";
import { motion } from "framer-motion";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch movies from firebase
  const fetchWatchlist = async () => {
    const start = Date.now();
    if (!user) return;
    setLoading(true);
    const q = query(
      collection(db, "watchlists"),
      where("userId", "==", user.uid)

    );

    console.log(q);

    const querySnapshot = await getDocs(q);

    console.log(querySnapshot);


    const movies = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setWatchlist(movies);
    setLoading(false);
    const end = Date.now();
    console.log(`Watchlist loaded in ${end - start}ms`);
  };

  //delete from firebase

  const removeFromWatchlist = async (movieDocId) => {

    const updatedList = watchlist.filter((movie) => movie.id !== movieDocId)
    setWatchlist(updatedList)


    await deleteDoc(doc(db, "watchlists", movieDocId));


  };

  useEffect(() => {
    fetchWatchlist();
  }, [user]);

  if (!user) return <p className="p-6 text-white">Please log in to view your watchlist.</p>;
  if (loading) return <div className="">
    <Loader />
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1.2, repeatType: "reverse" }}
      className="text-white text-lg mt-4 text-center"
    >
      Please wait. It can take some time...
    </motion.p>
  </div>

  return (
    <div className=" min-h-screen text-white">
      <h1 className="text-2xl font-bold text-blue-400 mb-6">🎞️ My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>No movies in your watchlist.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded shadow hover:shadow-lg ">
              <div className="overflow-hidden ">

                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                  alt={movie.title}
                  className="rounded-t h-[350px] w-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-3">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-400">Year: {movie.year}</p>
                <Link
                  to={`/movie/${movie.movieId}`}
                  className="text-blue-400 hover:underline text-sm block mt-1"
                >
                  View Details →
                </Link>
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="mt-3 w-full bg-red-600 hover:bg-red-700 text-sm py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;