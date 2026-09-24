import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogs } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import { BlogCard } from '../components/BlogCard';
import { Button } from '../components/Button';

export const HomePage: React.FC = () => {
  const { blogs, categories } = useBlogs();
  const { isAuthenticated } = useAuth();

  // Filter only published blogs for the home showcase
  const publishedBlogs = blogs.filter(b => b.status === 'published');
  const latestBlogs = publishedBlogs.slice(0, 3);

  return (
    <div className="home-page" id="home-page">
      {/* Hero Section */}
      <section className="hero-section" id="home-hero-section">
        <div className="container hero-content">
          <h1 className="hero-title">
            Words that Inspire, Code that Empowers.
          </h1>
          <p className="hero-subtitle">
            Welcome to BlogNest — a minimalist community publication where software engineers, designers, and tech leaders share insights, architectural principles, and career learnings.
          </p>
          <div className="hero-actions">
            <Link to="/blogs">
              <Button variant="primary" size="lg" id="hero-explore-btn">
                Explore Articles
              </Button>
            </Link>
            {isAuthenticated ? (
              <Link to="/create-blog">
                <Button variant="outline-white" size="lg" id="hero-write-btn">
                  Write an Article
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button variant="outline-white" size="lg" id="hero-join-btn">
                  Join BlogNest
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container" style={{ paddingTop: '54px', paddingBottom: '40px' }}>
        {/* Categories Section */}
        <section className="categories-section" id="home-categories-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Explore by Category</h2>
              <p className="section-subtitle">Browse curated perspectives across technical disciplines</p>
            </div>
            <Link to="/blogs" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
              View all topics &rarr;
            </Link>
          </div>

          <div className="category-chips-grid">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/blogs?category=${encodeURIComponent(cat.name)}`}
                className="category-chip-card"
                id={`cat-chip-${cat.id}`}
              >
                <div className="category-chip-name">{cat.name}</div>
                <div className="category-chip-count">{cat.description}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Blogs Section */}
        <section className="latest-blogs-section" id="home-latest-blogs-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Latest Articles</h2>
              <p className="section-subtitle">Freshly published insights from our developer community</p>
            </div>
            <Link to="/blogs" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
              Browse all {publishedBlogs.length} posts &rarr;
            </Link>
          </div>

          <div className="blogs-grid">
            {latestBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
