import { User, Blog, Category } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Eleanor Vance (Admin)',
    email: 'admin@blognest.com',
    role: 'admin',
    bio: 'Editor-in-chief and platform administrator at BlogNest. Passionate about clean architecture and tech writing.',
    joinedDate: 'Jan 15, 2025',
  },
  {
    id: 'user-alex',
    name: 'Alex Rivera',
    email: 'alex@blognest.com',
    role: 'user',
    bio: 'Full-stack software engineer and open-source contributor. Writing about frontend ecosystems and modern JavaScript.',
    joinedDate: 'Feb 10, 2025',
  },
  {
    id: 'user-sarah',
    name: 'Sarah Chen',
    email: 'sarah@blognest.com',
    role: 'user',
    bio: 'Product designer focusing on accessible UI, typography systems, and empathetic user experiences.',
    joinedDate: 'Mar 01, 2025',
  },
  {
    id: 'user-marcus',
    name: 'Marcus Brody',
    email: 'marcus@blognest.com',
    role: 'user',
    bio: 'DevOps engineer and cloud enthusiast. Exploring containerization, continuous integration, and developer tooling.',
    joinedDate: 'Apr 22, 2025',
  },
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'tech',
    name: 'Technology',
    description: 'Emerging tech innovations, software breakthroughs, and industry shifts.',
    count: 3,
  },
  {
    id: 'webdev',
    name: 'Web Development',
    description: 'Deep dives into modern frameworks, clean CSS, and frontend workflows.',
    count: 4,
  },
  {
    id: 'design',
    name: 'Design & UX',
    description: 'User interface craft, typography hierarchy, and accessibility patterns.',
    count: 2,
  },
  {
    id: 'programming',
    name: 'Programming',
    description: 'Algorithms, design patterns, debugging techniques, and clean code principles.',
    count: 3,
  },
  {
    id: 'career',
    name: 'Career & Growth',
    description: 'Engineering mentorship, remote work dynamics, and leadership insights.',
    count: 2,
  },
];

export const INITIAL_BLOGS: Blog[] = [
  {
    id: 'blog-1',
    title: 'The Art of Writing Clean and Maintainable React Components',
    category: 'Web Development',
    excerpt: 'Discover essential guidelines for structuring reusable React components, managing props cleanly, and avoiding premature abstractions.',
    content: `Building maintainable software is a marathon, not a sprint. In modern frontend development with React, how you decompose components today will dictate your team's velocity tomorrow.

### 1. Single Responsibility Principle
Every component should have a single clear reason to change. If a component is responsible for fetching data, formatting dates, handling authentication states, AND rendering complex interactive widgets, it has become a god component. Break presentation apart from state logic.

### 2. Composition Over Deep Prop Drilling
Instead of drilling configuration props through four layers of child elements, prefer using children composition or lightweight context. For instance, passing compound subcomponents gives consumers of your component clear control over placement and styling without bloating the interface.

### 3. Clear Prop Interfaces
Keep props predictable. Avoid generic \`data\` or \`config\` objects when explicit primitives or well-typed contracts make component usage self-documenting. Use TypeScript interfaces with helpful descriptions whenever possible.

\`\`\`tsx
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick: () => void;
  disabled?: boolean;
}
\`\`\`

### Summary
Clean React code isn't about clever one-liners or esoteric hooks. It's about predictability, thoughtful naming, and building modules that any developer on your team can read and update with confidence.`,
    authorId: 'user-alex',
    authorName: 'Alex Rivera',
    date: 'May 12, 2025',
    status: 'published',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'blog-2',
    title: 'Modern CSS Without Frameworks: Embracing Pure Stylesheets',
    category: 'Web Development',
    excerpt: 'CSS has evolved dramatically. Learn how modern CSS custom properties, grid layouts, and nesting make vanilla CSS a joy to write.',
    content: `For years, developers reached for heavyweight CSS frameworks to solve basic layout dilemmas, responsive columns, and consistent theming. But native CSS has quietly undergone a quiet renaissance.

### The Power of CSS Custom Properties
CSS variables are dynamic, cascade naturally, and can be inspected live in browser developer tools:

\`\`\`css
:root {
  --color-primary: #2563EB;
  --color-dark: #0A1F44;
  --space-md: 16px;
  --radius-sm: 6px;
}
\`\`\`

### CSS Grid and Flexbox Synergy
There is no longer any need for 12-column grid utility bloat. A simple \`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))\` handles full responsive card displays automatically with zero media query clutter.

### Minimalist Mental Overhead
Writing semantic CSS directly connects your styling to clean HTML structure. By keeping styles straightforward and scoped, you eliminate dependency churn, reduce bundle sizes, and keep full artistic control over your application's aesthetic.`,
    authorId: 'user-sarah',
    authorName: 'Sarah Chen',
    date: 'May 18, 2025',
    status: 'published',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'blog-3',
    title: 'Designing for Readability: Optical Spacing and Typography',
    category: 'Design & UX',
    excerpt: 'Why line height, character limits per line, and optical hierarchy make or break user engagement on content platforms.',
    content: `Great reading experiences feel effortless because the designer removed visual friction. When visitors land on a blog or documentation portal, typography is not just decoration—it is the direct medium of thought.

### The 65-75 Character Rule
Long lines of text tire the human eye because scanning backwards to find the next line becomes strenuous. By constraining article container widths to roughly 68 characters (\`max-width: 68ch\`), reading speed and retention improve dramatically.

### Vertical Rhythm & Line Height
Body typography requires adequate breathing room. For 16px text, a line-height between 1.6 and 1.7 ensures ascenders and descenders never collide. Headings, on the other hand, should have tighter line heights (1.2 to 1.3) to hold multi-line headers together visually.

### Color Contrast and Comfort
High contrast doesn't mean harsh pure black (\`#000000\`) on pure white (\`#FFFFFF\`). Introducing a subtle navy tint (\`#0A1F44\`) softens ocular fatigue while exceeding WCAG AA accessibility standards.`,
    authorId: 'user-sarah',
    authorName: 'Sarah Chen',
    date: 'June 02, 2025',
    status: 'published',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'blog-4',
    title: 'A Pragmatic Guide to Frontend State Management in 2025',
    category: 'Programming',
    excerpt: 'You might not need an external state management library. When to reach for local useState, React Context, or URL parameters.',
    content: `One of the most common pitfalls in frontend web architecture is introducing complex global stores before identifying a real state synchronization problem.

### Levels of State
1. **Local State**: Input form fields, toggle menus, and accordion expansion belong directly in the component using \`useState\`.
2. **Lifted Component State**: When sibling elements need to share a state (like a search filter and a list), lift it to their common parent.
3. **Application Context**: User authentication sessions, active themes, or notification queues are prime candidates for React's native \`useContext\`.
4. **URL State**: Search query parameters, active tabs, and pagination belong in the URL! Storing these in query strings allows users to bookmark and share specific views.

### Simplicity Wins
Before installing an external dependency with hundreds of boilerplate concepts, ask yourself if simple React hooks and clean component interfaces solve your requirement. In 90% of web apps, native state is faster, simpler to test, and infinitely easier for new developers to onboard.`,
    authorId: 'user-alex',
    authorName: 'Alex Rivera',
    date: 'June 14, 2025',
    status: 'published',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'blog-5',
    title: 'Navigating Your Career From Junior to Senior Developer',
    category: 'Career & Growth',
    excerpt: 'The transition to senior engineering is less about writing faster code and more about communication, trade-off analysis, and mentoring.',
    content: `Early in our software engineering journeys, we measure success by tickets closed and new languages learned. But the inflection point toward senior engineering requires shifting your focal length from individual syntax to team velocity and system reliability.

### 1. Embracing Pragmatism
Junior developers often strive for theoretical perfection or jump onto the latest bleeding-edge tooling. Senior engineers evaluate trade-offs: *What is the maintenance cost? How will this fail? Can someone else debug this at 2 AM?*

### 2. Communication is a Technical Skill
Writing clear design docs, explaining technical constraints to non-technical stakeholders, and providing constructive code review feedback will multiply your impact far more than raw coding output.

### 3. Elevating Those Around You
The hallmark of a great senior engineer is that people on their team grow faster, feel supported, and ship higher quality work with less friction.`,
    authorId: 'user-admin',
    authorName: 'Eleanor Vance (Admin)',
    date: 'June 28, 2025',
    status: 'published',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'blog-6',
    title: 'Draft: Understanding Modern Cloud Native Deployment Pipelines',
    category: 'Technology',
    excerpt: 'An upcoming breakdown of continuous delivery pipelines, ephemeral staging environments, and container runtimes.',
    content: `Work in progress draft on modern cloud orchestration, immutable container images, and canary deployments. 

More sections coming soon...`,
    authorId: 'user-alex',
    authorName: 'Alex Rivera',
    date: 'July 05, 2025',
    status: 'draft',
    readTime: '2 min read',
  },
];
