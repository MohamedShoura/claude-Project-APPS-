import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaPlus, FaPlay } from 'react-icons/fa';
import { playlists } from '../data/videos';
import { videos as allVideos } from '../data/videos';
import './Playlists.css';

export default function Playlists() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    const playlist = playlists.find(p => p.id === selected);
    const vids = playlist.videos.map(id => allVideos.find(v => v.id === id)).filter(Boolean);
    return (
      <div className="page-layout">
        <button className="back-btn" onClick={() => setSelected(null)}>← Back to Playlists</button>
        <div className="page-header">
          <span style={{ fontSize: 40 }}>{playlist.emoji}</span>
          <div>
            <h1>{playlist.title}</h1>
            <p>{vids.length} videos</p>
          </div>
        </div>
        <div className="video-grid">
          {vids.map(video => (
            <div key={video.id} className="video-card-wrap">
              <Link to={`/watch/${video.id}`} className="thumbnail-wrap" style={{ display:'block', borderRadius:12, overflow:'hidden', aspectRatio:'16/9', background:'#e0e0e0' }}>
                <img src={video.thumbnail} alt={video.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </Link>
              <div style={{ padding: '8px 4px' }}>
                <Link to={`/watch/${video.id}`} style={{ fontWeight:600, color:'#282828', textDecoration:'none', fontSize:14 }}>{video.title}</Link>
                <p style={{ fontSize:12, color:'#606060', margin:'4px 0 0' }}>{video.channel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <div className="page-header">
        <FaStar className="page-icon" style={{ color: '#FFB800' }} />
        <div>
          <h1>Playlists</h1>
          <p>{playlists.length} playlists</p>
        </div>
      </div>
      <div className="playlist-grid">
        {playlists.map(playlist => {
          const firstVideo = allVideos.find(v => v.id === playlist.videos[0]);
          return (
            <div key={playlist.id} className="playlist-card" onClick={() => setSelected(playlist.id)}>
              <div className="playlist-thumb">
                {firstVideo && <img src={firstVideo.thumbnail} alt={playlist.title} />}
                <div className="playlist-count">
                  <FaPlay /> {playlist.videos.length} videos
                </div>
              </div>
              <div className="playlist-info">
                <span className="playlist-emoji">{playlist.emoji}</span>
                <div>
                  <h3>{playlist.title}</h3>
                  <p>{playlist.videos.length} videos</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="playlist-card add-playlist">
          <div className="add-icon"><FaPlus /></div>
          <p>Create Playlist</p>
        </div>
      </div>
    </div>
  );
}
