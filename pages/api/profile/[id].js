import { fetchProfile } from '../../../services/qwacker'
import { getToken } from 'next-auth/jwt'

export default async function getProfile(req, res) {
  const { id } = req.query
  const secret = process.env.NEXTAUTH_SECRET

  const token = await getToken({ req, secret })
  const user = await fetchProfile(token?.accessToken, id)

  res.status(200).json({ user })
}
