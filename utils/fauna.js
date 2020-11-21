const faunadb = require("faunadb");
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

const getImages = async () => {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("images"))),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  );

  const images = data.map((image) => {
    image.id = image.ref.id;
    delete image.ref;
    return image;
  });

  return images;
};

const getImageById = async () => {
  // todo: get image by ID
};

const createImage = async (image_url, time = 180000) => {
  return await faunaClient.query(
    q.Create(q.Collection("images"), { data: { image_url, time } })
  );
};

const updateImage = async () => {
  // todo: update time
};

const deleteImage = async () => {
  // todo: update time
};

module.exports = {
  getImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
};
