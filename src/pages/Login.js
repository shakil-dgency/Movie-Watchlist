import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import ButtonMagnito from "../components/animation/ButtonMagnito";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-semibold">Log In</h2>
        {error && <p className="mb-2 text-red-500">{error}</p>}
        <input
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <ButtonMagnito>

          <button className="magneto bg-[#F72012] w-full p-2 rounded font-bold">
            <span className="text">Log In</span>
          </button>
        </ButtonMagnito>
      </form>
    </div>
  );
};

export default Login;