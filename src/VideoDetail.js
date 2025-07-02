import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'YOUR_PLACEHOLDER_API_KEY';

function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      setLoading(true);
      setError(null);
      try {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,player&id=${id}&key=${API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setVideo(data.items[0]);
      } catch (err) {
        setError('Could not load video details.');
      } finally {
        setLoading(false);
      }
    }
    fetchVideo();
  }, [id]);

  // Escape key to go back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate(-1);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  // Click on overlay to go back
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  if (loading) return <div className="spinner" />;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</div>;
  if (!video) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(30, 30, 30, 0.7)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={handleOverlayClick}
    >
      <div
        className="video-detail-container"
        style={{
          cursor: 'auto',
          padding: '8rem',
          maxWidth: '1200px',
          width: '100%',
          background: '#111',
          borderRadius: 18,
          boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleOverlayClick}
      >
        <div style={{ margin: 0, cursor: 'auto', width: '100%' }}>
          <iframe
            width="100%"
            height="720"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ pointerEvents: 'auto', borderRadius: 12 }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default VideoDetail; 