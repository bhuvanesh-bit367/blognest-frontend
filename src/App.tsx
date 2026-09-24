import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailsPage } from './pages/BlogDetailsPage';
import { CreateBlogPage } from './pages/CreateBlogPage';
import { MyBlogsPage } from './pages/MyBlogsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AdminBlogsPage } from './pages/AdminBlogsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BlogProvider>
          <div className="app-wrapper" id="app-root">
            <Navbar />
            <div className="main-content">
              <Routes>
                {/* Public & General Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blogs/:id" element={<BlogDetailsPage />} />

                {/* User Authenticated Routes */}
                <Route path="/create-blog" element={<CreateBlogPage />} />
                <Route path="/my-blogs" element={<MyBlogsPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                {/* Admin Management Routes */}
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
                <Route path="/admin/blogs" element={<AdminBlogsPage />} />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BlogProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
