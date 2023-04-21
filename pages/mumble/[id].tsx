import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType
} from 'next'
import { WritePost } from '../../components/writePost'
import { MumbleCard } from '../../components/mumbelCard'
import { useSingleMumblesWithUser } from '../../hooks/useSingleMumbleWithUser'
import { fetchMumbles, fetchSingleMumble } from '../../services/queries'

type Props = {
  mumbleId: string
  fallback: unknown
}

export default function MumblePage({
  mumbleId,
  fallback
}: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
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
  const { mumbles } = await fetchMumbles({ limit: 100 })
  const paths = mumbles.map((path) => ({
    params: { id: path.id }
  }))
  console.log(paths)
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
