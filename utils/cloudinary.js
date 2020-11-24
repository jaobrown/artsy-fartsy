const cloudinary = require("cloudinary");

const deleteImage = async (id) => {
  cloudinary.config({
    cloud_name: "koda-studio",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  cloudinary.v2.uploader.destroy(id);

  return id;
};

module.exports = {
  deleteImage,
};
