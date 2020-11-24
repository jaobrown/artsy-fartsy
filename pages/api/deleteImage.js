import { deleteImage } from "../../utils/cloudinary";
export default async function handler(req, res) {
  const { public_id } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  try {
    const deletedImage = await deleteImage(public_id);
    return res.status(200).json(deletedImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
}
