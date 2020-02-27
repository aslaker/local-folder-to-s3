const watch = require("node-watch");

watch("/src/files", { recursive: true }, (evt, name) => {
  console.log("%s changed", name);
});
