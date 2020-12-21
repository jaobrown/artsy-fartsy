import { getSessions } from '@/vendors/fauna'
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405)
  }

  try {
    const sessions = await getSessions()
    return res.status(200).json(sessions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Something went wrong.' })
  }
}
