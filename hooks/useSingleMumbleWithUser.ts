import { useSession } from 'next-auth/react'
import fetchSingleMumbleWithUser from '../services/posts/singleMumbleWithUser'
import useSWR from 'swr'

export const getKey = (session: any, mumbleId: string) => {
  const key = {
    token: session?.accessToken,
    mumbleId: mumbleId
  }
  return key
}

export const useSingleMumblesWithUser = (mumbleId: string) => {
  const { data: session }: any = useSession()

  const { data, isLoading, error } = useSWR(getKey(session, mumbleId), (key) =>
    fetchSingleMumbleWithUser(key.mumbleId, key.token)
  )
  return { data, isLoading, error }
}
