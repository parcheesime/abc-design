# ABC Design & Drafting

This repository contains the website for ABC Design & Drafting, a building-design business serving residential and commercial projects throughout San Diego County.

The site communicates available services, showcases completed work, explains the design and permitting process, and provides a straightforward path for prospective clients to get in touch.

## Technology

- [Eleventy](https://www.11ty.dev/) with Nunjucks templates
- CSS and vanilla JavaScript
- Formspree for contact-form delivery
- Lighthouse CI for automated quality checks
- GitHub Actions and GitHub Pages for deployment

## Local development

Node.js and npm are required.

```bash
npm ci
npm start
```

`npm start` runs the Eleventy development server. To create a production build in `_site/`:

```bash
npm run build
```

To build the site and run the configured Lighthouse CI checks:

```bash
npm run test:lighthouse
```

## Repository structure

```text
src/                       Site templates, data, styles, scripts, and images
src/_includes/             Shared Nunjucks layouts and components
src/projects/data/         Public portfolio project data
scripts/                   Local quality-report utilities
.github/workflows/         GitHub Pages deployment workflow
.eleventy.js               Eleventy configuration
lighthouserc.cjs           Lighthouse CI configuration
```

## Quality and privacy

The site uses responsive layouts, semantic HTML, keyboard-accessible controls, explicit image dimensions, lazy-loaded project cards, and automated Lighthouse checks. Accessibility and performance are reviewed as ongoing quality practices; no claim of perfect conformance is made.

Original client documents, private project source material, and other identifying working files are intentionally excluded from this public repository.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy-pages.yml`. The workflow installs dependencies with `npm ci`, builds the Eleventy site, and deploys the generated `_site/` artifact to GitHub Pages.

## License

No open-source license is currently provided. Unless a license is added, the repository's contents remain subject to the copyright holder's rights.
