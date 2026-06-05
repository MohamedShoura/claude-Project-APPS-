import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes, FaBell, FaBars } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar({ onMenuToggle }) {
  const { searchQuery, setSearchQuery, currentProfile } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuToggle}>
          <FaBars />
        </button>
        <Link to="/" className="logo">
          <span className="logo-yt">You</span>
          <span className="logo-tube">Tube</span>
          <span className="logo-kids"> Kids</span>
        </Link>
      </div>

      <div className={`search-bar ${searchOpen ? 'open' : ''}`}>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for videos..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <FaSearch />
          </button>
          {searchQuery && (
            <button type="button" className="clear-btn" onClick={() => setSearchQuery('')}>
              <FaTimes />
            </button>
          )}
        </form>
      </div>

      <div className="navbar-right">
        <button className="icon-btn mobile-search" onClick={() => setSearchOpen(!searchOpen)}>
          {searchOpen ? <FaTimes /> : <FaSearch />}
        </button>
        <button className="icon-btn">
          <FaBell />
          <span className="badge">3</span>
        </button>
        <Link to="/profile" className="profile-avatar" style={{ background: currentProfile.color }}>
          {currentProfile.avatar}
        </Link>
      </div>
    </nav>
  );
}
