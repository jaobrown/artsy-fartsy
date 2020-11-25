import { deleteSession } from "../../utils/fauna";
export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  try {
    const deleted = await deleteSession(req.body);
    return res.status(200).json(deleted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
}
