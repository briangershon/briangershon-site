import rssPlugin from "@11ty/eleventy-plugin-rss";
import Image from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  // Add RSS plugin
  eleventyConfig.addPlugin(rssPlugin);

  // Add RSS plugin filters for Liquid templates
  eleventyConfig.addLiquidFilter("dateToRfc822", rssPlugin.dateToRfc822);
  eleventyConfig.addLiquidFilter("dateToRfc3339", rssPlugin.dateToRfc3339);
  eleventyConfig.addLiquidFilter("getNewestCollectionItemDate", rssPlugin.getNewestCollectionItemDate);

  // Note: eleventyImageTransformPlugin removed to prevent processing external images
  // External images in blog posts load directly from CDN without transformation
  // Local images are still optimized via shortcodes below

  // Add specialized image shortcodes for different use cases
  
  // Header/Logo Images: Small, optimized for 96px display
  eleventyConfig.addShortcode("headerImage", async function (src, alt) {
    let html = await Image(src, {
      widths: [96, 192],
      formats: ["avif", "webp", "jpeg"],
      returnType: "html",
      htmlOptions: {
        imgAttributes: {
          alt,
          sizes: "96px",
          loading: "lazy",
          decoding: "async",
          "eleventy:ignore": "" // Prevent double-processing
        }
      }
    });
    return html;
  });

  // Hero Images: Large responsive images for banners/heroes
  eleventyConfig.addShortcode("heroImage", async function (src, alt, sizes = "(max-width: 768px) 100vw, 50vw") {
    let html = await Image(src, {
      widths: [400, 800, 1200],
      formats: ["avif", "webp", "jpeg"],
      returnType: "html",
      htmlOptions: {
        imgAttributes: {
          alt,
          sizes,
          loading: "lazy",
          decoding: "async",
          "eleventy:ignore": "" // Prevent double-processing
        }
      }
    });
    return html;
  });

  // Content Images: Medium sizes for blog posts and articles
  eleventyConfig.addShortcode("contentImage", async function (src, alt, sizes = "(max-width: 600px) 100vw, 600px") {
    let html = await Image(src, {
      widths: [300, 600, 900],
      formats: ["avif", "webp", "jpeg"],
      returnType: "html",
      htmlOptions: {
        imgAttributes: {
          alt,
          sizes,
          loading: "lazy",
          decoding: "async",
          "eleventy:ignore": "" // Prevent double-processing
        }
      }
    });
    return html;
  });

  // Set directories
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setDataDirectory("_data");

  // Set template formats
  eleventyConfig.setTemplateFormats(["html", "liquid", "md"]);

  // Copy images for the HTML transform to process
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });

  // Watch for changes
  eleventyConfig.addWatchTarget("src/assets/css/");

  // Don't ignore blog posts even though they're in .gitignore
  // (they're API-generated and we need Eleventy to process them)
  eleventyConfig.setUseGitIgnore(false);

  // Collections
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  // Filters
  eleventyConfig.addFilter("dateDisplay", (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  });

  eleventyConfig.addFilter("limit", (array, count) => {
    return array.slice(0, count);
  });

  // Create sitemap
  eleventyConfig.addCollection("sitemap", (collectionApi) => {
    return collectionApi.getAll().filter((item) => item.data.sitemap !== false);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["html", "liquid", "md"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
}
