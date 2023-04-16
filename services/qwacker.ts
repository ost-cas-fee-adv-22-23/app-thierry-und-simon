import { decodeTime } from 'ulid'
import { MumbleType } from '../Types/Mumble'

type RawMumble = Omit<MumbleType, 'createdTimestamp'>

type QwackerMumbleResponse = {
  count: number
  data: RawMumble[]
}

export type UploadImage = File & { preview: string }

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

export const postMumble = async (
  text: string,
  file: UploadImage | null,
  accessToken?: string
) => {
  if (!accessToken) {
    throw new Error('No access token')
  }

  const formData = new FormData()
  formData.append('text', text)
  if (file) {
    formData.append('image', file)
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    if (!response.ok) {
      throw new Error('Something was not okay')
    }

    return transformMumble(await response.json())
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Could not post mumble'
    )
  }
}

export const postReply = async (
  text: string,
  file: UploadImage | null,
  mumbleId: string,
  accessToken?: string
) => {
  if (!accessToken) {
    throw new Error('No access token')
  }

  console.log(text)

  const formData = new FormData()
  formData.append('text', text)
  if (file) {
    formData.append('image', file)
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts/${mumbleId}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    if (!response.ok) {
      throw new Error('Something was not okay')
    }

    return transformMumble(await response.json())
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Could not post reply'
    )
  }
}

const transformMumble = (mumble: RawMumble) => ({
  ...mumble,
  createdTimestamp: decodeTime(mumble.id)
})

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

export const likeMumble = async (accessToken: string, mumbleId: string) => {
  if (!accessToken) {
    throw new Error('No access token')
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_QWACKER_API_URL}posts/${mumbleId}/likes`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Something was not okay')
    }
    return response
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Could not post mumble'
    )
  }
}

export const unLikeMumble = async (accessToken: string, mumbleId: string) => {
  if (!accessToken) {
    throw new Error('No access token')
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_QWACKER_API_URL}posts/${mumbleId}/likes`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Something was not okay')
    }
    return response
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Could not post mumble'
    )
  }
}
