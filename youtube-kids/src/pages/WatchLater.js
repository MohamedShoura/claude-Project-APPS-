import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
import VideoCard from '../components/VideoCard';
import { useApp } from '../context/AppContext';
import { videos as allVideos } from '../data/videos';
import './PageLayout.css';

export default function WatchLater() {
  const { watchLater } = useApp();
  const savedVideos = watchLater.map(id => allVideos.find(v => v.id === id)).filter(Boolean);

  return (
    <div className="page-layout">
      <div className="page-header">
        <FaClock className="page-icon" style={{ color: '#065FD4' }} />
        <div>
          <h1>Watch Later</h1>
          <p>{savedVideos.length} saved videos</p>
        </div>
      </div>
      {savedVideos.length === 0 ? (
        <div className="empty-state">
          <span className="emoji">🕐</span>
          <h3>Nothing saved yet</h3>
          <p>Save videos to watch them later</p>
          <Link to="/">Browse Videos</Link>
        </div>
      ) : (
        <div className="video-grid">
          {savedVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
