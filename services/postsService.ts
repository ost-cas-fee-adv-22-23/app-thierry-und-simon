import { decodeTime } from 'ulid'
import { fetchUser } from './userServices'
import { RawMumble, QwackerMumbleResponse } from '../Types/Mumble'

export const fetchMumbles = async (params?: {
  limit?: number
  offset?: number
  newerThanMumbleId?: string
}) => {
  const { limit, offset, newerThanMumbleId } = params || {}

  const url = `${
    process.env.NEXT_PUBLIC_QWACKER_API_URL
  }/posts?${new URLSearchParams({
    limit: limit?.toString() || '10',
    offset: offset?.toString() || '0',
    newerThan: newerThanMumbleId || ''
  })}`

  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json'
    }
  })
  const { count, data } = (await res.json()) as QwackerMumbleResponse

  const mumbles = data.map(transformMumble)

  return {
    count,
    mumbles
  }
}

export const fetchMumblesWithUser = async (accessToken: string) => {
  try {
    const { count, mumbles } = await fetchMumbles()
    const mumblesWithUser = await Promise.all(
      mumbles.map(async (mumble) => {
        const user = await fetchUser(accessToken, mumble.creator)
        mumble.user = user
        return mumble
      })
    )
    return {
      count,
      mumbles: mumblesWithUser
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchResponseToMumble = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts/${id}/replies`
    const res = await fetch(url)
    const responses = await res.json()
    console.log(responses)
    return responses
  } catch (error) {
    console.log(error)
  }
}

export const fetchSingleMumble = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts/${id}`
    const res = await fetch(url)
    const mumble = await res.json()
    return mumble
  } catch (error) {
    console.log(error)
  }
}
const transformMumble = (mumble: RawMumble) => ({
  ...mumble,
  createdTimestamp: decodeTime(mumble.id)
})
