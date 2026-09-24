import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { INITIAL_USERS } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string) => boolean;
  logout: () => void;
  updateProfile: (name: string, bio: string) => void;
  switchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'blognest_current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with persisted user or default to Alex Rivera
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored user', e);
    }
    // Default logged in as Alex Rivera (regular user) for pleasant immediate demo
    return INITIAL_USERS[1];
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to persist user', e);
    }
  }, [currentUser]);

 const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('https://blognest-backend-m7hi.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message || 'Login failed');
      return false;
    }

    localStorage.setItem('blognest_token', data.token);

    const user: User = {
     id: data.user?._id || data.user?.id || JSON.parse(atob(data.token.split('.')[1])).id,
      name: data.user?.name || email.split('@')[0],
      email: data.user?.email || email,
      role: data.user?.role || 'user',
      bio: data.user?.bio || '',
      joinedDate: data.user?.joinedDate || 'Recently',
    };

    setCurrentUser(user);

    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

  const register = (name: string, email: string): boolean => {
    const trimmedEmail = email.trim().toLowerCase();
    const role: Role = trimmedEmail.includes('admin') ? 'admin' : 'user';
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      role,
      bio: `Hello! I am ${name.trim()}, passionate about sharing ideas on BlogNest.`,
      joinedDate: 'Just now',
    };
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (name: string, bio: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      name,
      bio,
    });
  };

  const switchUser = (userId: string) => {
    const target = INITIAL_USERS.find(u => u.id === userId);
    if (target) {
      setCurrentUser(target);
    }
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        updateProfile,
        switchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
