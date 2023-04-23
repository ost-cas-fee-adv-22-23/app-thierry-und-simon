import useSWRInfinite from 'swr/infinite'
import { useSession } from 'next-auth/react'
import { fetchMumblesWithUser } from '../services/queries'
import { Session } from 'next-auth'

export const getKey = (session: Session, index: number, pageLimit: number) => {
  return {
    toeken: session.accessToken,
    offset: index * pageLimit,
    index: index
  }
}

export const useMumblesWithUser = (
  pageLimit: number,
  fallback: unknown,
  creator?: string
) => {
  const { data: session } = useSession()

  const getKey = (index: number) => {
    const key = {
      accessToken: session?.accessToken,
      offset: index * pageLimit,
      index: index,
      creator: creator
    }
    return key
  }

  const { data, size, setSize, isValidating, mutate, isLoading } =
    useSWRInfinite(getKey, fetchMumblesWithUser, {
      fallbackData: [fallback],
      revalidateOnFocus: false,
      refreshInterval: 60000,
      parallel: true
    })
  return session
    ? { data, size, setSize, isValidating, mutate, isLoading }
    : {
        data: [fallback]
      }
}
