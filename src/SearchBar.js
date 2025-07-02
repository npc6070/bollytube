import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ className = '' }) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className} style={{ marginTop: 16, marginBottom: 16, display: 'flex', justifyContent: 'center', gap: 8 }}>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search videos..."
        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', width: 240 }}
      />
      <button type="submit" style={{ padding: '8px 16px', borderRadius: 4, border: 'none', background: '#1976d2', color: '#fff', cursor: 'pointer' }}>
        Search
      </button>
    </form>
  );
}

export default SearchBar; 