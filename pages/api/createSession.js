import { createSession } from "../../utils/fauna";
export default async function handler(req, res) {
  const { images } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  try {
    const createdSession = await createSession(images);
    return res.status(200).json(createdSession);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
}
