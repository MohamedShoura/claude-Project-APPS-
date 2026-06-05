import React from 'react';
import CategoryBar from '../components/CategoryBar';
import VideoCard from '../components/VideoCard';
import { useApp } from '../context/AppContext';
import './Home.css';

export default function Home() {
  const { getFilteredVideos, searchQuery, activeCategory } = useApp();
  const videos = getFilteredVideos();

  return (
    <div className="home">
      <CategoryBar />
      <div className="home-content">
        {searchQuery && (
          <div className="search-header">
            <h2>Results for "<strong>{searchQuery}</strong>"</h2>
            <p>{videos.length} videos found</p>
          </div>
        )}
        {!searchQuery && activeCategory === 'all' && (
          <div className="hero-banner">
            <div className="hero-text">
              <h1>🎉 Welcome to <span>YouTube Kids!</span></h1>
              <p>Discover fun, safe videos for kids. Learn, laugh, and explore!</p>
            </div>
            <div className="hero-emoji">🌟</div>
          </div>
        )}
        {videos.length === 0 ? (
          <div className="no-results">
            <div className="no-results-emoji">🔍</div>
            <h3>No videos found</h3>
            <p>Try a different search or category!</p>
          </div>
        ) : (
          <div className="video-grid">
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
