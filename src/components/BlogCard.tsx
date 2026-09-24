import React from 'react';
import { Link } from 'react-router-dom';
import { Blog } from '../types';
import { Button } from './Button';

interface BlogCardProps {
  blog: Blog;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <article className="blog-card" id={`blog-card-${blog.id}`}>
      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="blog-card-img"
          loading="lazy"
        />
      )}
      <div className="blog-card-body">
        <div className="blog-card-header">
          <span className="badge badge-blue">{blog.category}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
            {blog.readTime}
          </span>
        </div>

        <h3 className="blog-card-title">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </h3>

        <p className="blog-card-excerpt">{blog.excerpt}</p>

        <div className="blog-card-footer">
          <div className="blog-card-author">
            By <strong>{blog.authorName}</strong>
            <div className="blog-card-date">{blog.date}</div>
          </div>
          <Link to={`/blogs/${blog.id}`}>
            <Button variant="outline" size="sm" id={`read-more-btn-${blog.id}`}>
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};
