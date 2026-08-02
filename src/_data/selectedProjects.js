const projectSources = [
  ["parke-ivy", "parke-ivy.json"],
  ["darkhorse-coffee", "darkhorse-coffee.json"],
  ["ocean-beach", "oceanbeach-adu.json"],
  ["rolando-remodel", "rolando-remodel.json"],
  ["achilles-no-3", "achilles-no-3.json"],
  ["chula-tacos", "chula-tacos.json"]
];

module.exports = projectSources.map(([assetFolder, fileName], index, projects) => {
  const project = require(`../projects/data/${fileName}`);

  return {
    ...project,
    assetFolder,
    previousSlug: projects[index - 1]?.[0] ? require(`../projects/data/${projects[index - 1][1]}`).slug : null,
    nextSlug: projects[index + 1]?.[0] ? require(`../projects/data/${projects[index + 1][1]}`).slug : null
  };
});
