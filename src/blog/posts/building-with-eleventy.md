---
title: Building Fast Sites with Eleventy
description: My experience building this blog with Eleventy, TypeScript, and modern web tools for optimal performance and developer experience.
date: 2024-08-23
tags:
  - eleventy
  - typescript
  - performance
  - web development
layout: layouts/post.liquid
---

Static site generators have come a long way, and [Eleventy](https://www.11ty.dev/) stands out as one of the most flexible and performant options available. In this post, I'll share my experience building this blog and why I chose Eleventy for this project.

## Why Eleventy?

After working with various static site generators, Eleventy appealed to me for several reasons:

### 1. **Flexibility in Templates**

Eleventy doesn't lock you into a specific templating language. You can use:

- Liquid (what I chose for this blog)
- Nunjucks
- Handlebars
- Markdown
- And many others

This flexibility means you can choose the right tool for each part of your site.

### 2. **Performance First**

Eleventy generates lightning-fast static sites with minimal JavaScript. The build times are impressive, and the output is clean HTML that loads quickly.

### 3. **TypeScript Support**

With the right setup, you can configure Eleventy using TypeScript, providing better developer experience with type safety and IntelliSense.

## My Setup

For this blog, I used:

```javascript
// eleventy.config.ts
import { UserConfig } from "@11ty/eleventy";
import rssPlugin from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig: UserConfig) {
  // Add plugins
  eleventyConfig.addPlugin(rssPlugin);

  // Configure directories
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");

  // Custom collections and filters
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  return {
    // Return configuration
  };
}
```

## Styling with Tailwind CSS v4

I paired Eleventy with Tailwind CSS v4 for styling. The utility-first approach works beautifully with component-based templates:

```html
<article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <header class="mb-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ title }}</h1>
    <time class="text-gray-600">{{ date | dateDisplay }}</time>
  </header>

  <div class="prose max-w-none">{{ content }}</div>
</article>
```

## Results

The combination delivers:

- **Fast builds** - The entire site builds in under a second
- **Great performance** - Lighthouse scores in the 90s across all metrics
- **Developer experience** - TypeScript support and hot reloading during development
- **SEO ready** - Automatic sitemap and RSS feed generation

## Next Steps

I'm planning to add:

- Search functionality
- Comments system
- Newsletter integration
- More interactive elements

Static doesn't have to mean boring, and Eleventy provides the perfect foundation for both simple blogs and complex sites.

What's your experience with static site generators? I'd love to hear about your preferred tools and setup!
