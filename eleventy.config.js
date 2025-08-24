import rssPlugin from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  // Add RSS plugin
  eleventyConfig.addPlugin(rssPlugin);

  // Set directories
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setDataDirectory("_data");

  // Set template formats
  eleventyConfig.setTemplateFormats(["html", "liquid", "md"]);

  // Copy other assets but not CSS (we'll process CSS separately)
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });

  // Watch for changes
  eleventyConfig.addWatchTarget("src/assets/css/");

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

  eleventyConfig.addFilter("rssDate", (date) => {
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("rssLastUpdatedDate", (collection) => {
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
