import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // optional: install if you want icons

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const teacher = localStorage.getItem("teacher");
    setIsLoggedIn(!!teacher);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Teachz</h1>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-4">
        <Link to="/" className="text-blue-600">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="text-blue-600">Dashboard</Link>
            <button onClick={handleLogout} className="text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600">Login</Link>
            <Link to="/signup" className="text-green-600">Sign Up</Link>
          </>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2 md:hidden z-50">
          <Link to="/" className="text-blue-600" onClick={() => setMenuOpen(false)}>Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-blue-600" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-red-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="text-green-600" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
