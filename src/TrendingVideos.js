
import React, { useEffect, useState } from 'react';


const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'YOUR_PLACEHOLDER_API_KEY';

function TrendingVideos({ isSearch }) {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      setError(null);
      try {
        let url;
        if (isSearch && query) {
          url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(query)}&key=${API_KEY}`;
        } else {
          url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=12&regionCode=IN&videoCategoryId=10&key=${API_KEY}`;
        }
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setVideos(data.items);
      } catch (err) {
        setError('Could not load videos.');
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [isSearch, query]);

  if (loading) return <div className="spinner" />;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</div>;

  return (
    <>
      <h2 style={{textAlign: 'center', color: '#fff', marginTop: '1rem', fontWeight: 700}}>India’s Top Trending Videos</h2>
      <div className="trending-grid">
        {videos.map((video) => {
          const id = isSearch ? video.id?.videoId : video.id;
          const snippet = video.snippet;
          return (
            <Link key={id || video.etag} to={`/video/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="video-card">
                <img src={snippet.thumbnails.high.url} alt={snippet.title} />
                <h3>{snippet.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default TrendingVideos; 
