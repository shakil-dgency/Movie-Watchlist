import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import ButtonMagnito from "./animation/ButtonMagnito";


const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [showBorder, setShowBorder] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
        setSearchTerm(""); // optional: clear after search
    };



    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setShowBorder(true);
            } else {
                setShowBorder(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    return (
        <nav className={`fixed top-0 left-0 w-full z-50 text-white ${showBorder ? "bg-[#0F0F0F]/60 backdrop-blur-md shadow-md" : ""} `}>
            <div className={` transition-all duration-300 px-6 py-4 ${showBorder ? 'border-animate' : ''
                }`}>

                <div className="max-w-[1600px] mx-auto flex justify-between items-center">

                    <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-600 h-[40px] flex items-center">
                        <img
                            src="/movielogo.png"
                            alt="this is logo"
                            className=" w-[110px] h-auto "
                        />
                    </Link>

                    {/* 🔍 Search Form */}
                    <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-1 bg-transparent outline-none border-b-[1px] border-b-[#fff]/10 text-white placeholder-gray-400"
                        />
                        <button type="submit" className="  rounded -ml-5 "> <IoSearch className="text-xl hover:rotate-[-10deg] hover:scale-105 transition-transform duration-200" /></button>
                    </form>

                    <ul className="flex gap-6 items-center">

                        {user && (
                            <li>
                                <Link to="/watchlist" className="hover:text-[#F72012] duration-500">Watchlist</Link>
                            </li>
                        )}

                        {user ? (
                            <>
                                <li className="text-sm text-gray-400 hidden sm:block">
                                    {user.email}
                                </li>
                                <li>
                                    <ButtonMagnito>

                                        <button
                                            onClick={handleLogout}
                                            className="magneto bg-[#F72012] hover:bg-red-600 px-4 py-1 rounded"
                                        >
                                            <span className="text">Logout</span>
                                        </button>
                                    </ButtonMagnito>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="hover:text-[#F72012]  py-1 rounded font-[700] duration-500">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup" className="hover:text-[#F72012]  py-1 rounded font-[700] duration-500">
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;