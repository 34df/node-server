require('dotenv').config();

const cloudinary = require("cloudinary");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.cloudUpload = async (filePath, location, folder, width, height) => {
  return await cloudinary.uploader.upload(
    filePath,
    async function (result) {
      try {
        let fileName = filePath.split('uploads/')[1];
        let uniqueFileName = result.secure_url.split('/');
        await exec(`mv ${appRoot}/uploads/'${fileName}' ${appRoot}/uploads/${location}/${uniqueFileName[uniqueFileName.length - 1]}`);
      } catch (e) {
        ERROR(e);
        console.error(e);
      };
    },
    {
      folder: `YOUR_PROJECT_NAME_HERE/${folder}`,
      use_filename: true,
      width: width ? width : 1,
      height: height ? height : 1,
      crop: "scale"
    }
  );
};
