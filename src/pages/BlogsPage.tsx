import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBlogs } from '../context/BlogContext';
import { BlogCard } from '../components/BlogCard';

export const BlogsPage: React.FC = () => {
  const { blogs, categories } = useBlogs();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'All';
  const queryParam = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  // Sync state if query params change externally
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('q', val.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat !== 'All') {
      newParams.set('category', cat);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  // Filter published blogs by query and category
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((b) => b.status === 'published')
      .filter((blog) => {
        const matchesCategory =
          selectedCategory === 'All' || blog.category.toLowerCase() === selectedCategory.toLowerCase();
        
        const queryLower = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !queryLower ||
          blog.title.toLowerCase().includes(queryLower) ||
          blog.excerpt.toLowerCase().includes(queryLower) ||
          blog.authorName.toLowerCase().includes(queryLower) ||
          blog.content.toLowerCase().includes(queryLower);

        return matchesCategory && matchesSearch;
      });
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <div className="blogs-page" id="blogs-page">
      {/* Header with Search and Category Filter */}
      <section className="blogs-page-header">
        <div className="container">
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-dark-navy)', marginBottom: '8px' }}>
            Explore Articles
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Search through tutorials, design architectures, engineering insights, and tech analyses.
          </p>

          <div className="search-filter-bar">
            {/* Search Input */}
            <div className="search-input-wrapper">
              <input
                id="blogs-search-input"
                type="text"
                className="form-input"
                placeholder="Search articles by title, author, or keyword..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {/* Category Filter */}
            <div className="category-filter-select">
              <select
                id="blogs-category-filter"
                className="form-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <div className="container" style={{ paddingBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Showing <strong>{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? 'article' : 'articles'}
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          </span>

          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSearchParams({});
              }}
              style={{ fontSize: '0.85rem', color: 'var(--color-blue)', cursor: 'pointer' }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="blogs-grid" id="blogs-list-grid">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="empty-state" id="blogs-empty-state">
            <h3>No articles found</h3>
            <p>We couldn't find any articles matching your search criteria. Try a different keyword or category.</p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSearchParams({});
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
