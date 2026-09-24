import React, { useState, useMemo } from 'react';
import { useBlogs } from '../context/BlogContext';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { User, Role } from '../types';

export const AdminUsersPage: React.FC = () => {
  const { users, updateUser, deleteUser } = useBlogs();
  const [searchTerm, setSearchTerm] = useState('');

  // Editing state
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState<Role>('user');
  const [editBio, setEditBio] = useState('');

  // Delete candidate state
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const handleStartEdit = (user: User) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditRole(user.role);
    setEditBio(user.bio || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    updateUser(editingUser.id, {
      name: editName.trim(),
      role: editRole,
      bio: editBio.trim(),
    });
    setEditingUser(null);
  };

  const handleConfirmDelete = () => {
    if (deleteCandidateId) {
      deleteUser(deleteCandidateId);
      setDeleteCandidateId(null);
    }
  };

  return (
    <div className="admin-layout" id="admin-users-layout">
      <Sidebar />

      <main className="admin-main" id="admin-users-page">
        <div className="admin-page-header">
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-dark-navy)', marginBottom: '4px' }}>
              User Management
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              View registered users, search accounts, update roles, and manage permissions.
            </p>
          </div>
        </div>

        {/* Search input toolbar */}
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Input
            id="admin-search-users"
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* User List Table */}
        <div className="data-table-container">
          <table className="data-table" id="admin-users-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Role</th>
                <th>Bio</th>
                <th>Joined Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} id={`admin-user-row-${user.id}`}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--color-dark-navy)' }}>{user.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{user.email}</div>
                    </td>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ maxWidth: '240px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      {user.bio ? (user.bio.length > 60 ? `${user.bio.slice(0, 60)}...` : user.bio) : '—'}
                    </td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                      {user.joinedDate}
                    </td>
                    <td>
                      <div className="actions-cell" style={{ justifyContent: 'flex-end' }}>
                        <Button
                          variant="secondary"
                          size="sm"
                          id={`edit-user-btn-${user.id}`}
                          onClick={() => handleStartEdit(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          id={`delete-user-btn-${user.id}`}
                          onClick={() => setDeleteCandidateId(user.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '36px', color: 'var(--color-text-muted)' }}>
                    No users found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit User Modal */}
        {editingUser && (
          <div className="modal-overlay" id="edit-user-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Edit User: {editingUser.name}</h3>
              </div>
              <form onSubmit={handleSaveEdit}>
                <Input
                  id="modal-edit-user-name"
                  label="Full Name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />

                <div className="form-group">
                  <label htmlFor="modal-edit-user-role" className="form-label">
                    Role
                  </label>
                  <select
                    id="modal-edit-user-role"
                    className="form-select"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as Role)}
                  >
                    <option value="user">User (Standard)</option>
                    <option value="admin">Admin (Full Access)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="modal-edit-user-bio" className="form-label">
                    Bio
                  </label>
                  <textarea
                    id="modal-edit-user-bio"
                    className="form-textarea"
                    rows={3}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                  />
                </div>

                <div className="modal-footer">
                  <Button variant="outline" type="button" onClick={() => setEditingUser(null)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" id="save-user-changes-btn">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteCandidateId && (
          <div className="modal-overlay" id="delete-user-confirm-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Confirm User Deletion</h3>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: '14px 0 24px' }}>
                Are you sure you want to delete this user account from the system?
              </p>
              <div className="modal-footer">
                <Button variant="outline" onClick={() => setDeleteCandidateId(null)}>
                  Cancel
                </Button>
                <Button variant="danger" id="confirm-user-delete-btn" onClick={handleConfirmDelete}>
                  Delete User
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
