#!/usr/bin/env node

import { JSDOM } from 'jsdom';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SEOLinter {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.duplicates = new Map();
  }

  log(type, file, message, line = null) {
    const entry = {
      type,
      file: path.relative(process.cwd(), file),
      message,
      line
    };
    
    if (type === 'error') {
      this.errors.push(entry);
    } else {
      this.warnings.push(entry);
    }
  }

  async lintFile(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const relativePath = path.relative(process.cwd(), filePath);

    console.log(`\n📄 Analyzing ${relativePath}`);

    // Basic HTML structure checks
    this.checkTitle(document, filePath);
    this.checkMetaDescription(document, filePath);
    this.checkCanonical(document, filePath);
    
    // Author and robot meta tags
    this.checkMetaTag(document, filePath, 'name', 'author', 'Author meta tag');
    this.checkMetaTag(document, filePath, 'name', 'robots', 'Robots meta tag');
    this.checkMetaTag(document, filePath, 'name', 'theme-color', 'Theme color meta tag');

    // Open Graph validation
    this.checkOpenGraph(document, filePath);
    
    // Twitter Cards validation
    this.checkTwitterCards(document, filePath);
    
    // Article-specific checks
    this.checkArticleMetadata(document, filePath);
    
    // JSON-LD structured data
    this.checkJsonLD(document, filePath);
    
    // RSS and favicon
    this.checkRSSFeed(document, filePath);
    this.checkFavicon(document, filePath);
  }

  checkTitle(document, filePath) {
    const titleElement = document.querySelector('title');
    if (!titleElement) {
      this.log('error', filePath, 'Missing <title> tag');
      return;
    }

    const title = titleElement.textContent.trim();
    if (!title) {
      this.log('error', filePath, 'Empty <title> tag');
      return;
    }

    // Track duplicates
    if (this.duplicates.has(title)) {
      this.log('warning', filePath, `Duplicate title: "${title}" (also in ${this.duplicates.get(title)})`);
    } else {
      this.duplicates.set(title, path.relative(process.cwd(), filePath));
    }

    // Length validation
    if (title.length < 30) {
      this.log('warning', filePath, `Title too short (${title.length} chars, recommended 30-60): "${title}"`);
    } else if (title.length > 60) {
      this.log('warning', filePath, `Title too long (${title.length} chars, recommended 30-60): "${title}"`);
    }
  }

  checkMetaDescription(document, filePath) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      this.log('error', filePath, 'Missing meta description');
      return;
    }

    const description = metaDesc.getAttribute('content')?.trim();
    if (!description) {
      this.log('error', filePath, 'Empty meta description');
      return;
    }

    // Length validation
    if (description.length < 120) {
      this.log('warning', filePath, `Description too short (${description.length} chars, recommended 120-160)`);
    } else if (description.length > 160) {
      this.log('warning', filePath, `Description too long (${description.length} chars, recommended 120-160)`);
    }
  }

  checkCanonical(document, filePath) {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      this.log('error', filePath, 'Missing canonical URL');
      return;
    }

    const href = canonical.getAttribute('href');
    if (!href || !href.startsWith('http')) {
      this.log('error', filePath, 'Invalid canonical URL format');
    }
  }

  checkMetaTag(document, filePath, attribute, value, description) {
    const meta = document.querySelector(`meta[${attribute}="${value}"]`);
    if (!meta) {
      this.log('error', filePath, `Missing ${description}`);
      return;
    }

    const content = meta.getAttribute('content')?.trim();
    if (!content) {
      this.log('error', filePath, `Empty ${description}`);
    }
  }

  checkOpenGraph(document, filePath) {
    const ogTags = [
      { property: 'og:title', required: true },
      { property: 'og:description', required: true },
      { property: 'og:type', required: true },
      { property: 'og:url', required: true },
      { property: 'og:site_name', required: true },
      { property: 'og:image', required: true },
      { property: 'og:image:alt', required: true },
      { property: 'og:image:width', required: true },
      { property: 'og:image:height', required: true }
    ];

    for (const tag of ogTags) {
      const meta = document.querySelector(`meta[property="${tag.property}"]`);
      if (!meta && tag.required) {
        this.log('error', filePath, `Missing Open Graph tag: ${tag.property}`);
        continue;
      }

      if (meta) {
        const content = meta.getAttribute('content')?.trim();
        if (!content) {
          this.log('error', filePath, `Empty Open Graph tag: ${tag.property}`);
        }
      }
    }

    // Validate og:type values
    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      const type = ogType.getAttribute('content');
      if (!['website', 'article'].includes(type)) {
        this.log('warning', filePath, `Unusual og:type value: "${type}"`);
      }
    }
  }

  checkTwitterCards(document, filePath) {
    const twitterTags = [
      { name: 'twitter:card', required: true },
      { name: 'twitter:site', required: true },
      { name: 'twitter:creator', required: true },
      { name: 'twitter:title', required: true },
      { name: 'twitter:description', required: true },
      { name: 'twitter:image', required: true },
      { name: 'twitter:image:alt', required: true }
    ];

    for (const tag of twitterTags) {
      const meta = document.querySelector(`meta[name="${tag.name}"]`);
      if (!meta && tag.required) {
        this.log('error', filePath, `Missing Twitter Card tag: ${tag.name}`);
        continue;
      }

      if (meta) {
        const content = meta.getAttribute('content')?.trim();
        if (!content) {
          this.log('error', filePath, `Empty Twitter Card tag: ${tag.name}`);
        }
      }
    }

    // Validate twitter:card type
    const cardType = document.querySelector('meta[name="twitter:card"]');
    if (cardType) {
      const type = cardType.getAttribute('content');
      if (!['summary', 'summary_large_image'].includes(type)) {
        this.log('warning', filePath, `Unusual twitter:card value: "${type}"`);
      }
    }
  }

  checkArticleMetadata(document, filePath) {
    const ogType = document.querySelector('meta[property="og:type"]');
    const isArticle = ogType && ogType.getAttribute('content') === 'article';

    if (isArticle) {
      const articleTags = [
        'article:author',
        'article:published_time'
      ];

      for (const tag of articleTags) {
        const meta = document.querySelector(`meta[property="${tag}"]`);
        if (!meta) {
          this.log('error', filePath, `Missing article metadata: ${tag}`);
        } else {
          const content = meta.getAttribute('content')?.trim();
          if (!content) {
            this.log('error', filePath, `Empty article metadata: ${tag}`);
          }
        }
      }

      // Check for article tags
      const articleTagElements = document.querySelectorAll('meta[property="article:tag"]');
      if (articleTagElements.length === 0) {
        this.log('warning', filePath, 'No article:tag metadata found');
      }
    }
  }

  checkJsonLD(document, filePath) {
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    
    if (jsonLdScripts.length === 0) {
      this.log('error', filePath, 'Missing JSON-LD structured data');
      return;
    }

    for (let i = 0; i < jsonLdScripts.length; i++) {
      const script = jsonLdScripts[i];
      try {
        const jsonLD = JSON.parse(script.textContent);
        this.validateJsonLD(jsonLD, filePath, i + 1);
      } catch (error) {
        this.log('error', filePath, `Invalid JSON-LD syntax in script ${i + 1}: ${error.message}`);
      }
    }
  }

  validateJsonLD(jsonLD, filePath, scriptNum) {
    // Check required properties
    if (!jsonLD['@context']) {
      this.log('error', filePath, `JSON-LD script ${scriptNum}: Missing @context`);
    }

    if (!jsonLD['@type']) {
      this.log('error', filePath, `JSON-LD script ${scriptNum}: Missing @type`);
      return;
    }

    const type = jsonLD['@type'];
    
    if (type === 'WebSite') {
      const requiredFields = ['name', 'description', 'url', 'author'];
      this.validateRequiredFields(jsonLD, requiredFields, filePath, `JSON-LD WebSite`);
    } else if (type === 'BlogPosting') {
      const requiredFields = ['headline', 'description', 'author', 'publisher', 'datePublished', 'url'];
      this.validateRequiredFields(jsonLD, requiredFields, filePath, `JSON-LD BlogPosting`);
    }

    // Validate author structure
    if (jsonLD.author && typeof jsonLD.author === 'object') {
      if (!jsonLD.author['@type'] || jsonLD.author['@type'] !== 'Person') {
        this.log('warning', filePath, `JSON-LD script ${scriptNum}: Author should be of type "Person"`);
      }
      if (!jsonLD.author.name) {
        this.log('error', filePath, `JSON-LD script ${scriptNum}: Author missing name`);
      }
    }
  }

  validateRequiredFields(obj, requiredFields, filePath, context) {
    for (const field of requiredFields) {
      if (!obj[field]) {
        this.log('error', filePath, `${context}: Missing required field "${field}"`);
      }
    }
  }

  checkRSSFeed(document, filePath) {
    const rssFeed = document.querySelector('link[rel="alternate"][type="application/rss+xml"]');
    if (!rssFeed) {
      this.log('warning', filePath, 'Missing RSS feed link');
    } else {
      const href = rssFeed.getAttribute('href');
      if (!href) {
        this.log('error', filePath, 'RSS feed link missing href');
      }
    }
  }

  checkFavicon(document, filePath) {
    const favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      this.log('warning', filePath, 'Missing favicon link');
    }
  }

  async run() {
    console.log('🔍 SEO Metadata Linter');
    console.log('======================\n');

    try {
      const htmlFiles = await glob('_site/**/*.html', {
        ignore: ['node_modules/**']
      });

      if (htmlFiles.length === 0) {
        console.log('❌ No HTML files found in _site directory. Run `npm run build` first.');
        return 1;
      }

      console.log(`Found ${htmlFiles.length} HTML files to analyze...`);

      for (const file of htmlFiles) {
        await this.lintFile(file);
      }

      this.printResults();
      return this.errors.length > 0 ? 1 : 0;
    } catch (error) {
      console.error('❌ SEO Linter failed:', error.message);
      return 1;
    }
  }

  printResults() {
    console.log('\n📊 SEO Lint Results');
    console.log('==================\n');

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All SEO metadata validation passed!');
      return;
    }

    // Group by file
    const fileGroups = new Map();
    
    [...this.errors, ...this.warnings].forEach(issue => {
      if (!fileGroups.has(issue.file)) {
        fileGroups.set(issue.file, { errors: [], warnings: [] });
      }
      
      if (issue.type === 'error') {
        fileGroups.get(issue.file).errors.push(issue);
      } else {
        fileGroups.get(issue.file).warnings.push(issue);
      }
    });

    // Print results by file
    for (const [file, issues] of fileGroups) {
      if (issues.errors.length > 0) {
        console.log(`❌ ${file}`);
        issues.errors.forEach(error => {
          console.log(`   ERROR: ${error.message}`);
        });
      }
      
      if (issues.warnings.length > 0) {
        console.log(`⚠️  ${file}`);
        issues.warnings.forEach(warning => {
          console.log(`   WARNING: ${warning.message}`);
        });
      }
      console.log();
    }

    // Summary
    console.log(`\n📋 Summary:`);
    console.log(`   ${this.errors.length} error(s)`);
    console.log(`   ${this.warnings.length} warning(s)`);
    
    if (this.errors.length > 0) {
      console.log('\n💡 Fix all errors for optimal SEO compliance.');
    } else {
      console.log('\n✅ No critical errors found!');
    }
  }
}

// Run the linter
const linter = new SEOLinter();
linter.run().then(exitCode => {
  process.exit(exitCode);
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});