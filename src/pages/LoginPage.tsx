import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

const success = await login(email, password);
    if (success) {
      navigate('/blogs');
    }
  };

  const handleQuickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    setError('');
  };

  return (
    <div className="auth-page-wrapper" id="login-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Log in to manage your articles, drafts, and profile.</p>
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

          <form onSubmit={handleSubmit} id="login-form">
            <Input
              id="login-email"
              label="Email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="login-password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              id="login-submit-btn"
              className="w-full"
              style={{ width: '100%', marginTop: '10px' } as React.CSSProperties}
            >
              Login
            </Button>
          </form>

          <div className="demo-credentials-box">
            <strong>Quick Demo Accounts (Mock Login):</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
              <button
                type="button"
                className="demo-quick-btn"
                onClick={() => handleQuickFill('admin@blognest.com')}
              >
                Eleanor (Admin)
              </button>
              <button
                type="button"
                className="demo-quick-btn"
                onClick={() => handleQuickFill('alex@blognest.com')}
              >
                Alex (User)
              </button>
              <button
                type="button"
                className="demo-quick-btn"
                onClick={() => handleQuickFill('sarah@blognest.com')}
              >
                Sarah (User)
              </button>
            </div>
          </div>

          <div className="auth-footer">
            Don't have an account? <Link to="/register" id="login-register-link">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
