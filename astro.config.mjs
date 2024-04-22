import { defineConfig } from 'astro/config';
import remarkToc from 'remark-toc';
import rehypePrettyCode from "rehype-pretty-code";
import sitemap from '@astrojs/sitemap';
import mdx from "@astrojs/mdx";
import vercel from '@astrojs/vercel/serverless';
import expressiveCode from "astro-expressive-code";

const prettyCodeOptions = {
  theme: "github-dark",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{
        type: "text",
        value: " "
      }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
  tokensMap: {}
};


const sitemapBlockList = [
]

// https://astro.build/config
export default defineConfig({
  server: {
    port: 8000
  },
  compressHTML: false,
  redirects: {
    "/discord": "https://discord.gg/zKc2kx5C6W",
  },
  site: 'https://vtubers.tv',
  markdown: {
    remarkPlugins: [remarkToc],
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    drafts: false,
    shikiConfig: {
      langs: ["javascript", "typescript", "css", "html", "shell", "json", "yaml", "bash", "scss", "java", "python", "ruby", "php", "c", "c++", "go", "rust"]
    }
  },
  integrations: [sitemap({
    filter: page => !sitemapBlockList.includes(page),
    changefreq: "always"
  }), expressiveCode({
    themes: ['github-dark', 'github-light'],
  }), mdx()],
  output: 'server',
  adapter: vercel(),
  build: {
    inlineStylesheets: `never`
  },
});