# Brian Gershon's Personal Blog

A simple, fast, and modern personal blog built with Eleventy, TypeScript, and Tailwind CSS v4.

## Features

- 🚀 **Fast builds** - Eleventy with TypeScript configuration
- 💎 **Modern styling** - Tailwind CSS v4 with utility-first approach
- 📝 **Markdown blog posts** - Easy content creation with frontmatter
- 🔍 **SEO ready** - Automatic sitemap and RSS feed generation
- 📱 **Responsive design** - Mobile-first responsive layout
- 🛠️ **Developer experience** - TypeScript, ESLint, Prettier
- ⚡ **Live reload** - Development server with hot reloading

## Tech Stack

- [Eleventy](https://www.11ty.dev/) - Static site generator
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [Liquid](https://liquidjs.com/) - Template engine
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## Getting Started

### Prerequisites

- Node.js (18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd briangershon-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:8080`.

## Development

### Available Scripts

- `npm run dev` - Start development server with live reload (runs Tailwind CSS watch + Eleventy serve concurrently)
- `npm run build` - Build the site for production (compiles CSS + builds Eleventy)
- `npm run build:css` - Build and watch Tailwind CSS only
- `npm run build:eleventy` - Build Eleventy only
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

### Project Structure

```
/
├── eleventy.config.ts          # Eleventy configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── src/
│   ├── index.liquid           # Homepage
│   ├── feed.liquid            # RSS feed
│   ├── sitemap.liquid         # XML sitemap
│   ├── blog/
│   │   ├── index.liquid       # Blog index page
│   │   └── posts/             # Blog posts (Markdown)
│   ├── _includes/
│   │   └── layouts/           # Page layouts
│   ├── _data/
│   │   └── site.json          # Global site data
│   └── assets/
│       └── css/
│           └── style.css      # Main stylesheet
└── _site/                     # Generated site (ignored)
```

### Writing Blog Posts

Create new blog posts in `src/blog/posts/` as Markdown files with frontmatter:

```markdown
---
title: Your Post Title
description: A brief description of your post
date: 2024-08-24
tags:
  - tag1
  - tag2
layout: layouts/post.liquid
---

Your post content here...
```

### Customization

#### Site Configuration

Update site information in `src/_data/site.json`:

```json
{
  "title": "Your Name",
  "description": "Your site description",
  "url": "https://yoursite.com",
  "author": {
    "name": "Your Name",
    "email": "your@email.com"
  }
}
```

#### Styling

The site uses Tailwind CSS v4. Main styles are in `src/assets/css/style.css`.
Typography styles are defined with the `prose` class for blog content.

#### Adding Pages

Create new `.liquid` files in the `src/` directory. They'll be automatically
processed by Eleventy.

## Deployment

The site generates static files in the `_site` directory. You can deploy to any
static hosting service:

1. **Vercel**: Connect your Git repository and Vercel will automatically deploy
2. **Netlify**: Connect your Git repository for automatic deployments
3. **GitHub Pages**: Use GitHub Actions to build and deploy

### Build for Production

```bash
npm run build
```

## Performance

- ⚡ Build time: < 1 second
- 📦 Bundle size: Minimal JavaScript, optimized CSS
- 🚀 Lighthouse scores: 90+ across all metrics
- 📱 Mobile-friendly and accessible

## Contributing

This is a personal blog, but if you find issues or have suggestions for improvements, feel free to open an issue or pull request.

## License

MIT License - feel free to use this as a template for your own blog!
