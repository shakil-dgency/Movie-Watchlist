const API_KEY = "111715d49060a4eaacdb87df751374cd"; // Replace with your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";


//fetch movie for home page
export const fetchPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  return res.json();
};


//fetch movie for search action...
export const fetchSearchData = async (query)=>{
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search movie");
  return res.json()
}


//fetch movie by id
export const fetchMovieById = async (id)=>{
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json()
}