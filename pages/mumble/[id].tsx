import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { WritePost } from '../../components/writePost'
import { MumbleCard } from '../../components/mumbelCard'

import { useSingleMumblesWithUser } from '../../hooks/useSingleMumbleWithUser'
import { getToken } from 'next-auth/jwt'
import { useSession } from 'next-auth/react'
import { fetchSingleMumbleWithUser } from '../../services/queries'

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
    <div className="max-w-3xl mx-auto px-10 mb-s">
      {mumble && <MumbleCard mumble={mumble} />}

      <WritePost mumbleId={mumbleId} mumble={mumble} mutateFn={mutate} />

      {mumble &&
        mumble?.responses?.length > 0 &&
        mumble.responses.map((response, index) => (
          <MumbleCard mumble={response} key={`mumblereponse-${index}`} />
        ))}
    </div>
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
