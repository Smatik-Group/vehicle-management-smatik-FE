import React, { createContext, useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Personenwagen from "./pages/Personenwagen";
import Login from "./pages/LoginPage";
import Home from "./pages/Home";
import Wohnmobile from "./pages/Wohnmobile";
import Nutzfahrzeuge from "./pages/Nutzfahrzeuge";
import Einstellungen from "./pages/Einstellungen";

// Create an AuthContext to manage authentication state
const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // Log current authentication state
  useEffect(() => {
    console.log("Checked token: ", token); // Log token for debugging
    setIsAuthenticated(!!token);
  }, [token]); // Listen to changes on token

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ProtectedRoute Component
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated: ", isAuthenticated); // Log state for debugging

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <MainContent />
      </Router>
    </AuthProvider>
  );
};

const MainContent = () => {
  const location = useLocation();
  const hideSidebarPaths = ["/login"];

  return (
    <div className="flex">
      {!hideSidebarPaths.includes(location.pathname) && <Sidebar />}
      <div className="flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/personenwagen"
            element={<ProtectedRoute element={<Personenwagen />} />}
          />
          <Route
            path="/wohnmobile"
            element={<ProtectedRoute element={<Wohnmobile />} />}
          />
          <Route
            path="/nutzfahrzeuge"
            element={<ProtectedRoute element={<Nutzfahrzeuge />} />}
          />
          <Route
            path="/einstellungen"
            element={<ProtectedRoute element={<Einstellungen />} />}
          />
          <Route path="*" element={<h1>Seite nicht gefunden</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
export { useAuth }; // Export the useAuth hook
