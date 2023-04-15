import useSWRInfinite from 'swr/infinite'
import { useSession } from 'next-auth/react'
import { fetchMumblesWithUser } from '../services/postsService'

export const useMumblesWithUser = (pageLimit: number) => {
  const { data: session }: any = useSession()
  console.log('session', session)

  const getKey = (session: any, index: number) => {
    const key = {
      toeken: session.accessToken,
      offset: index * pageLimit,
      index: index
    }
    return key
  }

  const { data, size, setSize, isValidating } = useSWRInfinite(
    (index: number) => getKey(session, index),
    (key) => fetchMumblesWithUser(key.toeken, key.offset, pageLimit)
  )
  return { data, size, setSize, isValidating }
}
