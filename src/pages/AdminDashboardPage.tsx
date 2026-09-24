import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogs } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';

export const AdminDashboardPage: React.FC = () => {
  const { blogs, users } = useBlogs();
  const { isAdmin, currentUser } = useAuth();

  const totalUsers = users.length;
  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter((b) => b.status === 'published').length;
  const draftBlogs = blogs.filter((b) => b.status === 'draft').length;

  const recentBlogs = blogs.slice(0, 4);
  const recentUsers = users.slice(0, 4);

  return (
    <div className="admin-layout" id="admin-dashboard-layout">
      {/* Reusable Sidebar */}
      <Sidebar />

      {/* Main Admin Content */}
      <main className="admin-main" id="admin-dashboard-page">
        <div className="admin-page-header">
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-dark-navy)', marginBottom: '4px' }}>
              Admin Overview
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Welcome back, {currentUser?.name}. Here is the current activity across BlogNest.
            </p>
          </div>

          {!isAdmin && (
            <div style={{ backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.85rem' }}>
              Viewing in preview mode (Switch to Eleanor Vance in navbar for full admin role)
            </div>
          )}
        </div>

        {/* 4 KPI Metric Widgets: Total Users, Total Blogs, Recent Blogs, Recent Users */}
        <div className="kpi-grid">
          <div className="kpi-card" id="widget-total-users">
            <div className="kpi-title">Total Users</div>
            <div className="kpi-value">{totalUsers}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Active platform members
            </div>
          </div>

          <div className="kpi-card" id="widget-total-blogs">
            <div className="kpi-title">Total Blogs</div>
            <div className="kpi-value">{totalBlogs}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              {publishedBlogs} Published &bull; {draftBlogs} Drafts
            </div>
          </div>

          <div className="kpi-card" id="widget-published-rate">
            <div className="kpi-title">Published Rate</div>
            <div className="kpi-value">
              {totalBlogs > 0 ? Math.round((publishedBlogs / totalBlogs) * 100) : 0}%
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Articles public to readers
            </div>
          </div>

          <div className="kpi-card" id="widget-active-authors">
            <div className="kpi-title">Platform Authors</div>
            <div className="kpi-value">
              {new Set(blogs.map((b) => b.authorId)).size}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Active contributing writers
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Recent Blogs & Recent Users */}
        <div className="admin-two-cols">
          {/* Recent Blogs Widget */}
          <div className="card" id="widget-recent-blogs">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-dark-navy)', fontWeight: 700 }}>
                Recent Blogs
              </h3>
              <Link to="/admin/blogs" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                View all &rarr;
              </Link>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBlogs.map((b) => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 600, color: 'var(--color-dark-navy)' }}>
                        <Link to={`/blogs/${b.id}`} style={{ color: 'inherit' }}>
                          {b.title.slice(0, 36)}...
                        </Link>
                      </td>
                      <td>
                        <span className="badge badge-blue">{b.category}</span>
                      </td>
                      <td>
                        <span className={`badge ${b.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Users Widget */}
          <div className="card" id="widget-recent-users">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-dark-navy)', fontWeight: 700 }}>
                Recent Users
              </h3>
              <Link to="/admin/users" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                View all &rarr;
              </Link>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--color-dark-navy)' }}>{u.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{u.email}</div>
                      </td>
                      <td>
                        <span className={`badge ${u.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ color: 'var(--color-text-muted)' }}>{u.joinedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
