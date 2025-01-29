// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../App"; // Import from App.js
// import { BASE_URL } from "../config";
// import { toast } from "react-toastify";

// const LoginPage = () => {
//   const { login } = useAuth(); // Use the login method from context
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/auth/login`,
//         {
//           username,
//           password,
//         }
//       );


//       // Use the login method from context
//       login(response.data.results.token.access.token);
//       toast.success("Login erfolgreich");
//       navigate("/");
//     } catch (error) {
//       setError(error.response?.data?.message || "Fehler beim Login");
//     }
//   };

//   return (
//     <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-[#001E3C] via-[#0A2540] to-[#12263F] text-white overflow-hidden">
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 opacity-30 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-32 right-16 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-2xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-20 left-24 w-80 h-80 bg-blue-800 opacity-25 rounded-full blur-3xl animate-pulse delay-2000"></div>
//       </div>

//       <div className="relative z-10 max-w-md w-full bg-white/10 p-8 rounded-lg shadow-2xl border border-white/20 backdrop-blur-md">
//         <div className="flex items-center justify-center mb-8">
//           <img src="/assets/carlano.svg" alt="Carlano Logo" className="h-16" />
//         </div>

//         <h1 className="text-3xl font-extrabold text-center">Willkommen</h1>
//         <p className="mt-2 text-center text-gray-300">
//           Bitte melden Sie sich an, um fortzufahren
//         </p>

//         {error && <p className="text-red-500 text-center mt-4">{error}</p>}

//         <form onSubmit={handleLogin} className="mt-8">
//           <div className="mb-6">
//             <input
//               type="text"
//               placeholder="Benutzername"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#175FFF] focus:outline-none"
//             />
//           </div>
//           <div className="mb-6">
//             <input
//               type="password"
//               placeholder="Passwort"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#175FFF] focus:outline-none"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-[#175FFF] rounded-lg text-white font-semibold hover:bg-blue-700 transition-all"
//           >
//             Anmelden
//           </button>
//         </form>

//         <div className="mt-8 flex justify-center items-center space-x-2">
//           <p className="text-gray-400">Powered by</p>
//           <img src="/assets/smatik.svg" alt="Smatik Logo" className="h-6" />
//         </div>

//         <p className="mt-6 text-center text-gray-400 text-sm">
//           © 2025 Smatik Group - Alle Rechte vorbehalten.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App"; // Import from App.js
import { BASE_URL } from "../config";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { login } = useAuth(); // Use the login method from context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        { username, password }
      );

      // Use the login method from context
      login(response.data.results.token.access.token);
      toast.success("Login erfolgreich");
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Fehler beim Login");
    } finally {
      setLoading(false); // Reset loading state in finally block
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-[#001E3C] via-[#0A2540] to-[#12263F] text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-24 w-80 h-80 bg-blue-800 opacity-25 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-md w-full bg-white/10 p-8 rounded-lg shadow-2xl border border-white/20 backdrop-blur-md">
        <div className="flex items-center justify-center mb-8">
          <img src="/assets/carlano.svg" alt="Carlano Logo" className="h-16" />
        </div>

        <h1 className="text-3xl font-extrabold text-center">Willkommen</h1>
        <p className="mt-2 text-center text-gray-300">
          Bitte melden Sie sich an, um fortzufahren
        </p>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form onSubmit={handleLogin} className="mt-8">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Benutzername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#175FFF] focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#175FFF] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button if loading is true
            className={`w-full py-3 rounded-lg text-white font-semibold ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#175FFF] hover:bg-blue-700 transition-all'}`}
          >
            {loading ? "Wird angemeldet..." : "Anmelden"} {/* Change button text when loading */}
          </button>
        </form>

        <div className="mt-8 flex justify-center items-center space-x-2">
          <p className="text-gray-400">Powered by</p>
          <img src="/assets/smatik.svg" alt="Smatik Logo" className="h-6" />
        </div>

        <p className="mt-6 text-center text-gray-400 text-sm">
          © 2025 Smatik Group - Alle Rechte vorbehalten.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;