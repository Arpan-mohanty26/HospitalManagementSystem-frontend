import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const updateAuthState = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  useEffect(() => {
    updateAuthState();

    window.addEventListener("storage", updateAuthState);

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("storage", updateAuthState);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    updateAuthState();
    alert("Logged out successfully!");
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="nav-title">CodingSpoonSpecial HMS</h1>
      </div>
      <div className="nav-right">
        <Link to="/" className="nav-link">Home</Link>
        {isLoggedIn ? (
          isSmallScreen ? (
            <button onClick={toggleDropdown} className="dropdown-toggle">Menu</button>
          ) : (
            <>
              <Link to="/add-hospital" className="nav-btn">Add Hospital</Link>
              <button onClick={handleLogout} className="nav-btn">Logout</button>
            </>
          )
        ) : (
          isSmallScreen ? (
            <button onClick={toggleDropdown} className="dropdown-toggle">Menu</button>
          ) : (
            <>
              <Link to="/signup" className="nav-btn">Signup</Link>
              <Link to="/login" className="nav-btn">Login</Link>
            </>
          )
        )}
        {showDropdown && isLoggedIn && (
          <div className="dropdown-menu show">
            <Link to="/add-hospital" className="dropdown-item1">Add Hospital</Link>
            <button onClick={handleLogout} className="dropdown-item2">Logout</button>
          </div>
        )}
        {showDropdown && !isLoggedIn && (
          <div className="dropdown-menu show">
            <Link to="/signup" className="dropdown-item3">Signup</Link>
            <Link to="/login" className="dropdown-item4">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
