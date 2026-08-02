const fs = require("node:fs");
const path = require("node:path");

const projectSources = [
  ["parke-ivy", "parke-ivy.json"],
  ["darkhorse-coffee", "darkhorse-coffee.json"],
  ["lajolla-remodel", "la-jolla.json"],
  ["mid-city-remodel", "mid-city-remodel.json"],
  ["ocean-beach", "oceanbeach-adu.json"],
  ["rolando-remodel", "rolando-remodel.json"],
  ["achilles-no-3", "achilles-no-3.json"],
  ["chula-tacos", "chula-tacos.json"]
];

const serviceIconByCategory = {
  residential: { label: "Residential Design", file: "residential.svg" },
  commercial: { label: "Commercial Design", file: "commercial.svg" },
  adu: { label: "ADUs", file: "adu.svg" },
  "plans-permits": { label: "Plans & Permits", file: "plans.svg" },
  "multi-family": { label: "Residential Design", file: "residential.svg" },
  "project-management": { label: "Project Management", file: "management.svg" }
};

function getServiceIcons(project) {
  const categories = (Array.isArray(project.category) ? project.category : [project.category])
    .filter(Boolean)
    .map((category) => category.trim().toLowerCase());

  const designCategories = categories.filter((category) => category !== "project-management");

  if (
    designCategories.includes("residential") &&
    (project.projectType || "").toLowerCase().includes("accessory dwelling unit")
  ) {
    designCategories.splice(designCategories.indexOf("residential"), 1, "adu");
  }

  const orderedCategories = [...designCategories, "plans-permits"];

  if (categories.includes("project-management")) {
    orderedCategories.push("project-management");
  }

  return orderedCategories.reduce((icons, category) => {
    const icon = serviceIconByCategory[category];

    if (icon && !icons.some(({ file }) => file === icon.file)) {
      icons.push(icon);
    }

    return icons;
  }, []);
}

function getImageFile(image) {
  return typeof image === "string" ? image : image?.image || image?.src;
}

function getImageAlt(image, projectTitle, kind) {
  if (typeof image !== "string" && image?.alt) {
    return image.alt;
  }

  const fileName = getImageFile(image) || "";
  const subject = fileName
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+(st|nd|rd|th)-/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\ba\d+\b/i, "plan sheet")
    .trim();

  return `${subject ? `${subject} ` : ""}${kind} for ${projectTitle}`;
}

function resolveImage(assetFolder, fileName) {
  if (!fileName) {
    return null;
  }

  const projectDirectory = path.join(__dirname, "..", "assets", "images", "projects", assetFolder);
  const requestedPath = path.join(projectDirectory, fileName);

  if (fs.existsSync(requestedPath)) {
    return fileName;
  }

  const baseName = fileName.replace(/\.[^.]+$/, "");
  return [".pdf", ".png", ".jpg", ".jpeg"]
    .map((extension) => `${baseName}${extension}`)
    .find((candidate) => fs.existsSync(path.join(projectDirectory, candidate))) || null;
}

function normalizeImages(images, projectTitle, kind, assetFolder) {
  return (Array.isArray(images) ? images : [])
    .map((image) => ({
      src: getImageFile(image),
      title: typeof image === "string" ? null : image.title || null,
      alt: getImageAlt(image, projectTitle, kind),
      resolvedSrc: resolveImage(assetFolder, getImageFile(image))
    }))
    .filter(({ src, resolvedSrc }) => src && resolvedSrc)
    .map((image) => ({ ...image, isPdf: image.resolvedSrc.endsWith(".pdf") }));
}

function normalizeProject(project, assetFolder) {
  const gallery = normalizeImages(project.gallery, project.title, "project image", assetFolder);
  const planImages = normalizeImages(project.planImages, project.title, "drawing", assetFolder);
  const projectType = project.projectType || project.projectDetails?.projectType;
  const services = project.services || project.service || [];
  const details = Array.isArray(project.projectDetails)
    ? project.projectDetails
    : project.projectDetails?.scope || [];
  const coverImage = project.coverImage || gallery[0]?.src;
  const coverAlt = gallery.find(({ src }) => src === coverImage)?.alt || `${project.title} project`;

  return {
    ...project,
    projectType,
    services,
    details,
    description: Array.isArray(project.description) ? project.description : [],
    highlights: Array.isArray(project.highlights) ? project.highlights : [],
    coverImage,
    coverAlt,
    gallery,
    planImages
  };
}

module.exports = projectSources.map(([assetFolder, fileName], index, projects) => {
  const project = normalizeProject(require(`../projects/data/${fileName}`), assetFolder);

  return {
    ...project,
    assetFolder,
    serviceIcons: getServiceIcons(project),
    previousSlug: projects[index - 1]?.[0] ? require(`../projects/data/${projects[index - 1][1]}`).slug : null,
    nextSlug: projects[index + 1]?.[0] ? require(`../projects/data/${projects[index + 1][1]}`).slug : null
  };
});
