import React from 'react';
import { FaFire } from 'react-icons/fa';
import VideoCard from '../components/VideoCard';
import { videos } from '../data/videos';
import './PageLayout.css';

const trending = [...videos].sort((a, b) => {
  const parse = v => parseFloat(v.replace(/[^\d.]/g, '')) * (v.includes('B') ? 1e9 : v.includes('M') ? 1e6 : v.includes('K') ? 1e3 : 1);
  return parse(b.views) - parse(a.views);
});

export default function Trending() {
  return (
    <div className="page-layout">
      <div className="page-header trending-header">
        <FaFire className="page-icon" />
        <div>
          <h1>Trending</h1>
          <p>Most watched videos right now</p>
        </div>
      </div>
      <div className="video-grid">
        {trending.map((video, i) => (
          <div key={video.id} className="trending-item">
            <div className="trending-rank">#{i + 1}</div>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </div>
  );
}
