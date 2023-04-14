import { useQuery } from '@tanstack/react-query'
import { fetchMumblesWithUser } from '../services/postsService'

export const useMumbles = (accessToken: string, offset?: number) => {
  return useQuery(['mumbles', offset, accessToken], () =>
    fetchMumblesWithUser(accessToken, offset)
  )
}
