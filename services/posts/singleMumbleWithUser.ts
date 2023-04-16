import { fetchUser } from '../userServices'
import { fetchResponseToMumble } from './responseToMumble'

export const fetchSingleMumbleWithUser = async ({ id, accessToken }: any) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts/${id}`
    const res = await fetch(url)
    const mumble = await res.json()

    const user = await fetchUser(accessToken, mumble.creator)
    mumble.user = user

    const responses = await fetchResponseToMumble(id)
    mumble.responses = responses

    let index = 0
    for await (const response of responses) {
      console.log(response)
      const user = await fetchUser(accessToken, response.creator)
      mumble.responses[index].user = user
      index++
    }

    return mumble
  } catch (error) {
    console.log(error)
  }
}

export default fetchSingleMumbleWithUser
