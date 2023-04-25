import { UploadImage } from '../types/Mumble'
import { transformMumble } from '../utils/helperFunctions'

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

export const likeMumble = async (mumbleId: string, accessToken?: string) => {
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

export const unLikeMumble = async (mumbleId: string, accessToken?: string) => {
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
