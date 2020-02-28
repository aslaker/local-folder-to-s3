const watch = require("node-watch");
const AWS = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();

const s3 = new AWS.S3();

const watchedFilesPath = `${__dirname}/files`;

if (!fs.existsSync(watchedFilesPath)) {
  fs.mkdirSync(watchedFilesPath);
}

watch(watchedFilesPath, { recursive: true }, (evt, name) => {
  console.log("%s changed", name);
});
