import { updateSession } from '@/vendors/fauna'
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' })
  }

  try {
    const updatedSession = await updateSession(
      req.body.session,
      req.body.sessionId
    )
    // const updatedSession = 'haha'
    return res.status(200).json(updatedSession)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Something went wrong.' })
  }
}
