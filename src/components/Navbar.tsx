import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { currentUser, isAuthenticated, isAdmin, logout, switchUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar" id="app-navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu} id="navbar-brand-logo">
          <div className="logo-icon-badge">B</div>
          <span>BlogNest</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="mobile-toggle-btn"
          id="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigation links */}
        <nav className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`} id="navbar-navigation">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
            id="nav-link-home"
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/blogs"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
            id="nav-link-blogs"
          >
            Blogs
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink
                to="/create-blog"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
                id="nav-link-create"
              >
                Create Blog
              </NavLink>

              <NavLink
                to="/my-blogs"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
                id="nav-link-myblogs"
              >
                My Blogs
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
                id="nav-link-profile"
              >
                Profile
              </NavLink>
            </>
          )}

          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
              id="nav-link-admin"
            >
              Admin Dashboard
              <span className="admin-tag">Admin</span>
            </NavLink>
          )}

          {/* User state and auth buttons */}
          <div className="navbar-auth" id="navbar-auth-controls">
            {isAuthenticated && currentUser ? (
              <>
                <div className="navbar-user-chip" title={`Logged in as ${currentUser.name}`}>
                  <div className="user-avatar-sm">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{currentUser.name}</span>
                </div>

                {/* Quick Role Switcher for seamless demo testing */}
                <select
                  value={currentUser.id}
                  onChange={(e) => switchUser(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    padding: '4px 6px',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                  }}
                  id="demo-user-switcher"
                  title="Switch demo user"
                >
                  <option value="user-alex" style={{ color: '#000' }}>User: Alex Rivera</option>
                  <option value="user-admin" style={{ color: '#000' }}>Admin: Eleanor Vance</option>
                  <option value="user-sarah" style={{ color: '#000' }}>User: Sarah Chen</option>
                </select>

                <Button
                  variant="outline-white"
                  size="sm"
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  id="navbar-logout-btn"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button variant="outline-white" size="sm" id="navbar-login-btn">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={closeMobileMenu}>
                  <Button variant="primary" size="sm" id="navbar-register-btn">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
