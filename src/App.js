import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import SmoothScroll from "./components/animation/SmoothScroll";

function App() {
  return (
    <>
      <SmoothScroll />
      <Router>
        <Navbar />
        <div className="max-w-[1600px] mx-auto px-[40px] pb-10 pt-[200px] ">

          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/watchlist" element={<PrivateRoute><Watchlist /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
