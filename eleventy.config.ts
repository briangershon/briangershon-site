import { UserConfig } from "@11ty/eleventy";
import rssPlugin from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig: any) {
  // Add RSS plugin
  eleventyConfig.addPlugin(rssPlugin);

  // Set directories
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setDataDirectory("_data");

  // Set template formats
  eleventyConfig.setTemplateFormats(["html", "liquid", "md"]);

  // Set Liquid as the template engine for markdown
  // eleventyConfig.setMarkdownTemplateEngine("liquid"); // Remove this - not available in v3

  // Copy other assets but not CSS (we'll process CSS separately)
  eleventyConfig.addPassthroughCopy({"src/assets/images": "assets/images"});

  // Watch for changes
  eleventyConfig.addWatchTarget("src/assets/css/");

  // Collections
  eleventyConfig.addCollection("posts", (collectionApi: EleventyCollectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a: EleventyCollectionItem, b: EleventyCollectionItem) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  // Filters
  eleventyConfig.addFilter("dateDisplay", (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  });

  eleventyConfig.addFilter("limit", (array: any[], count: number) => {
    return array.slice(0, count);
  });

  eleventyConfig.addFilter("rssDate", (date: Date) => {
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("rssLastUpdatedDate", (collection: any[]) => {
    if (!collection || collection.length === 0) {
      return new Date().toISOString();
    }
    
    const latest = collection.reduce((latest, item) => {
      const itemDate = new Date(item.date);
      const latestDate = new Date(latest.date);
      return itemDate > latestDate ? item : latest;
    });
    
    return new Date(latest.date).toISOString();
  });

  // Create sitemap
  eleventyConfig.addCollection("sitemap", (collectionApi: EleventyCollectionApi) => {
    return collectionApi.getAll().filter((item: EleventyCollectionItem) => item.data.sitemap !== false);
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