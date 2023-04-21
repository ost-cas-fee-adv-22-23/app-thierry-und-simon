import useSWRInfinite from 'swr/infinite'
import { fetchMumbles } from '../services/queries'
import { Session } from 'next-auth'

export const getKey = (session: Session, index: number, pageLimit: number) => {
  return {
    toeken: session.accessToken,
    offset: index * pageLimit,
    index: index
  }
}

export const useMumbles = (
  pageLimit: number,
  fallback: unknown,
  creator?: string
) => {
  const getKey = (index: number) => {
    const key = {
      offset: index * pageLimit,
      index: index,
      creator: creator
    }
    return key
  }

  const { data, size, setSize, isValidating, mutate, isLoading } =
    useSWRInfinite(getKey, fetchMumbles, {
      fallbackData: [fallback],
      revalidateOnFocus: false,
      refreshInterval: 60000,
      parallel: true
    })
  return { data, size, setSize, isValidating, mutate, isLoading }
}
