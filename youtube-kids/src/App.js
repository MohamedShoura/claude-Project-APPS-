import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Trending from './pages/Trending';
import History from './pages/History';
import WatchLater from './pages/WatchLater';
import Liked from './pages/Liked';
import Playlists from './pages/Playlists';
import Profile from './pages/Profile';
import Search from './pages/Search';
import './App.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch/:id" element={<Watch />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/search" element={<Search />} />
              <Route path="/history" element={<History />} />
              <Route path="/watch-later" element={<WatchLater />} />
              <Route path="/liked" element={<Liked />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
