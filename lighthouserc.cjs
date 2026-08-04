const fs = require("node:fs");
const path = require("node:path");

const outputDirectory = path.join(__dirname, "_site");

function findHtmlPages(directory, relativeDirectory = "") {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.join(relativeDirectory, entry.name);
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) return findHtmlPages(fullPath, relativePath);
    return entry.isFile() && entry.name.endsWith(".html")
      ? [relativePath.split(path.sep).join("/")]
      : [];
  });
}

const auditUrls = findHtmlPages(outputDirectory).map(
  (pagePath) => `http://localhost:8089/abc-design/${pagePath}`
);

module.exports = {
  ci: {
    collect: {
      url: auditUrls,
      startServerCommand: "npx @11ty/eleventy --serve --port=8089",
      startServerReadyPattern: "Server at",
      numberOfRuns: 1,
      settings: {
        onlyCategories: ["performance", "accessibility", "seo"]
      }
    },
    upload: {
      target: "filesystem",
      outputDir: "./reports/lighthouse"
    }
  }
};
