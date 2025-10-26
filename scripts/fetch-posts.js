#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE_URL = 'https://api.stashfive.com/api';
const POSTS_DIR = path.join(__dirname, '..', 'src', 'blog', 'posts');

class PostFetcher {
  constructor() {
    this.errors = [];
    this.fetchedCount = 0;
  }

  async fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  async fetchAllPosts() {
    console.log('🔍 Fetching post list from API...\n');

    try {
      const data = await this.fetchJson(`${API_BASE_URL}/posts`);

      if (!data.posts || !Array.isArray(data.posts)) {
        throw new Error('Invalid API response: missing posts array');
      }

      console.log(`Found ${data.posts.length} posts to fetch\n`);
      return data.posts;
    } catch (error) {
      console.error('❌ Failed to fetch post list:', error.message);
      throw error;
    }
  }

  async fetchPost(slug) {
    try {
      const data = await this.fetchJson(`${API_BASE_URL}/posts/${slug}`);
      return data;
    } catch (error) {
      this.errors.push({ slug, error: error.message });
      console.error(`❌ Failed to fetch post "${slug}":`, error.message);
      return null;
    }
  }

  parsePostContent(postData) {
    const content = postData.content || '';

    // Find the frontmatter section
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (!frontmatterMatch) {
      throw new Error('Invalid post format: missing frontmatter');
    }

    const frontmatterText = frontmatterMatch[1];
    const markdownContent = frontmatterMatch[2];

    // Parse frontmatter to extract fields
    const frontmatter = {};
    const lines = frontmatterText.split('\n');

    let currentKey = null;
    let currentValue = [];

    for (const line of lines) {
      // Check for new key-value pair
      const keyMatch = line.match(/^(\w+):\s*(.*)$/);

      if (keyMatch) {
        // Save previous key if exists
        if (currentKey) {
          frontmatter[currentKey] = this.parseFrontmatterValue(currentValue);
        }

        currentKey = keyMatch[1];
        currentValue = [keyMatch[2]];
      } else {
        // Continuation of previous value
        currentValue.push(line);
      }
    }

    // Save last key
    if (currentKey) {
      frontmatter[currentKey] = this.parseFrontmatterValue(currentValue);
    }

    return { frontmatter, content: markdownContent };
  }

  parseFrontmatterValue(lines) {
    const joined = lines.join('\n').trim();

    // Handle empty arrays
    if (joined === '[]') {
      return [];
    }

    // Handle arrays
    if (lines.length > 1 || joined.startsWith('-')) {
      return lines
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(line => line.substring(1).trim());
    }

    // Handle booleans
    if (joined === 'true') return true;
    if (joined === 'false') return false;

    // Handle empty strings
    if (joined === '') return '';

    // Remove quotes if present
    if ((joined.startsWith('"') && joined.endsWith('"')) ||
        (joined.startsWith("'") && joined.endsWith("'"))) {
      return joined.slice(1, -1);
    }

    return joined;
  }

  formatFrontmatter(frontmatter) {
    const lines = ['---'];

    for (const [key, value] of Object.entries(frontmatter)) {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          lines.push(`${key}: []`);
        } else {
          lines.push(`${key}:`);
          value.forEach(item => {
            lines.push(`  - ${item}`);
          });
        }
      } else if (typeof value === 'boolean') {
        lines.push(`${key}: ${value}`);
      } else if (value === '') {
        lines.push(`${key}:`);
      } else if (typeof value === 'string') {
        // Don't quote dates (YYYY-MM-DD format) or simple strings
        if (key === 'date' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
          lines.push(`${key}: ${value}`);
        } else if (value.includes('"') || value.includes('\n') || value.includes(':') || value.includes('#')) {
          // Use single quotes for strings with special characters, escape single quotes
          const escaped = value.replace(/'/g, "''");
          lines.push(`${key}: '${escaped}'`);
        } else {
          // Simple strings without special chars
          lines.push(`${key}: ${value}`);
        }
      } else {
        lines.push(`${key}: ${value}`);
      }
    }

    lines.push('---');
    return lines.join('\n');
  }

  createMarkdownFile(slug, postData) {
    const { frontmatter, content } = this.parsePostContent(postData);

    // Map API fields to match template expectations
    // API uses 'summary_text' but templates expect 'description'
    if (frontmatter.summary_text && !frontmatter.description) {
      frontmatter.description = frontmatter.summary_text;
      delete frontmatter.summary_text;
    }

    // Remove fields that aren't needed for Eleventy
    delete frontmatter.slug;
    delete frontmatter.primary_image;
    delete frontmatter.summary_banner;
    delete frontmatter.image_credit;
    delete frontmatter.hashtags;
    delete frontmatter.draft;

    // Add layout field if not present
    if (!frontmatter.layout) {
      frontmatter.layout = 'layouts/post.liquid';
    }

    const frontmatterText = this.formatFrontmatter(frontmatter);
    const fullContent = `${frontmatterText}\n\n${content}`;

    return fullContent;
  }

  clearPostsDirectory() {
    console.log('🗑️  Clearing existing posts...\n');

    if (!fs.existsSync(POSTS_DIR)) {
      fs.mkdirSync(POSTS_DIR, { recursive: true });
      return;
    }

    const files = fs.readdirSync(POSTS_DIR);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    mdFiles.forEach(file => {
      fs.unlinkSync(path.join(POSTS_DIR, file));
    });

    console.log(`Deleted ${mdFiles.length} existing markdown files\n`);
  }

  async run() {
    console.log('📝 Blog Post Fetcher');
    console.log('===================\n');

    try {
      // Clear existing posts
      this.clearPostsDirectory();

      // Fetch post list
      const posts = await this.fetchAllPosts();

      // Fetch and convert each post
      for (const post of posts) {
        console.log(`Fetching: ${post.slug}`);

        const postData = await this.fetchPost(post.slug);

        if (!postData) {
          continue;
        }

        try {
          const markdown = this.createMarkdownFile(post.slug, postData);
          const filename = path.join(POSTS_DIR, `${post.slug}.md`);

          fs.writeFileSync(filename, markdown, 'utf8');
          this.fetchedCount++;
          console.log(`✅ Created: ${post.slug}.md`);
        } catch (error) {
          this.errors.push({ slug: post.slug, error: error.message });
          console.error(`❌ Failed to create file for "${post.slug}":`, error.message);
        }
      }

      this.printResults();
      return this.errors.length > 0 ? 1 : 0;
    } catch (error) {
      console.error('\n❌ Post fetcher failed:', error.message);
      return 1;
    }
  }

  printResults() {
    console.log('\n📊 Fetch Results');
    console.log('================\n');

    console.log(`✅ Successfully fetched: ${this.fetchedCount} posts`);

    if (this.errors.length > 0) {
      console.log(`❌ Failed to fetch: ${this.errors.length} posts\n`);
      console.log('Errors:');
      this.errors.forEach(({ slug, error }) => {
        console.log(`  - ${slug}: ${error}`);
      });
    } else {
      console.log('✨ All posts fetched successfully!');
    }
  }
}

// Run the fetcher
const fetcher = new PostFetcher();
fetcher.run().then(exitCode => {
  process.exit(exitCode);
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
