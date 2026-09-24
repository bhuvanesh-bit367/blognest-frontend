import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBlogs } from '../context/BlogContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { BlogCard } from '../components/BlogCard';

export const ProfilePage: React.FC = () => {
  const { currentUser, isAuthenticated, updateProfile } = useAuth();
  const { getUserBlogs } = useBlogs();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-dark-navy)', marginBottom: '12px' }}>Authentication Required</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          Please log in to view and edit your profile.
        </p>
        <Button variant="primary" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </div>
    );
  }

  const userBlogs = getUserBlogs(currentUser.id);
  const publishedCount = userBlogs.filter((b) => b.status === 'published').length;
  const draftCount = userBlogs.filter((b) => b.status === 'draft').length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateProfile(name.trim(), bio.trim());
    setIsEditing(false);
    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="profile-page" id="profile-page" style={{ padding: '40px 0 60px' }}>
      <div className="container">
        {successMsg && (
          <div
            style={{
              backgroundColor: 'var(--color-success-bg)',
              border: '1px solid #86EFAC',
              color: 'var(--color-success)',
              padding: '10px 16px',
              borderRadius: 'var(--border-radius)',
              marginBottom: '24px',
              fontSize: '0.9rem',
            }}
          >
            {successMsg}
          </div>
        )}

        <div className="profile-grid">
          {/* Profile Details Sidebar */}
          <div>
            <div className="profile-card">
              <div className="profile-avatar-lg">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>

              {!isEditing ? (
                <>
                  <h2 className="profile-name" id="profile-display-name">{currentUser.name}</h2>
                  <div className="profile-email" id="profile-display-email">{currentUser.email}</div>
                  <div style={{ marginBottom: '14px' }}>
                    <span className={`badge ${currentUser.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                      {currentUser.role.toUpperCase()}
                    </span>
                  </div>

                  <p className="profile-bio" id="profile-display-bio">
                    {currentUser.bio || 'No bio provided yet.'}
                  </p>

                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '20px' }}>
                    Member since {currentUser.joinedDate}
                  </div>

                  <Button
                    variant="outline"
                    id="edit-profile-btn"
                    style={{ width: '100%' } as React.CSSProperties}
                    onClick={() => {
                      setName(currentUser.name);
                      setBio(currentUser.bio || '');
                      setIsEditing(true);
                    }}
                  >
                    Edit Profile
                  </Button>
                </>
              ) : (
                /* Edit Profile Form */
                <form onSubmit={handleSaveProfile} id="edit-profile-form">
                  <Input
                    id="edit-profile-name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <div className="form-group" style={{ textAlign: 'left' }}>
                    <label htmlFor="edit-profile-email" className="form-label">
                      Email
                    </label>
                    <input
                      id="edit-profile-email"
                      type="email"
                      value={currentUser.email}
                      disabled
                      className="form-input"
                      style={{ backgroundColor: '#F3F4F6', color: '#6B7280' }}
                    />
                    <span className="form-help">Email cannot be changed in mock mode.</span>
                  </div>

                  <div className="form-group" style={{ textAlign: 'left' }}>
                    <label htmlFor="edit-profile-bio" className="form-label">
                      Bio
                    </label>
                    <textarea
                      id="edit-profile-bio"
                      className="form-textarea"
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell the community about yourself..."
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <Button type="submit" variant="primary" id="save-profile-btn" style={{ flex: 1 }}>
                      Save
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      id="cancel-profile-btn"
                      onClick={() => setIsEditing(false)}
                      style={{ flex: 1 }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}

              {/* Author Stat Cards */}
              <div style={{ borderTop: '1px solid var(--color-gray-border)', marginTop: '24px', paddingTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-dark-navy)' }}>
                    {publishedCount}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Published</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-dark-navy)' }}>
                    {draftCount}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Drafts</div>
                </div>
              </div>
            </div>
          </div>

          {/* User's Blogs List */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-dark-navy)' }}>
                Articles by {currentUser.name} ({userBlogs.length})
              </h3>
              <Link to="/create-blog">
                <Button variant="primary" size="sm">
                  + Write Article
                </Button>
              </Link>
            </div>

            {userBlogs.length > 0 ? (
              <div className="blogs-grid">
                {userBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No articles published yet</h3>
                <p>You haven't posted any articles. Start sharing your experiences!</p>
                <Link to="/create-blog">
                  <Button variant="primary">Create Your First Post</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
