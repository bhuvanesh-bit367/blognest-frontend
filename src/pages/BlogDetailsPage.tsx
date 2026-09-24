import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlogs } from '../context/BlogContext';
import { BlogCard } from '../components/BlogCard';
import { Button } from '../components/Button';
import { Blog } from '../types';

export const BlogDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBlogById, blogs, fetchUserBlogs } = useBlogs();
  const navigate = useNavigate();
  const [apiBlog, setApiBlog] = useState<Blog | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchBlog = async () => {
    try {
      const response = await fetch(
        `https://blognest-backend-m7hi.onrender.com/api/blogs/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Blog not found');
      }

      setApiBlog({
        ...data,
        id: data._id?.toString(),
        authorId: data.author?._id?.toString() || data.author?.toString(),
        authorName: data.authorName || data.author?.name || 'Unknown Author',
        date: data.createdAt
          ? new Date(data.createdAt).toLocaleDateString()
          : '',
        status: data.status || 'published',
        readTime: `${Math.max(
          1,
          Math.ceil((data.content || '').trim().split(/\s+/).length / 180)
        )} min read`,
      });
    } catch (error) {
      console.error('Failed to fetch blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchBlog();
  }
}, [id]);

  const blog = apiBlog || getBlogById(id || '');
  console.log('URL Blog ID:', id);
  console.log('All Blogs:', blogs);
  if (!blog) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-dark-navy)', marginBottom: '12px' }}>
          Article Not Found
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          The article you are looking for does not exist or may have been deleted.
        </p>
        <Button variant="primary" onClick={() => navigate('/blogs')}>
          Back to Articles
        </Button>
      </div>
    );
  }

  // Related blogs: same category, excluding current blog, published
  const relatedBlogs = blogs
    .filter((b) => b.id !== blog.id && b.category === blog.category && b.status === 'published')
    .slice(0, 2);

  // If not enough in same category, grab other recent published articles
  const fallbackRelated =
    relatedBlogs.length > 0
      ? relatedBlogs
      : blogs.filter((b) => b.id !== blog.id && b.status === 'published').slice(0, 2);

  return (
    <div className="blog-details-page" id={`blog-details-${blog.id}`}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginTop: '24px', marginBottom: '8px' }}>
          <Link to="/blogs" style={{ fontSize: '0.9rem', color: 'var(--color-blue)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            &larr; Back to all articles
          </Link>
        </div>

        {/* Article Container */}
        <article className="article-container">
          <header className="article-header">
            <div className="article-category">
              <span className="badge badge-blue">{blog.category}</span>
              <span style={{ marginLeft: '12px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                {blog.readTime}
              </span>
            </div>

            <h1 className="article-title">{blog.title}</h1>

            <div className="article-meta">
              <div className="article-author-info">
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-dark-navy)',
                    color: 'var(--color-white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  {blog.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-dark-navy)' }}>
                    {blog.authorName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                    Published on {blog.date}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Cover image if available */}
          {blog.coverImage && (
            <div style={{ marginBottom: '28px', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
              <img
                src={blog.coverImage}
                alt={blog.title}
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
          )}

          {/* Article Full Content (renders paragraphs and headers cleanly) */}
          <div className="article-content" id="article-body">
            {blog.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('```')) {
                const codeContent = paragraph.replace(/```[a-z]*\n?/g, '');
                return (
                  <pre key={index}>
                    <code>{codeContent}</code>
                  </pre>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>
        </article>

        {/* Related Blogs Section */}
        {fallbackRelated.length > 0 && (
          <section className="related-blogs-section" id="related-blogs-section">
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-dark-navy)', marginBottom: '20px' }}>
              Related Articles
            </h2>
            <div className="blogs-grid">
              {fallbackRelated.map((relBlog) => (
                <BlogCard key={relBlog.id} blog={relBlog} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
