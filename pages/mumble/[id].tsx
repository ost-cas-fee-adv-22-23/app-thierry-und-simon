import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { WritePost } from '../../components/writePost'
import { MumbleCard } from '../../components/mumbelCard'
import { unstable_serialize } from 'swr'
import fetchSingleMumbleWithUser from '../../services/posts/singleMumbleWithUser'
import {
  getKey,
  useSingleMumblesWithUser
} from '../../hooks/useSingleMumbleWithUser'
import { getToken } from 'next-auth/jwt'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

type Props = {
  mumbleId: string
  fallback: any
}

export default function MumblePage({
  mumbleId,
  fallback
}: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  const { data: session, status }: any = useSession()

  const {
    data: mumble,
    error,
    isLoading,
    isValidating,
    mutate
  } = useSingleMumblesWithUser(mumbleId, fallback)

  return (
    <>
      {mumble && <MumbleCard mumble={mumble} />}

      <WritePost mumbleId={mumbleId} mumble={mumble} mutateFn={mutate} />

      {mumble &&
        mumble?.responses?.length > 0 &&
        mumble.responses.map((response, index) => (
          <MumbleCard mumble={response} key={`mumblereponse-${index}`} />
        ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  const token = await getToken({ req })
  const mumbleId = query.id

  const singleMumbleWithUser = await fetchSingleMumbleWithUser({
    id: mumbleId,
    accessToken: token?.accessToken
  })

  return {
    props: {
      mumbleId,
      fallback: singleMumbleWithUser
    }
  }
}
