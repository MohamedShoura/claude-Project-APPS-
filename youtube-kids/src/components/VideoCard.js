import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaHeart, FaEllipsisV, FaListUl } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import './VideoCard.css';

export default function VideoCard({ video }) {
  const { liked, toggleLike, watchLater, toggleWatchLater } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLiked = liked.includes(video.id);
  const isWatchLater = watchLater.includes(video.id);

  return (
    <div className="video-card">
      <Link to={`/watch/${video.id}`} className="thumbnail-wrap">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="thumbnail"
          loading="lazy"
        />
        <span className="duration">{video.duration}</span>
        <div className="play-overlay">▶</div>
      </Link>

      <div className="card-info">
        <div className="channel-avatar">{video.channelAvatar}</div>
        <div className="card-details">
          <Link to={`/watch/${video.id}`} className="card-title">{video.title}</Link>
          <div className="card-meta">
            <span className="card-channel">{video.channel}</span>
            <span className="card-views">{video.views} views</span>
          </div>
        </div>
        <div className="card-actions">
          <button
            className={`action-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => toggleLike(video.id)}
            title="Like"
          >
            <FaHeart />
          </button>
          <button
            className={`action-btn ${isWatchLater ? 'saved' : ''}`}
            onClick={() => toggleWatchLater(video.id)}
            title="Watch Later"
          >
            <FaClock />
          </button>
          <div className="menu-wrap">
            <button className="action-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <FaEllipsisV />
            </button>
            {menuOpen && (
              <div className="dropdown-menu">
                <button onClick={() => { toggleWatchLater(video.id); setMenuOpen(false); }}>
                  <FaClock /> {isWatchLater ? 'Remove from Watch Later' : 'Save to Watch Later'}
                </button>
                <button onClick={() => { toggleLike(video.id); setMenuOpen(false); }}>
                  <FaHeart /> {isLiked ? 'Unlike' : 'Like'}
                </button>
                <button onClick={() => setMenuOpen(false)}>
                  <FaListUl /> Add to Playlist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
