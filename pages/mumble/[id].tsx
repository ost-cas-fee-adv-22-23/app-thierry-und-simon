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

type Props = {
  mumbleId: string
}

export default function MumblePage({
  mumbleId,
  fallback
}: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  const { data: mumble, isLoading } = useSingleMumblesWithUser(mumbleId)

  if (mumble) {
    console.log(mumble)
  }

  console.log(fallback)

  return (
    <>
      {isLoading && <p>Is Loading</p>}
      {mumble && <MumbleCard mumble={mumble} />}
      <WritePost />
      {/* {responses.length > 0 &&
        responses.map((response, index) => (
          <MumbleCard mumble={response} key={`mumblereponse-${index}`} />
        ))} */}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  const token = await getToken({ req })
  const mumbleId = query.id

  const singleMumbleWithUser = await fetchSingleMumbleWithUser(
    mumbleId as string,
    token?.accessToken as string
  )

  return {
    props: {
      mumbleId,
      fallback: {
        [unstable_serialize(() =>
          getKey(mumbleId as string, token?.accessToken as string)
        )]: singleMumbleWithUser
      }
    }
  }
}
