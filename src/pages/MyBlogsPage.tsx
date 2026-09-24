import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlogs } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';

export const MyBlogsPage: React.FC = () => {
  const { getUserBlogs, deleteBlog } = useBlogs();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-dark-navy)', marginBottom: '12px' }}>Authentication Required</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          Please log in to manage your blogs and drafts.
        </p>
        <Button variant="primary" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </div>
    );
  }

  const userBlogs = getUserBlogs(currentUser.id);

  const confirmDelete = async () => {
  if (deleteCandidateId) {
    try {
      await deleteBlog(deleteCandidateId);
      setDeleteCandidateId(null);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  }
};

  return (
    <div className="my-blogs-page" id="my-blogs-page" style={{ padding: '40px 0 60px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--color-dark-navy)', marginBottom: '4px' }}>
              My Articles & Drafts
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Manage your authored content, revise drafts, or publish new ideas.
            </p>
          </div>
          <Link to="/create-blog">
            <Button variant="primary" id="my-blogs-create-btn">
              + New Article
            </Button>
          </Link>
        </div>

        {/* List of User's Blogs */}
        {userBlogs.length > 0 ? (
          <div className="data-table-container">
            <table className="data-table" id="my-blogs-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userBlogs.map((blog) => (
                  <tr key={blog.id} id={`my-blog-row-${blog.id}`}>
                    <td style={{ fontWeight: 600, color: 'var(--color-dark-navy)', maxWidth: '340px' }}>
                      <Link to={`/blogs/${blog.id}`} style={{ color: 'inherit' }}>
                        {blog.title}
                      </Link>
                    </td>
                    <td>
                      <span className="badge badge-blue">{blog.category}</span>
                    </td>
                    <td style={{ color: 'var(--color-text-muted)' }}>{blog.date}</td>
                    <td>
                      {blog.status === 'published' ? (
                        <span className="badge badge-published">Published</span>
                      ) : (
                        <span className="badge badge-draft">Draft</span>
                      )}
                    </td>
                    <td>
                      <div className="actions-cell" style={{ justifyContent: 'flex-end' }}>
                        <Link to={`/blogs/${(blog as any)._id || blog.id}`}>
                          <Button variant="outline" size="sm" id={`view-blog-${blog.id}`}>
                            View
                          </Button>
                        </Link>
                        <Link to={`/create-blog?edit=${(blog as any)._id || blog.id}`}>
                          <Button variant="secondary" size="sm" id={`edit-blog-${blog.id}`}>
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          id={`delete-blog-${blog.id}`}
                          onClick={() => setDeleteCandidateId(blog.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state" id="my-blogs-empty">
            <h3>You haven't written any articles yet</h3>
            <p>Share your knowledge, tutorials, or perspectives with fellow developers.</p>
            <Link to="/create-blog">
              <Button variant="primary" id="write-first-blog-btn">
                Write Your First Article
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteCandidateId && (
        <div className="modal-overlay" id="delete-confirm-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: '14px 0 24px' }}>
              Are you sure you want to permanently delete this article? This action cannot be undone.
            </p>
            <div className="modal-footer">
              <Button variant="outline" onClick={() => setDeleteCandidateId(null)}>
                Cancel
              </Button>
              <Button variant="danger" id="confirm-delete-btn" onClick={confirmDelete}>
                Delete Article
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
