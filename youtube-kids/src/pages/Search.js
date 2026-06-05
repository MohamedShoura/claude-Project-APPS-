import React from 'react';
import { FaSearch } from 'react-icons/fa';
import VideoCard from '../components/VideoCard';
import { useApp } from '../context/AppContext';
import './PageLayout.css';

const SUGGESTIONS = ['Baby Shark', 'Peppa Pig', 'Minecraft', 'Animals', 'Songs', 'Science', 'Crafts', 'Dinosaurs'];

export default function Search() {
  const { searchQuery, setSearchQuery, getFilteredVideos } = useApp();
  const results = searchQuery ? getFilteredVideos() : [];

  return (
    <div className="page-layout">
      <div className="page-header">
        <FaSearch className="page-icon" style={{ color: '#282828' }} />
        <div>
          <h1>Search</h1>
          <p>Find your favorite videos</p>
        </div>
      </div>

      {!searchQuery && (
        <div>
          <h3 style={{ fontSize:16, fontWeight:700, color:'#282828', marginBottom:12 }}>Popular Searches</h3>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:32 }}>
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => setSearchQuery(s)}
                style={{
                  padding: '10px 20px',
                  background: '#f2f2f2',
                  border: 'none',
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseOver={e => e.target.style.background='#e0e0e0'}
                onMouseOut={e => e.target.style.background='#f2f2f2'}
              >
                🔍 {s}
              </button>
            ))}
          </div>
          <div className="empty-state">
            <span className="emoji">🎯</span>
            <h3>Search for something!</h3>
            <p>Type in the search bar above to find videos</p>
          </div>
        </div>
      )}

      {searchQuery && results.length === 0 && (
        <div className="empty-state">
          <span className="emoji">😕</span>
          <h3>No results for "{searchQuery}"</h3>
          <p>Try different keywords or browse categories</p>
          <button className="cta-btn" onClick={() => setSearchQuery('')}>Clear Search</button>
        </div>
      )}

      {searchQuery && results.length > 0 && (
        <>
          <p style={{ marginBottom:20, color:'#606060', fontSize:14 }}>
            {results.length} results for "<strong>{searchQuery}</strong>"
          </p>
          <div className="video-grid">
            {results.map(video => <VideoCard key={video.id} video={video} />)}
          </div>
        </>
      )}
    </div>
  );
}
