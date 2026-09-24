import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBlogs } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const CreateBlogPage: React.FC = () => {
  const { categories, createBlog, updateBlog } = useBlogs();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Technology');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // If in edit mode, populate data
 // If in edit mode, populate data
useEffect(() => {
  const loadBlogForEdit = async () => {
    if (!editId) return;

    try {
      const response = await fetch(
        `https://blognest-backend-m7hi.onrender.com/api/blogs/${editId}`
      );

      const data = await response.json();

      console.log('Edit Blog Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load blog');
      }

      setTitle(data.title || '');
      setCategory(data.category || categories[0]?.name || 'Technology');
      setContent(data.content || '');
    } catch (error) {
      console.error('Failed to load blog for edit:', error);
      setError('Failed to load article.');
    }
  };

  loadBlogForEdit();
}, [editId, categories]);

  // Redirect to login if not authenticated
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-dark-navy)', marginBottom: '12px' }}>Authentication Required</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          You must be logged in to create or draft an article on BlogNest.
        </p>
        <Button variant="primary" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </div>
    );
  }

  const handleSave = async (status: 'published' | 'draft') => {
    setError('');
    setSuccessMsg('');

    if (!title.trim()) {
      setError('Please provide a title for your article.');
      return;
    }

    if (!category.trim()) {
      setError('Please select a category.');
      return;
    }

    if (!content.trim()) {
      setError('Please provide content for your article.');
      return;
    }

    if (editId) {
      await updateBlog(editId, {
        title: title.trim(),
        category,
        content,
        status,
      });
      setSuccessMsg(`Article successfully updated as ${status}!`);
      setTimeout(() => {
        navigate('/my-blogs');
      }, 1000);
    } else {
      await createBlog({
        title: title.trim(),
        category,
        content,
        status,
        authorId: currentUser.id,
        authorName: currentUser.name,
      });
      setSuccessMsg(`Article successfully saved as ${status}!`);
      setTimeout(() => {
        navigate('/my-blogs');
      }, 1000);
    }
  };

  return (
    <div className="create-blog-page" id="create-blog-page" style={{ padding: '40px 0 60px' }}>
      <div className="container-narrow">
        <div className="card" style={{ padding: '36px' }}>
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-dark-navy)', marginBottom: '8px' }}>
              {editId ? 'Edit Article' : 'Create New Article'}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Share your insights, tutorials, or engineering experiences with the community.
            </p>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              color: '#B91C1C',
              padding: '10px 14px',
              borderRadius: 'var(--border-radius)',
              marginBottom: '20px',
              fontSize: '0.88rem'
            }}>
              {error}
            </div>
          )}

          {successMsg && (
            <div style={{
              backgroundColor: 'var(--color-success-bg)',
              border: '1px solid #86EFAC',
              color: 'var(--color-success)',
              padding: '10px 14px',
              borderRadius: 'var(--border-radius)',
              marginBottom: '20px',
              fontSize: '0.88rem'
            }}>
              {successMsg}
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()} id="create-blog-form">
            {/* Title Field */}
            <Input
              id="blog-title-input"
              label="Article Title"
              placeholder="e.g. Master TypeScript Generics with Practical Examples"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* Category Field */}
            <div className="form-group">
              <label htmlFor="blog-category-select" className="form-label">
                Category <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <select
                id="blog-category-select"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Content Field */}
            <div className="form-group">
              <label htmlFor="blog-content-textarea" className="form-label">
                Content <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <textarea
                id="blog-content-textarea"
                className="form-textarea"
                rows={10}
                placeholder="Write your article content here. Use blank lines to separate paragraphs. Use ### for subheadings."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <span className="form-help">
                Tip: Separate paragraphs with a blank line. You can start a line with <code>### </code> for a section heading.
              </span>
            </div>

            {/* Actions: Publish button & Save Draft button */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
              <Button
                variant="primary"
                id="publish-blog-btn"
                onClick={() => handleSave('published')}
              >
                Publish Article
              </Button>

              <Button
                variant="outline"
                id="save-draft-blog-btn"
                onClick={() => handleSave('draft')}
              >
                Save Draft
              </Button>

              <Button
                variant="secondary"
                id="cancel-blog-btn"
                onClick={() => navigate('/my-blogs')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
