const fs = require("node:fs");
const path = require("node:path");

const reportsDirectory = path.join(process.cwd(), "reports", "lighthouse");
const categories = ["performance", "accessibility", "seo"];

if (!fs.existsSync(reportsDirectory)) {
  console.error(`Lighthouse reports directory not found: ${reportsDirectory}`);
  process.exitCode = 1;
  return;
}

const resultsByRoute = new Map();

for (const fileName of fs.readdirSync(reportsDirectory)) {
  if (!fileName.endsWith(".json")) continue;

  const filePath = path.join(reportsDirectory, fileName);

  try {
    const report = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!report || typeof report !== "object" || !report.categories) continue;

    const reportUrl = report.finalUrl || report.finalDisplayedUrl || report.requestedUrl;
    if (!reportUrl) continue;

    const url = new URL(reportUrl);
    const pathname = url.pathname.replace(/^\/abc-design(?=\/|$)/, "") || "/";
    const route = `${pathname}${url.search}`;
    const timestamp = Date.parse(report.fetchTime || "") || fs.statSync(filePath).mtimeMs;
    const scores = Object.fromEntries(
      categories.map((category) => {
        const score = report.categories[category]?.score;
        return [category, typeof score === "number" ? Math.round(score * 100) : "—"];
      })
    );

    const previous = resultsByRoute.get(route);
    if (!previous || timestamp >= previous.timestamp) {
      resultsByRoute.set(route, { route, timestamp, ...scores });
    }
  } catch {
    // Ignore JSON files that are not valid Lighthouse results.
  }
}

const results = [...resultsByRoute.values()].sort((a, b) =>
  a.route.localeCompare(b.route)
);

if (results.length === 0) {
  console.error(`No Lighthouse JSON reports found in: ${reportsDirectory}`);
  process.exitCode = 1;
  return;
}

console.table(
  results.map(({ route, performance, accessibility, seo }) => ({
    Route: route,
    Performance: performance,
    Accessibility: accessibility,
    SEO: seo
  }))
);
