import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import fetchSingleMumble from '../../services/posts/singleMumble'
import { WritePost } from '../../components/writePost'
import { MumbleCard } from '../../components/mumbelCard'
import useSWR, { unstable_serialize } from 'swr'
import { useSession } from 'next-auth/react'
import fetchSingleMumbleWithUser from '../../services/posts/singleMumbleWithUser'
import {
  getKey,
  useSingleMumblesWithUser
} from '../../hooks/useSinlgeMumbleWithUser'
import { getToken } from 'next-auth/jwt'

type Props = {
  mumbleId: string
}

export default function MumblePage({
  mumbleId
}: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  const { data: session } = useSession()
  console.log(session)

  const { data: mumble, error, isLoading } = useSingleMumblesWithUser(mumbleId)

  if (mumble) {
    console.log(mumble)
  }

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

// export const getServerSideProps: GetServerSideProps = async ({
//   query: { id }
// }) => {
//   const mumble = await fetchSingleMumble(id as string)
//   const responses = await fetchResponseToMumble(id as string)
//   return {
//     props: {
//       mumble,
//       responses
//     }
//   }
// }

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  const token = await getToken({ req })
  const id = query.id

  const singleMumbleWithUser = await fetchSingleMumbleWithUser(
    id as string,
    token?.accessToken as string
  )

  console.log(singleMumbleWithUser)

  return {
    props: {
      mumbleId: id,
      fallback: {
        [unstable_serialize(getKey)]: singleMumbleWithUser
      }
    }
  }
}
