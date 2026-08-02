const projectSources = [
  ["parke-ivy", "parke-ivy.json"],
  ["darkhorse-coffee", "darkhorse-coffee.json"],
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
    project.projectType.toLowerCase().includes("accessory dwelling unit")
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

module.exports = projectSources.map(([assetFolder, fileName], index, projects) => {
  const project = require(`../projects/data/${fileName}`);

  return {
    ...project,
    assetFolder,
    serviceIcons: getServiceIcons(project),
    previousSlug: projects[index - 1]?.[0] ? require(`../projects/data/${projects[index - 1][1]}`).slug : null,
    nextSlug: projects[index + 1]?.[0] ? require(`../projects/data/${projects[index + 1][1]}`).slug : null
  };
});
