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

export const useMumblesWithUser = (pageLimit: number) => {
  const { data: session }: any = useSession()

  const getKey = (session: any, index: number) => {
    const key = {
      toeken: session.accessToken,
      offset: index * pageLimit,
      index: index
    }
    return key
  }

  const { data, size, setSize, isValidating, mutate } = useSWRInfinite(
    (index: number) => getKey(session, index),
    (key) => fetchMumblesWithUser(key.toeken, key.offset, pageLimit)
  )
  return { data, size, setSize, isValidating, mutate }
}
