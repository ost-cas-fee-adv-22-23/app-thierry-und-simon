import { useSession } from 'next-auth/react'
import fetchSingleMumbleWithUser from '../services/posts/singleMumbleWithUser'
import useSWR from 'swr'

export const useSingleMumblesWithUser = (mumbleId: string, fallback: any) => {
  const { data: session }: any = useSession()

  const getKey = () => {
    return {
      id: mumbleId,
      accessToken: session.accessToken
    }
  }

  const { data, isLoading, isValidating, error, mutate } = useSWR(
    getKey,
    fetchSingleMumbleWithUser,
    {
      fallbackData: fallback,
      revalidateOnFocus: false,
      refreshInterval: 60000,
      parallel: true
    }
  )
  return { data, isLoading, isValidating, error, mutate }
}
