import { getImages } from "../../utils/fauna";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405);
  }

  try {
    const images = await getImages();
    return res.status(200).json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
}
