import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrendingVideos from './TrendingVideos';
import SearchBar from './SearchBar';
import VideoDetail from './VideoDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>YouTube Bollywood</h1>
          <SearchBar className="search-bar" />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<TrendingVideos />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/search/:query" element={<TrendingVideos isSearch />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
