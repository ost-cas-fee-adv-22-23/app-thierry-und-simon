import { useSession } from 'next-auth/react'

import useSWR from 'swr'
import { fetchSingleMumbleWithUser } from '../services/queries'

export const useSingleMumblesWithUser = (
  mumbleId: string,
  fallback: unknown
) => {
  const { data: session } = useSession()

  const getKey = () => {
    return {
      id: mumbleId,
      accessToken: session?.accessToken
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
