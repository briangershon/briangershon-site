# Image Optimization Guide

This site now supports flexible image optimization using @11ty/eleventy-img with multiple approaches.

## Current Setup

### HTML Transform Plugin (Default)
All `<img>` tags are automatically optimized with:
- **Formats**: AVIF, WebP, JPEG (with progressive fallbacks)
- **Widths**: `auto` (original), 96px, 192px, 400px, 800px
- **Lazy loading**: Enabled by default
- **Modern features**: Responsive srcset, proper sizes attributes

## Usage Options

### 1. Automatic Processing (Recommended)
Just use regular `<img>` tags - they'll be automatically optimized:

```html
<!-- Basic usage -->
<img src="/assets/images/my-photo.jpg" alt="Description" />

<!-- With custom CSS classes -->
<img src="/assets/images/hero.png" alt="Hero image" class="w-full h-64 object-cover" />
```

### 2. Per-Image Overrides
Use `eleventy:*` attributes to customize specific images:

```html
<!-- Override widths for a specific image -->
<img src="/assets/images/hero.jpg" 
     alt="Large hero image"
     eleventy:widths="400,800,1200"
     sizes="(max-width: 768px) 100vw, 50vw" />

<!-- Use different formats -->
<img src="/assets/images/logo.png" 
     alt="Company logo"
     eleventy:formats="png,webp"
     eleventy:widths="100,200" />

<!-- Skip optimization entirely -->
<img src="/assets/images/small-icon.png" 
     alt="Decorative icon"
     eleventy:ignore />
```

### 3. Specialized Shortcodes
Use purpose-built shortcodes for common patterns:

#### Header/Logo Images (96px, 192px)
```liquid
{% headerImage "/assets/images/logo.png", "Company logo" %}
```

#### Hero Images (400px, 800px, 1200px) 
```liquid
{% heroImage "/assets/images/banner.jpg", "Hero banner" %}
{% heroImage "/assets/images/banner.jpg", "Hero banner", "(max-width: 1200px) 100vw, 1200px" %}
```

#### Content Images (300px, 600px, 900px)
```liquid
{% contentImage "/assets/images/article-photo.jpg", "Article photo" %}
{% contentImage "/assets/images/diagram.png", "Process diagram", "600px" %}
```

## File Size Savings

**Before optimization** (header images):
- sea-serpent-billboard.png: 3.3MB
- gargoyle.png: 3.1MB  
- sea-serpent.png: 3.4MB

**After optimization** (96px display):
- AVIF: ~2.4KB (99.9% smaller)
- WebP: ~3.6KB (99.9% smaller)  
- JPEG: ~1.7KB (99.9% smaller)

## Development vs Production

- **Development** (`npm run dev`): Images optimized on-request for faster builds
- **Production** (`npm run build`): All images pre-optimized during build

## Advanced Usage

### Custom Sizes Attribute
Always include proper `sizes` for responsive images:

```html
<!-- For images that scale with viewport -->
<img src="/assets/images/responsive.jpg" 
     alt="Responsive image"
     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px" />

<!-- For fixed-size images -->
<img src="/assets/images/thumbnail.jpg" 
     alt="Thumbnail" 
     sizes="150px" />
```

### Format-Specific Optimizations
```html
<!-- Preserve transparency -->
<img src="/assets/images/logo.png" 
     alt="Logo with transparency"
     eleventy:formats="avif,png" />

<!-- Optimize for screenshots -->
<img src="/assets/images/screenshot.png" 
     alt="App screenshot"
     eleventy:formats="webp,png"
     eleventy:widths="600,1200" />
```

## Best Practices

1. **Always include alt attributes** - Required for accessibility
2. **Use appropriate sizes** - Match your CSS layout
3. **Choose the right approach**:
   - HTML transform for most images
   - Overrides for special cases  
   - Shortcodes for consistent patterns
4. **Test responsive behavior** - Check images at different screen sizes
5. **Monitor file sizes** - Use browser dev tools to verify savings

## Troubleshooting

### Image not optimizing?
- Check file path is correct
- Ensure image exists in `src/assets/images/`
- Verify no `eleventy:ignore` attribute

### Wrong sizes generated?
- Add explicit `eleventy:widths` attribute
- Check your `sizes` attribute matches CSS
- Consider using a specialized shortcode

### Build errors?
- Ensure all images have alt attributes
- Check for malformed `eleventy:*` attributes
- Verify image files aren't corrupted