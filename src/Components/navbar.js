import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const updateAuthState = () => {
        setIsLoggedIn(!!localStorage.getItem("token"));
    };

    useEffect(() => {
        updateAuthState();

        window.addEventListener("storage", updateAuthState);
        return () => {
            window.removeEventListener("storage", updateAuthState);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        updateAuthState();
        alert("Logged out successfully!");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <h1 className="nav-title">CodingSpoonSpecial HMS</h1>
            </div>
            <div className="nav-right">
                <Link to="/" className="nav-link">Home</Link>
                {isLoggedIn ? (
                    <>
                        <Link to="/add-hospital" className="nav-btn">Add Hospital</Link>
                        <button onClick={handleLogout} className="nav-btn">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className="nav-btn">Signup</Link>
                        <Link to="/login" className="nav-btn">Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
