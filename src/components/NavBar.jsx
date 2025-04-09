import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          SG
        </Link>
        <div className="navbar-links">
          <Link to="/about" className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
            About
          </Link>
          <Link to="/experience" className={`nav-item ${location.pathname === '/experience' ? 'active' : ''}`}>
            Experience
          </Link>
          <Link to="/projects" className={`nav-item ${location.pathname === '/projects' ? 'active' : ''}`}>
            Projects
          </Link>
          <Link to="/contact" className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;