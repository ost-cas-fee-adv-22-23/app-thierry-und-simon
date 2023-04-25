import {
  MumbleType,
  QwackerMumbleResponse,
  FetchMumblePropsType,
  FetchSingleMumbleWithUserPropsType
} from '../types/Mumble'
import { transformMumble } from '../utils/helperFunctions'

export const fetchSingleMumble = async (id: string, accessToken?: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}posts/${id}`
    const res = await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    const mumble = await res.json()
    const responses = await fetchResponseToMumble(id)
    mumble.responses = responses

    return mumble
  } catch (error) {
    console.log(error)
  }
}

export const fetchSingleMumbleWithUser = async ({
  id,
  accessToken
}: FetchSingleMumbleWithUserPropsType) => {
  try {
    const mumble = await fetchSingleMumble(id, accessToken)

    if (accessToken) {
      const user = await fetchProfile(mumble.creator, accessToken)
      mumble.user = user

      let index = 0
      for await (const response of mumble.responses) {
        const user = await fetchProfile(response.creator, accessToken)
        mumble.responses[index].user = user
        index++
      }
    }

    return mumble as MumbleType
  } catch (error) {
    console.log(error)
  }
}

export const fetchMumbles = async (params?: {
  accessToken?: string
  limit?: number
  offset?: number | string
  newerThanMumbleId?: string
  creator?: string
}) => {
  const { accessToken, limit, offset, newerThanMumbleId, creator } =
    params || {}

  const url = `${
    process.env.NEXT_PUBLIC_QWACKER_API_URL
  }posts?${new URLSearchParams({
    limit: limit?.toString() || '10',
    offset: offset?.toString() || '0',
    newerThan: newerThanMumbleId || '',
    creator: creator || ''
  })}`

  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  const { data } = (await res.json()) as QwackerMumbleResponse

  const mumbles = data.map(transformMumble)

  return mumbles
}

export const fetchMumblesWithUser = async ({
  accessToken,
  offset,
  limit,
  creator
}: FetchMumblePropsType) => {
  try {
    const mumbles = await fetchMumbles({
      accessToken,
      offset,
      limit,
      creator
    })
    const mumblesWithUser = await Promise.all(
      mumbles.map(async (mumble: MumbleType) => {
        if (accessToken) {
          const user = await fetchProfile(mumble.creator, accessToken)
          mumble.user = user
        }
        return mumble
      })
    )
    return mumblesWithUser
  } catch (error) {
    console.log(error)
  }
}

export const fetchResponseToMumble = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}posts/${id}/replies`
    const res = await fetch(url)
    const responses = await res.json()
    return responses
  } catch (error) {
    console.log(error)
  }
}

export const fetchProfile = async (id: string, accessToken?: string) => {
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
