const faunadb = require('faunadb')
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET })
const q = faunadb.query

//
// Sessions
//

const getSessions = async () => {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('sessions'))),
      q.Lambda('ref', q.Get(q.Var('ref')))
    )
  )

  const sessions = data.map((session) => {
    session.id = session.ref.id
    delete session.ref
    return session
  })

  return sessions
}

const getSessionById = async (id) => {
  const session = await faunaClient.query(
    q.Get(q.Ref(q.Collection('sessions'), id))
  )
  session.id = session.ref.id
  delete session.ref
  return session
}

const createSession = async (session) => {
  return await faunaClient.query(
    q.Create(q.Collection('sessions'), { data: { session } })
  )
}

const updateSession = async ({ data, id }) => {
  return await faunaClient.query(
    q.Update(q.Ref(q.Collection('sessions'), id), {
      data: { data },
    })
  )
}

const deleteSession = async (id) => {
  return await faunaClient.query(q.Delete(q.Ref(q.Collection('sessions'), id)))
}

module.exports = {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
  getSessionById,
}
