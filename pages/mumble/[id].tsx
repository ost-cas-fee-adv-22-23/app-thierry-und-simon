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

  // const {
  //   data: mumble,
  //   error,
  //   isLoading
  // } = useSingleMumblesWithUser(mumbleId, fallback)

  const {
    data: mumble,
    isLoading,
    isValidating,
    error
  } = useSWR(
    ['api', 'singleMumble', mumbleId],
    ([var1, var2, mumbleId]) =>
      fetchSingleMumbleWithUser(mumbleId, session?.accessToken),
    { fallback }
  )

  if (mumble) {
    console.log(mumble)
  }

  console.log(fallback)

  return (
    <>
      {isLoading && <p>Is Loading</p>}
      {isValidating && <p>Is validating</p>}
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
    mumbleId,
    token?.accessToken
  )

  return {
    props: {
      mumbleId,
      fallback: {
        [unstable_serialize(['api', 'singleMumble', mumbleId])]:
          singleMumbleWithUser
      }
      // fallback: {
      //   [unstable_serialize(() =>
      //     getKey(mumbleId as string, token?.accessToken)
      //   )]: singleMumbleWithUser
      // }
    }
  }
}
