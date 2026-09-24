import React, { createContext, useContext, useState, useEffect } from 'react';
import { Blog, User, Category } from '../types';
import { INITIAL_BLOGS, INITIAL_USERS, INITIAL_CATEGORIES } from '../data/mockData';

interface BlogContextType {
  blogs: Blog[];
  users: User[];
  categories: Category[];
  createBlog: (data: {
    title: string;
    category: string;
    content: string;
    status: 'published' | 'draft';
    authorId: string;
    authorName: string;
}) => Promise<Blog>;
  updateBlog: (id: string, updatedFields: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;
  getBlogById: (id: string) => Blog | undefined;
  getUserBlogs: (userId: string) => Blog[];
  fetchUserBlogs: () => Promise<void>;
  updateUser: (id: string, updatedFields: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const BLOGS_STORAGE_KEY = 'blognest_blogs_list';
const USERS_STORAGE_KEY = 'blognest_users_list';

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load blogs from localStorage or initialize with mock data
  const [blogs, setBlogs] = useState<Blog[]>(() => {
    try {
      const stored = localStorage.getItem(BLOGS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored blogs', e);
    }
    return INITIAL_BLOGS;
  });

  // Load users from localStorage or initialize with mock data
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored users', e);
    }
    return INITIAL_USERS;
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
    } catch (e) {
      console.error('Failed to persist blogs', e);
    }
  }, [blogs]);

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to persist users', e);
    }
  }, [users]);

  useEffect(() => {
  fetchUserBlogs();
}, []);

  const calculateReadTime = (text: string): string => {
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 180));
    return `${minutes} min read`;
  };

 const createBlog = async (data: {
  title: string;
  category: string;
  content: string;
  status: 'published' | 'draft';
  authorId: string;
  authorName: string;
}): Promise<Blog> => {
  const token = localStorage.getItem('blognest_token');

  const response = await fetch(
  'https://blognest-backend-m7hi.onrender.com/api/blogs',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: data.title,
      category: data.category,
      content: data.content,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to create blog');
  }

  const blog = result.blog || result;

  setBlogs(prev => [blog, ...prev]);

  return blog;
};

const fetchUserBlogs = async () => {
  const token = localStorage.getItem('blognest_token');

  const response = await fetch('https://blognest-backend-m7hi.onrender.com/api/blogs', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch blogs');
  }

  const formattedBlogs = result.map((blog: any) => ({
    ...blog,

    // MongoDB ID → Frontend ID
    id: blog._id?.toString(),

    // Author ID
    authorId:
      blog.author?._id?.toString() ||
      blog.author?.toString(),

    authorName:
      blog.authorName ||
      blog.author?.name ||
      'Unknown Author',

    // Date
    date: blog.createdAt
      ? new Date(blog.createdAt).toLocaleDateString()
      : '',

    // Status
    status: blog.status || 'published',

    // Read time
    readTime: calculateReadTime(blog.content || ''),

    // Excerpt
    excerpt:
      blog.excerpt ||
      (blog.content
        ? blog.content.replace(/[#*`_]/g, '').trim().slice(0, 140) + '...'
        : ''),
  }));

  setBlogs(formattedBlogs);
};

  const updateBlog = async (id: string, updatedFields: Partial<Blog>) => {
  const token = localStorage.getItem('blognest_token');

  const response = await fetch(
    `https://blognest-backend-m7hi.onrender.com/api/blogs/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: updatedFields.title,
        content: updatedFields.content,
        category: updatedFields.category,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to update blog');
  }

  const updatedBlog = result;

  setBlogs(prev =>
    prev.map(blog => {
      if (blog.id === id || (blog as any)._id === id) {
        const updated = { ...blog, ...updatedBlog };

        updated.id = updatedBlog._id || blog.id;
        updated.authorId =
          updatedBlog.author?._id || blog.authorId;
        updated.authorName =
          updatedBlog.authorName || blog.authorName;
        updated.date = updatedBlog.createdAt
          ? new Date(updatedBlog.createdAt).toLocaleDateString()
          : blog.date;
        updated.readTime = calculateReadTime(
          updatedBlog.content || blog.content || ''
        );

        return updated;
      }

      return blog;
    })
  );
};
  const deleteBlog = async (id: string) => {
  const token = localStorage.getItem('blognest_token');

  const response = await fetch(
    `https://blognest-backend-m7hi.onrender.com/api/blogs/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to delete blog');
  }

  setBlogs(prev =>
    prev.filter(
      b =>
        b.id?.toString() !== id.toString() &&
        (b as any)._id?.toString() !== id.toString()
    )
  );
};

const getBlogById = (id: string): Blog | undefined => {
  if (!id) return undefined;

  return blogs.find(blog => {
    return (
      blog.id?.toString() === id.toString() ||
      (blog as any)._id?.toString() === id.toString()
    );
  });
};

const getUserBlogs = (userId: string): Blog[] => {
  console.log('Current User ID:', userId);
  console.log('Blogs:', blogs);

  return blogs.filter(b => {
    const authorId =
      b.authorId ||
      (b as any).author?._id ||
      (b as any).author;

    console.log('Blog Author ID:', authorId);

    return authorId?.toString() === userId.toString();
  });
};
  const updateUser = (id: string, updatedFields: Partial<User>) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, ...updatedFields } : u))
    );
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        users,
        categories,
        createBlog,
        updateBlog,
        deleteBlog,
        getBlogById,
        getUserBlogs,
        fetchUserBlogs,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogs must be used within a BlogProvider');
  }
  return context;
};
