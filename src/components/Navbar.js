import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className="sticky top-0 z-50 backdrop-blur-md transition-all duration-300"
      style={{ 
        backgroundColor: scrolled 
          ? 'rgba(0, 0, 0, 0.40)'   
          : 'rgba(0, 0, 0, 0.85)',   
        borderBottom: scrolled
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* Logo */}
          <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer group">
             <div className="text-3xl">
              🎓
            </div>
            <div>
              <h2 className="font-bold text-white text-base">Campusly</h2>
              <p className="text-xs text-white/80">Your Education Partner</p>
            </div>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex gap-5 items-center">
            <Link to="/" className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition text-sm">
              Home
            </Link>
            <Link to="/compare" className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition text-sm">
              Compare
            </Link>
            <Link to="/admin" className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition text-sm">
              Admin
            </Link>
          </div>

          {/* Buttons */}
          {!isLoggedIn ? (
            <div className="flex gap-2">
              <Link 
                to="/login" 
                className="px-4 py-1.5 text-white/90 border border-white/30 rounded-lg text-sm font-medium hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg text-sm font-medium hover:bg-white/30 hover:scale-105 transition-all duration-300"
              >
                Register
              </Link>
            </div>
          ) : (
            <button className="px-4 py-1.5 bg-red-500/20 text-red-300 border border-red-500/50 rounded-lg text-sm hover:bg-red-500/30 transition">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;