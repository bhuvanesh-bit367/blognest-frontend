export type Role = 'user' | 'admin';

export type BlogStatus = 'published' | 'draft';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  bio?: string;
  avatarUrl?: string;
  joinedDate: string;
}

export interface Blog {
  id: string;
  title: string;
  category: string;
  content: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  date: string;
  status: BlogStatus;
  readTime: string;
  coverImage?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
}
