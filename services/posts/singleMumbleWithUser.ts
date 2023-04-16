import { fetchUser } from '../userServices'

export const fetchSingleMumbleWithUser = async (
  id: string,
  accessToken: string
) => {
  console.log(id)
  console.log(accessToken)
  try {
    const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts/${id}`
    const res = await fetch(url)
    const mumble = await res.json()

    const user = await fetchUser(accessToken, mumble.creator)
    mumble.user = user

    return mumble
  } catch (error) {
    console.log(error)
  }
}

export default fetchSingleMumbleWithUser
