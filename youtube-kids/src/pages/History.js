import React from 'react';
import { Link } from 'react-router-dom';
import { FaHistory, FaTrash } from 'react-icons/fa';
import VideoCard from '../components/VideoCard';
import { useApp } from '../context/AppContext';
import { videos as allVideos } from '../data/videos';
import './PageLayout.css';

export default function History() {
  const { watchHistory, addToHistory } = useApp();

  const historyVideos = watchHistory
    .map(id => allVideos.find(v => v.id === id))
    .filter(Boolean);

  return (
    <div className="page-layout">
      <div className="page-header">
        <FaHistory className="page-icon" style={{ color: '#282828' }} />
        <div>
          <h1>Watch History</h1>
          <p>{historyVideos.length} videos watched</p>
        </div>
      </div>
      {historyVideos.length === 0 ? (
        <div className="empty-state">
          <span className="emoji">📺</span>
          <h3>No history yet</h3>
          <p>Videos you watch will appear here</p>
          <Link to="/">Explore Videos</Link>
        </div>
      ) : (
        <div className="video-grid">
          {historyVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
