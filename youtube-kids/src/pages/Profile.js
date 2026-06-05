import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Profile.css';

const AVATARS = ['😊', '🎮', '🦁', '🐼', '🦄', '🐶', '🐱', '🦊', '🐸', '🐙', '🦋', '🐯'];
const COLORS = ['#FF0000', '#065FD4', '#00C851', '#FF6B35', '#9C27B0', '#FF9800', '#00BCD4', '#E91E63'];

export default function Profile() {
  const { currentProfile, setCurrentProfile, profiles, setProfiles } = useApp();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...currentProfile });

  const save = () => {
    setCurrentProfile(draft);
    setProfiles(prev => prev.map(p => p.id === draft.id ? draft : p));
    setEditing(false);
  };

  const switchProfile = (profile) => {
    setCurrentProfile(profile);
    setDraft({ ...profile });
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-hero" style={{ background: currentProfile.color }}>
          <div className="profile-big-avatar">{currentProfile.avatar}</div>
          <h2>{currentProfile.name}</h2>
          <p>Kids Account</p>
        </div>

        <div className="profile-body">
          {editing ? (
            <div className="edit-form">
              <h3>Edit Profile</h3>
              <label>Name
                <input
                  value={draft.name}
                  onChange={e => setDraft({ ...draft, name: e.target.value })}
                  maxLength={20}
                />
              </label>
              <label>Avatar
                <div className="avatar-grid">
                  {AVATARS.map(a => (
                    <button
                      key={a}
                      className={`avatar-option ${draft.avatar === a ? 'selected' : ''}`}
                      onClick={() => setDraft({ ...draft, avatar: a })}
                    >{a}</button>
                  ))}
                </div>
              </label>
              <label>Color
                <div className="color-grid">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      className={`color-option ${draft.color === c ? 'selected' : ''}`}
                      style={{ background: c }}
                      onClick={() => setDraft({ ...draft, color: c })}
                    />
                  ))}
                </div>
              </label>
              <div className="edit-btns">
                <button className="btn-save" onClick={save}>Save</button>
                <button className="btn-cancel" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <button className="edit-profile-btn" onClick={() => { setDraft({ ...currentProfile }); setEditing(true); }}>
                ✏️ Edit Profile
              </button>
              <h3>Switch Profile</h3>
              <div className="profiles-list">
                {profiles.map(p => (
                  <div
                    key={p.id}
                    className={`profile-item ${currentProfile.id === p.id ? 'active' : ''}`}
                    onClick={() => switchProfile(p)}
                  >
                    <div className="mini-avatar" style={{ background: p.color }}>{p.avatar}</div>
                    <span>{p.name}</span>
                    {currentProfile.id === p.id && <span className="check">✓</span>}
                  </div>
                ))}
              </div>

              <div className="profile-stats">
                <h3>Activity</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-emoji">📺</span>
                    <strong>Watch History</strong>
                    <p>Track videos you've watched</p>
                  </div>
                  <div className="stat-card">
                    <span className="stat-emoji">❤️</span>
                    <strong>Liked Videos</strong>
                    <p>Your favorite videos</p>
                  </div>
                  <div className="stat-card">
                    <span className="stat-emoji">🕐</span>
                    <strong>Watch Later</strong>
                    <p>Saved for later</p>
                  </div>
                  <div className="stat-card">
                    <span className="stat-emoji">⭐</span>
                    <strong>Playlists</strong>
                    <p>Your collections</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
