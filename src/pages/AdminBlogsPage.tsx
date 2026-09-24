import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBlogs } from '../context/BlogContext';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Blog, BlogStatus } from '../types';

export const AdminBlogsPage: React.FC = () => {
  const { blogs, updateBlog, deleteBlog, categories } = useBlogs();
  const [searchTerm, setSearchTerm] = useState('');

  // Editing modal state
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editStatus, setEditStatus] = useState<BlogStatus>('published');
  const [editContent, setEditContent] = useState('');

  // Delete modal state
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);

  const filteredBlogs = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return blogs;
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(term) ||
        b.authorName.toLowerCase().includes(term) ||
        b.category.toLowerCase().includes(term)
    );
  }, [blogs, searchTerm]);

  const handleStartEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setEditTitle(blog.title);
    setEditCategory(blog.category);
    setEditStatus(blog.status);
    setEditContent(blog.content);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    updateBlog(editingBlog.id, {
      title: editTitle.trim(),
      category: editCategory,
      status: editStatus,
      content: editContent,
    });
    setEditingBlog(null);
  };

  const handleConfirmDelete = () => {
    if (deleteCandidateId) {
      deleteBlog(deleteCandidateId);
      setDeleteCandidateId(null);
    }
  };

  return (
    <div className="admin-layout" id="admin-blogs-layout">
      <Sidebar />

      <main className="admin-main" id="admin-blogs-page">
        <div className="admin-page-header">
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-dark-navy)', marginBottom: '4px' }}>
              Blog Management
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Manage all published and draft articles across the BlogNest platform.
            </p>
          </div>

          <Link to="/create-blog">
            <Button variant="primary" id="admin-new-blog-btn">
              + New Article
            </Button>
          </Link>
        </div>

        {/* Search input toolbar */}
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Input
            id="admin-search-blogs"
            placeholder="Search by title, author, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Blog List Table */}
        <div className="data-table-container">
          <table className="data-table" id="admin-blogs-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} id={`admin-blog-row-${blog.id}`}>
                    <td style={{ fontWeight: 600, color: 'var(--color-dark-navy)', maxWidth: '280px' }}>
                      <Link to={`/blogs/${blog.id}`} style={{ color: 'inherit' }}>
                        {blog.title}
                      </Link>
                    </td>
                    <td>{blog.authorName}</td>
                    <td>
                      <span className="badge badge-blue">{blog.category}</span>
                    </td>
                    <td>
                      {blog.status === 'published' ? (
                        <span className="badge badge-published">Published</span>
                      ) : (
                        <span className="badge badge-draft">Draft</span>
                      )}
                    </td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                      {blog.date}
                    </td>
                    <td>
                      <div className="actions-cell" style={{ justifyContent: 'flex-end' }}>
                        <Link to={`/blogs/${blog.id}`}>
                          <Button variant="outline" size="sm" id={`admin-view-blog-${blog.id}`}>
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="secondary"
                          size="sm"
                          id={`admin-edit-blog-${blog.id}`}
                          onClick={() => handleStartEdit(blog)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          id={`admin-delete-blog-${blog.id}`}
                          onClick={() => setDeleteCandidateId(blog.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: 'var(--color-text-muted)' }}>
                    No articles found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Blog Modal */}
        {editingBlog && (
          <div className="modal-overlay" id="edit-blog-modal">
            <div className="modal-content" style={{ maxWidth: '640px' }}>
              <div className="modal-header">
                <h3>Edit Article</h3>
              </div>
              <form onSubmit={handleSaveEdit}>
                <Input
                  id="modal-edit-blog-title"
                  label="Title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label htmlFor="modal-edit-blog-category" className="form-label">
                      Category
                    </label>
                    <select
                      id="modal-edit-blog-category"
                      className="form-select"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="modal-edit-blog-status" className="form-label">
                      Status
                    </label>
                    <select
                      id="modal-edit-blog-status"
                      className="form-select"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as BlogStatus)}
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="modal-edit-blog-content" className="form-label">
                    Content
                  </label>
                  <textarea
                    id="modal-edit-blog-content"
                    className="form-textarea"
                    rows={6}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    required
                  />
                </div>

                <div className="modal-footer">
                  <Button variant="outline" type="button" onClick={() => setEditingBlog(null)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" id="save-blog-changes-btn">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteCandidateId && (
          <div className="modal-overlay" id="delete-admin-blog-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Confirm Article Deletion</h3>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: '14px 0 24px' }}>
                Are you sure you want to permanently delete this article from BlogNest?
              </p>
              <div className="modal-footer">
                <Button variant="outline" onClick={() => setDeleteCandidateId(null)}>
                  Cancel
                </Button>
                <Button variant="danger" id="confirm-admin-delete-btn" onClick={handleConfirmDelete}>
                  Delete Article
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
