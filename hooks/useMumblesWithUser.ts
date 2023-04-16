import useSWRInfinite from 'swr/infinite'
import { useSession } from 'next-auth/react'
import { fetchMumblesWithUser } from '../services/postsService'

export const getKey = (session: any, index: number, pageLimit: number) => {
  const key = {
    toeken: session.accessToken,
    offset: index * pageLimit,
    index: index
  }
  return key
}

export const useMumblesWithUser = (pageLimit: number, fallback: any) => {
  const { data: session }: any = useSession()

  const getKey = (session: any, index: number) => {
    const key = {
      toeken: session.accessToken,
      offset: index * pageLimit,
      index: index
    }
    return key
  }

  const { data, size, setSize, isValidating, mutate, isLoading } =
    useSWRInfinite(
      (index: number) => getKey(session, index),
      (key) => fetchMumblesWithUser(key.toeken, key.offset, pageLimit),
      {
        fallbackData: fallback.mumbles
      }
    )
  return { data, size, setSize, isValidating, mutate, isLoading }
}
