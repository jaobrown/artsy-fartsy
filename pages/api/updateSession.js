import { updateSession } from '../../vendors/fauna'
export default async function handler(req, res) {
  const session = req.body
  console.log(
    '🚀 ~ file: updateSession.js ~ line 4 ~ handler ~ session',
    session
  )

  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' })
  }

  try {
    const updatedSession = await updateSession(session)
    return res.status(200).json(updatedSession)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Something went wrong.' })
  }
}
