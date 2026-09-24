import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  return (
    <aside className="admin-sidebar" id="admin-sidebar">
      <div className="sidebar-title">Admin Management</div>
      <ul className="sidebar-nav">
        <li>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            id="admin-sidebar-dashboard"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            id="admin-sidebar-users"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/blogs"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            id="admin-sidebar-blogs"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Manage Blogs
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-title" style={{ marginTop: '28px' }}>Quick Navigation</div>
      <ul className="sidebar-nav">
        <li>
          <Link to="/" className="sidebar-link" id="admin-sidebar-back-home">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Public Site
          </Link>
        </li>
        <li>
          <Link to="/create-blog" className="sidebar-link" id="admin-sidebar-new-blog">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Blog
          </Link>
        </li>
      </ul>
    </aside>
  );
};
