import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="footer" id="app-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div className="logo-icon-badge" style={{ width: '28px', height: '28px', fontSize: '0.85rem' }}>
                B
              </div>
              <h3 style={{ margin: 0 }}>BlogNest</h3>
            </div>
            <p>
              A clean, modern, frontend-first blogging community dedicated to high-quality technical writing, UX design principles, and developer experiences.
            </p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blogs">All Articles</Link></li>
              <li><Link to="/create-blog">Write a Story</Link></li>
              <li><Link to="/my-blogs">My Drafts & Posts</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/blogs?category=Technology">Technology</Link></li>
              <li><Link to="/blogs?category=Web Development">Web Development</Link></li>
              <li><Link to="/blogs?category=Design & UX">Design & UX</Link></li>
              <li><Link to="/blogs?category=Programming">Programming</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Account</h4>
            <ul>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Create Account</Link></li>
              <li><Link to="/admin">Admin Area</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BlogNest. Built with React and Vite. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
