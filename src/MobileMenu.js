import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileMenu.css';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={open ? 'menu-toggle open' : 'menu-toggle'}
        aria-label="Open menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={open ? 'mobile-nav open' : 'mobile-nav'}>
        <Link to="/" onClick={() => setOpen(false)}>Trending</Link>
        <Link to="/search/bollywood" onClick={() => setOpen(false)}>Bollywood</Link>
        <Link to="/search/hollywood" onClick={() => setOpen(false)}>Hollywood</Link>
        <Link to="/search/indie" onClick={() => setOpen(false)}>Indie</Link>
      </nav>
      {open && <div className="menu-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}
