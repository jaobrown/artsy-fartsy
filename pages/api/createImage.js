import { createImage } from "../../utils/fauna";
export default async function handler(req, res) {
  const { imageUrl, time } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  try {
    const createdImage = await createImage(imageUrl, time);
    return res.status(200).json(createdImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
}
