import { useSession } from 'next-auth/react'
import fetchSingleMumbleWithUser from '../services/posts/singleMumbleWithUser'
import useSWR from 'swr'

export const getKey = (mumbleId: string, token: any) => {
  const key = {
    id: mumbleId,
    accessToken: token
  }
  return key
}

export const useSingleMumblesWithUser = (mumbleId: string) => {
  const { data: session }: any = useSession()

  const { data, isLoading, error } = useSWR(
    getKey(mumbleId, session?.accessToken),
    (key) => fetchSingleMumbleWithUser(key.id, key.accessToken)
  )
  return { data, isLoading, error }
}
