const faunadb = require("faunadb");
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

//
// Images
//

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

const createImage = async (image_url) => {
  return await faunaClient.query(
    q.Create(q.Collection("images"), { data: { image_url } })
  );
};

const deleteImage = async (id) => {
  return await faunaClient.query(q.Delete(q.Ref(q.Collection("images"), id)));
};

//
// Sessions
//

const getSessions = async () => {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("sessions"))),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  );

  const sessions = data.map((session) => {
    session.id = session.ref.id;
    delete session.ref;
    return session;
  });

  return sessions;
};

const createSession = async (session) => {
  return await faunaClient.query(
    q.Create(q.Collection("sessions"), { data: { session } })
  );
};

const getSessionById = async (id) => {
  const session = await faunaClient.query(
    q.Get(q.Ref(q.Collection("sessions"), id))
  );
  session.id = session.ref.id;
  delete session.ref;
  return session;
};

module.exports = {
  getImages,
  createImage,
  deleteImage,
  getSessions,
  createSession,
  getSessionById,
};
