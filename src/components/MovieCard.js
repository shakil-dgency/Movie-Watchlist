import { Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";

const MovieCard = ({ movie }) => {

  return (
    <div key={movie.id} className="bg-gray-800 rounded shadow-md hover:shadow-lg transition ">
      <div className="overflow-hidden rounded">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-t h-[auto] w-auto object-cover hover:scale-105 transition-transform duration-700 "
        />
      </div>
      <div className="p-3">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-400">Year: {movie.release_date?.split("-")[0]}</p>
        <div className="flex">

          <Link
            to={`/movie/${movie.id}`}
            className=" group inline-block mt-2 text-blue-500 text-sm flex items-center gap-1"
          >
            View Details <HiArrowNarrowRight className="text-[17px] mt-[1px] group-hover:translate-x-[4px] duration-300" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MovieCard