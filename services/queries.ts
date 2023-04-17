import { MumbleType, QwackerMumbleResponse } from '../types/Mumble'
import { transformMumble } from '../utils/helperFunctions'

export const fetchSingleMumbleWithUser = async ({ id, accessToken }: any) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts/${id}`
    const res = await fetch(url)
    const mumble = await res.json()

    const user = await fetchProfile(accessToken, mumble.creator)
    mumble.user = user

    const responses = await fetchResponseToMumble(id)
    mumble.responses = responses

    let index = 0
    for await (const response of responses) {
      console.log(response)
      const user = await fetchProfile(accessToken, response.creator)
      mumble.responses[index].user = user
      index++
    }

    return mumble
  } catch (error) {
    console.log(error)
  }
}

export const fetchMumbles = async (params?: {
  limit?: number
  offset?: number | string
  newerThanMumbleId?: string
  creator?: string
}) => {
  const { limit, offset, newerThanMumbleId, creator } = params || {}

  const url = `${
    process.env.NEXT_PUBLIC_QWACKER_API_URL
  }/posts?${new URLSearchParams({
    limit: limit?.toString() || '10',
    offset: offset?.toString() || '0',
    newerThan: newerThanMumbleId || '',
    creator: creator || ''
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

export const fetchMumblesWithUser = async ({
  accessToken,
  offset,
  limit,
  creator
}: any) => {
  try {
    const { count, mumbles } = await fetchMumbles({
      offset,
      limit,
      creator
    })
    const mumblesWithUser = await Promise.all(
      mumbles.map(async (mumble: MumbleType) => {
        const user = await fetchProfile(accessToken, mumble.creator)
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

export const fetchProfile = async (accessToken: string, id: string) => {
  const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}users/${id}`

  const res = await fetch(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  const user = await res.json()
  return user
}
