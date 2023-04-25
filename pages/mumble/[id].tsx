import { GetServerSideProps } from 'next'
import { WritePost } from '../../components/writePost'
import { MumbleCard } from '../../components/mumbleCard'
import { useSingleMumblesWithUser } from '../../hooks/useSingleMumbleWithUser'
import { fetchSingleMumbleWithUser } from '../../services/queries'
import { MumbleType } from '../../types/Mumble'
import { getToken } from 'next-auth/jwt'

type PageProps = {
  mumbleId: string
  fallback: MumbleType
}

export default function MumblePage({ mumbleId, fallback }: PageProps) {
  const { data: mumble, mutate } = useSingleMumblesWithUser(mumbleId, fallback)

  return (
    <div className="max-w-3xl mx-auto px-10 mb-s">
      {mumble && <MumbleCard mumble={mumble} />}

      <WritePost mumbleId={mumbleId} mumble={mumble} mutateFn={mutate} />

      {mumble?.responses &&
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
  const singleMumble = await fetchSingleMumbleWithUser({
    id: query?.id as string,
    accessToken: token?.accessToken
  })

  return {
    props: {
      mumbleId: query?.id,
      fallback: singleMumble
    }
  }
}
