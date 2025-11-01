# Agent and LLM Rules

# Repository And Deployment Rules

1. Use npm for package manager
2. Use JavaScript for all code and not TypeScript
3. Use Eleventy with Liquid templates for all frontend code
4. Use Prettier for all linting and formatting
5. Use GitHub for version control
6. Use GitHub Actions for CI/CD
7. Use Vercel for web deployment
8. Use Tailwind for CSS

# Documentation

9. Find documentation using context7 MCP server

# Blog Content

10. Content is in markdown with frontmatter
11. To test the site and also content SEO, use the `npm run build` command

## Blog Frontmatter Rules

12. All blog posts must include these required frontmatter fields:
    - `slug`: URL-friendly identifier matching the markdown filename
    - `title`: Post title (use quotes when containing special characters)
    - `date`: Format `YYYY-MM-DD` (e.g., `2025-04-09`)
    - `summary_text`: Brief 1-2 sentence description in quotes
    - `primary_image`: Full-size hero image URL
    - `summary_banner`: Banner/slice image URL
    - `layout`: Always set to `layouts/post.liquid`

13. Blog posts may include these optional frontmatter fields:
    - `tags`: Array of tags (often empty `[]`)
    - `image_credit`: HTML anchor tag with photographer attribution (e.g., `<a href="https://unsplash.com/@username">@username</a>`)
    - `hashtags`: Array of strings without # symbol (e.g., `["polygon", "blockchain"]`)
    - `draft`: Boolean, set to `false` to indicate non-draft status

14. Frontmatter field order convention:
    1. slug
    2. title
    3. date
    4. summary_text
    5. summary_banner
    6. primary_image
    7. image_credit (if included)
    8. tags (if included)
    9. hashtags (if included)
    10. draft (if included)
    11. layout

## Blog Content Writing Guidelines

15. Use a conversational, first-person tone that is educational and personal
    - Use "I", "my", "we" to share personal narrative
    - Use "you" to engage the reader
    - Keep technical concepts accessible while maintaining accuracy

16. Structure blog posts with clear organization:
    - Opening paragraph: Provide context, problem statement, or clear goal
    - Use `##` (H2) headers to organize content into logical sections
    - Keep paragraphs concise: 1-4 sentences each
    - Common section headers: "Overview", "Goal", "What is...", "How to...", "In Conclusion", "Thank you"
    - Optional: Include "Thank you" sections to acknowledge collaborators or community

17. Format content elements consistently:
    - Use bulleted (`-`) or numbered lists for clarity
    - Use blockquotes (`>` or `<blockquote>`) for important callouts
    - Code blocks: Fenced with triple backticks and language identifier (e.g., ` ```js `)
    - Links: Use markdown format `[text](url)` or HTML `<a>` tags when needing `target="_blank"` attributes
    - Images: Always use HTML `<img>` tags with descriptive `alt` attributes (not markdown image syntax)

18. Include walk-throughs and explanations:
    - Step-by-step explanations with numbered lists
    - Code examples with context and explanation
    - Links to code repositories, demos, and documentation
    - Screenshots or diagrams when helpful for understanding

## Image Storage and Hosting Rules

19. All blog post images must be hosted at `https://assets.stashfive.com/images/`

20. Image URL pattern: `https://assets.stashfive.com/images/[slug]/[filename]`
    - `[slug]`: The blog post slug from frontmatter
    - `[filename]`: Descriptive filename for the image

21. Standard image filenames for blog posts:
    - `full.jpeg`: Primary/hero image (referenced in frontmatter `primary_image`)
    - `slice.jpeg`: Banner/summary image (referenced in frontmatter `summary_banner`)
    - Additional images: Use descriptive names (e.g., `walkthru-1.png`, `screenshot-dashboard.png`)

22. Image format guidelines:
    - Use JPEG (.jpg, .jpeg) for photographs
    - Use PNG (.png) for screenshots, diagrams, and images requiring transparency
    - Always include descriptive `alt` attributes for accessibility

23. Image references in markdown:

    ```html
    <img
      src="https://assets.stashfive.com/images/[slug]/[filename]"
      alt="descriptive text"
    />
    ```

    - Use HTML `<img>` tags, not markdown image syntax
    - Always include `alt` attribute
    - May include `width="100%"` for full-width images if needed
