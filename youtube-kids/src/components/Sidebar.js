import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaFire, FaHistory, FaClock, FaHeart, FaStar, FaSearch } from 'react-icons/fa';
import './Sidebar.css';

const navItems = [
  { to: '/', icon: <FaHome />, label: 'Home', exact: true },
  { to: '/trending', icon: <FaFire />, label: 'Trending' },
  { to: '/search', icon: <FaSearch />, label: 'Search' },
  { to: '/history', icon: <FaHistory />, label: 'History' },
  { to: '/watch-later', icon: <FaClock />, label: 'Watch Later' },
  { to: '/liked', icon: <FaHeart />, label: 'Liked Videos' },
  { to: '/playlists', icon: <FaStar />, label: 'Playlists' },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>YouTube Kids Clone</p>
          <p>Made with ❤️</p>
        </div>
      </aside>
    </>
  );
}
