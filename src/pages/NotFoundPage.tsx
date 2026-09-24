import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page" id="not-found-page">
      <div className="container">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-text">
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg" id="not-found-home-btn">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
