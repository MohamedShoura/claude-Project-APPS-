import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaClock, FaShare, FaThumbsDown, FaFlag } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import VideoCard from '../components/VideoCard';
import { videos as allVideos } from '../data/videos';
import './Watch.css';

export default function Watch() {
  const { id } = useParams();
  const { addToHistory, liked, toggleLike, watchLater, toggleWatchLater } = useApp();
  const [showDesc, setShowDesc] = useState(false);

  const video = allVideos.find(v => v.id === id);
  const related = allVideos.filter(v => v.id !== id && v.category === video?.category).slice(0, 8);

  useEffect(() => {
    if (video) addToHistory(video.id);
    window.scrollTo(0, 0);
  }, [id]);

  if (!video) return (
    <div className="watch-notfound">
      <div>🎬</div>
      <h2>Video not found</h2>
      <Link to="/">Go Home</Link>
    </div>
  );

  const isLiked = liked.includes(video.id);
  const isSaved = watchLater.includes(video.id);

  return (
    <div className="watch-page">
      <div className="watch-main">
        <div className="video-player">
          <div className="video-placeholder">
            <img src={video.thumbnail} alt={video.title} className="video-thumb-bg" />
            <div className="play-btn-big">▶</div>
            <div className="player-overlay">
              <div className="player-info">
                <span>{video.channelAvatar} Preview Mode</span>
                <span className="player-duration">{video.duration}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="watch-info">
          <h1 className="watch-title">{video.title}</h1>
          <div className="watch-meta">
            <span className="watch-views">{video.views} views</span>
            <div className="watch-actions">
              <button
                className={`watch-btn ${isLiked ? 'active' : ''}`}
                onClick={() => toggleLike(video.id)}
              >
                <FaHeart /> <span>{video.likes}</span>
              </button>
              <button className="watch-btn">
                <FaThumbsDown />
              </button>
              <button className="watch-btn">
                <FaShare /> Share
              </button>
              <button
                className={`watch-btn ${isSaved ? 'active' : ''}`}
                onClick={() => toggleWatchLater(video.id)}
              >
                <FaClock /> {isSaved ? 'Saved' : 'Save'}
              </button>
              <button className="watch-btn">
                <FaFlag />
              </button>
            </div>
          </div>

          <div className="watch-channel">
            <div className="channel-big-avatar">{video.channelAvatar}</div>
            <div>
              <p className="channel-name">{video.channel}</p>
              <p className="channel-sub">Kids Channel</p>
            </div>
            <button className="subscribe-btn">Subscribe</button>
          </div>

          <div className="watch-description">
            <p className={`desc-text ${showDesc ? 'expanded' : ''}`}>{video.description}</p>
            <button className="show-more" onClick={() => setShowDesc(!showDesc)}>
              {showDesc ? 'Show less' : 'Show more'}
            </button>
          </div>

          <div className="watch-tags">
            {video.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        </div>

        <div className="comments-section">
          <h3>💬 Comments</h3>
          <div className="comment-placeholder">
            <div className="comment">
              <span className="comment-avatar">😊</span>
              <div>
                <strong>KidFan123</strong>
                <p>This is so cool! I love this video! 🎉</p>
              </div>
            </div>
            <div className="comment">
              <span className="comment-avatar">🎮</span>
              <div>
                <strong>GamerKid99</strong>
                <p>Can you make more videos like this? 🙏</p>
              </div>
            </div>
            <div className="comment-input">
              <input type="text" placeholder="Add a comment..." />
              <button>Post</button>
            </div>
          </div>
        </div>
      </div>

      <aside className="watch-sidebar">
        <h3 className="related-title">Related Videos</h3>
        <div className="related-list">
          {related.map(v => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </aside>
    </div>
  );
}
