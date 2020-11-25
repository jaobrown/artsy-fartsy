import { createSession } from "../../utils/fauna";
export default async function handler(req, res) {
  const session = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  try {
    const createdSession = await createSession(session);
    return res.status(200).json(createdSession);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
}
