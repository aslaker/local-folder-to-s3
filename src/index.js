const watch = require("node-watch");
const AWS = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const bucketName = "mining-game-assets";

const watchedFilesPath = `${__dirname}/files`;

if (!fs.existsSync(watchedFilesPath)) {
  fs.mkdirSync(watchedFilesPath);
}

watch(watchedFilesPath, { recursive: true }, (evt, filePath) => {

  //Get the filename
  const fileName = filePath.replace(/^.*[\\\/]/, "");

  // On File Add or Update
  if (evt === "update") {
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;

      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: JSON.stringify(data, null, 2)
      };

      s3.upload(params, (s3Err, data) => {
        console.log("UPLOADING...")
        if (s3Err) throw s3Err;
        console.log(`File Uploaded Successfully at ${data.Location}`);
      });
    });
  }

  // On File Remove
  if (evt === "remove") {
    const params = {
      Bucket: bucketName,
      Key: fileName
    };

    s3.deleteObject(params, (s3Err, data) => {
      console.log("DELETING...")
      if (s3Err) throw s3Err;
      console.log(`Successfully deleted ${data.Location}`);
    });
  }
});
