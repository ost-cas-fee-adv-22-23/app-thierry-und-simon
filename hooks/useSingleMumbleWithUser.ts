import { useSession } from 'next-auth/react'

import useSWR from 'swr'
import { fetchSingleMumbleWithUser } from '../services/queries'
import { MumbleType } from '../types/Mumble'

export const useSingleMumblesWithUser = (
  mumbleId: string,
  fallback: MumbleType
) => {
  const { data: session } = useSession()

  const getKey = () => {
    return {
      id: mumbleId,
      accessToken: session?.accessToken
    }
  }

  const { data, isLoading, isValidating, error, mutate } = useSWR(
    () => (!session ? null : getKey()),
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
