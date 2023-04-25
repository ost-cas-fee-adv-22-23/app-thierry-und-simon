import { GetStaticPaths, GetStaticProps } from 'next'
import { WritePost } from '../../components/writePost'
import { MumbleCard } from '../../components/mumbleCard'
import { useSingleMumblesWithUser } from '../../hooks/useSingleMumbleWithUser'
import { fetchMumbles, fetchSingleMumble } from '../../services/queries'
import { MumbleType } from '../../types/Mumble'

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

      {mumble &&
        mumble?.responses?.length > 0 &&
        mumble.responses.map((response, index) => (
          <MumbleCard mumble={response} key={`mumblereponse-${index}`} />
        ))}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const mumbles = await fetchMumbles({ limit: 100 })
  const paths = mumbles.map((path: MumbleType) => ({
    params: { id: path.id }
  }))
  return {
    paths: paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const singleMumble = await fetchSingleMumble(params?.id as string)

  return {
    props: {
      mumbleId: params?.id,
      fallback: singleMumble
    }
  }
}
