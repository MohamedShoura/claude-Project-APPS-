import React, { createContext, useContext, useState, useEffect } from 'react';
import { videos as allVideos } from '../data/videos';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [watchHistory, setWatchHistory] = useState(() => {
    const saved = localStorage.getItem('watchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [liked, setLiked] = useState(() => {
    const saved = localStorage.getItem('liked');
    return saved ? JSON.parse(saved) : [];
  });
  const [watchLater, setWatchLater] = useState(() => {
    const saved = localStorage.getItem('watchLater');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentProfile, setCurrentProfile] = useState(() => {
    const saved = localStorage.getItem('currentProfile');
    return saved ? JSON.parse(saved) : { name: 'Kid', avatar: '😊', color: '#FF0000' };
  });
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('profiles');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Kid', avatar: '😊', color: '#FF0000' },
      { id: '2', name: 'Junior', avatar: '🎮', color: '#065FD4' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('watchHistory', JSON.stringify(watchHistory));
  }, [watchHistory]);

  useEffect(() => {
    localStorage.setItem('liked', JSON.stringify(liked));
  }, [liked]);

  useEffect(() => {
    localStorage.setItem('watchLater', JSON.stringify(watchLater));
  }, [watchLater]);

  useEffect(() => {
    localStorage.setItem('currentProfile', JSON.stringify(currentProfile));
  }, [currentProfile]);

  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  const addToHistory = (videoId) => {
    setWatchHistory(prev => {
      const filtered = prev.filter(id => id !== videoId);
      return [videoId, ...filtered].slice(0, 50);
    });
  };

  const toggleLike = (videoId) => {
    setLiked(prev =>
      prev.includes(videoId) ? prev.filter(id => id !== videoId) : [...prev, videoId]
    );
  };

  const toggleWatchLater = (videoId) => {
    setWatchLater(prev =>
      prev.includes(videoId) ? prev.filter(id => id !== videoId) : [...prev, videoId]
    );
  };

  const getFilteredVideos = () => {
    let filtered = allVideos;
    if (activeCategory !== 'all') {
      filtered = filtered.filter(v => v.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(v =>
        v.title.toLowerCase().includes(q) ||
        v.channel.toLowerCase().includes(q) ||
        v.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return filtered;
  };

  return (
    <AppContext.Provider value={{
      watchHistory, addToHistory,
      liked, toggleLike,
      watchLater, toggleWatchLater,
      searchQuery, setSearchQuery,
      activeCategory, setActiveCategory,
      currentProfile, setCurrentProfile,
      profiles, setProfiles,
      getFilteredVideos,
      allVideos,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
