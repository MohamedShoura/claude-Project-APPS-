import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import VideoCard from '../components/VideoCard';
import { useApp } from '../context/AppContext';
import { videos as allVideos } from '../data/videos';
import './PageLayout.css';

export default function Liked() {
  const { liked } = useApp();
  const likedVideos = liked.map(id => allVideos.find(v => v.id === id)).filter(Boolean);

  return (
    <div className="page-layout">
      <div className="page-header">
        <FaHeart className="page-icon" style={{ color: '#FF0000' }} />
        <div>
          <h1>Liked Videos</h1>
          <p>{likedVideos.length} liked videos</p>
        </div>
      </div>
      {likedVideos.length === 0 ? (
        <div className="empty-state">
          <span className="emoji">❤️</span>
          <h3>No liked videos</h3>
          <p>Heart videos you love to find them here</p>
          <Link to="/">Discover Videos</Link>
        </div>
      ) : (
        <div className="video-grid">
          {likedVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
