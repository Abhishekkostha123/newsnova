# NewsNova Frontend

A production-ready modern headless news frontend built with Next.js, TypeScript, Tailwind CSS, and MongoDB.

## Tech Stack

- **Next.js 16** — App Router, Server Components, ISR
- **TypeScript** — End-to-end type safety
- **Tailwind CSS v4** — Utility-first styling
- **MongoDB + Mongoose** — Database layer
- **Framer Motion** — Smooth animations
- **Mobile-first** — Responsive design throughout

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.local` and update the MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://your-user:your-password@cluster.mongodb.net/newsnova
NEXT_PUBLIC_SITE_URL=https://www.newsnova.online
NEXT_PUBLIC_SITE_NAME=NewsNova
REVALIDATE_INTERVAL=7200
```

### 3. Seed the Database (Optional)

```bash
npm install -D tsx dotenv
npx tsx scripts/seed.ts
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

```
src/
├── app/
│   ├── api/               # API routes (posts, comments, views)
│   ├── category/[slug]/   # Category pages (ISR)
│   ├── post/[slug]/       # Article pages (ISR + SSG)
│   ├── search/            # Search results page
│   ├── sitemap.xml/       # Dynamic XML sitemap
│   ├── rss.xml/           # RSS feed
│   ├── layout.tsx         # Root layout with navbar + footer
│   ├── page.tsx           # Homepage
│   ├── loading.tsx        # Loading state
│   ├── not-found.tsx      # 404 page
│   └── error.tsx          # Error boundary
├── components/
│   ├── article/           # TableOfContents, ViewTracker
│   ├── comments/          # CommentSection
│   ├── layout/            # Navbar, Footer
│   ├── news/              # BreakingNews, PostCards, LoadMorePosts
│   └── ui/                # Skeletons, SectionHeader
├── lib/
│   ├── db.ts              # MongoDB connection
│   ├── posts.ts           # Post data fetching
│   ├── categories.ts      # Category data fetching
│   ├── comments.ts        # Comment data fetching
│   ├── rate-limit.ts      # Rate limiting & anti-spam
│   └── utils.ts           # Date formatting, helpers
├── models/
│   ├── Post.ts            # Post Mongoose model
│   ├── Category.ts        # Category Mongoose model
│   ├── Author.ts          # Author Mongoose model
│   └── Comment.ts         # Comment Mongoose model
├── types/
│   └── index.ts           # TypeScript type definitions
└── middleware.ts           # www redirect + security headers
```

## Features

- **Homepage**: Hero section, breaking news ticker, latest/trending/category blocks
- **Article Pages**: Featured image, TOC sidebar, related posts, comments, share buttons
- **Category Pages**: Filtered posts with load more pagination
- **Comment System**: Nested replies, likes, rate limiting, anti-spam
- **Search**: Full-text search across title, excerpt, and tags
- **SEO**: JSON-LD structured data, sitemap, RSS feed, canonical URLs
- **ISR**: 60-second revalidation for fresh content
- **Mobile-first**: Fully responsive from 320px to 4K

## Deployment

### Vercel (Recommended)

```bash
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## License

MIT
