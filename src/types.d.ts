declare module "@11ty/eleventy-plugin-rss";
declare module "@11ty/eleventy";

interface EleventyCollectionApi {
  getFilteredByGlob(glob: string): any[];
  getAll(): any[];
}

interface EleventyCollectionItem {
  date: Date;
  data: any;
  url: string;
}
