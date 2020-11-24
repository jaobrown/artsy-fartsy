const deleteImage = async (id) => {
  const cloudinary = require("cloudinary");
  cloudinary.config({
    cloud_name: "koda-studio",
    api_key: "443696937154359",
    api_secret: "8S2xfjTVcEWxls8lqt5LGGb-Nug",
  });

  cloudinary.v2.uploader.destroy(id);

  return id;
};

module.exports = {
  deleteImage,
};
