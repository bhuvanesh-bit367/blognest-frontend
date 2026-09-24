import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim()) {
      setError('Please provide your email address.');
      return;
    }
    if (!password) {
      setError('Please provide a password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const success = register(name, email);
    if (success) {
      navigate('/blogs');
    }
  };

  return (
    <div className="auth-page-wrapper" id="register-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create Your Account</h2>
            <p>Join our publication and share your developer journey.</p>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              color: '#B91C1C',
              padding: '10px 14px',
              borderRadius: 'var(--border-radius)',
              marginBottom: '18px',
              fontSize: '0.88rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} id="register-form">
            <Input
              id="register-name"
              label="Name"
              placeholder="e.g. Jordan Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              id="register-email"
              label="Email"
              type="email"
              placeholder="jordan@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="register-password"
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              id="register-confirm-password"
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              id="register-submit-btn"
              style={{ width: '100%', marginTop: '10px' } as React.CSSProperties}
            >
              Register
            </Button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login" id="register-login-link">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
