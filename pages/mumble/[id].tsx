import {
  Card,
  InteractionButton,
  InteractionButtonType,
  SizeType,
  User
} from '@smartive-education/thierry-simon-mumble'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import fetchSingleMumble from '../../services/posts/singleMumble'
import { fetchResponseToMumble } from '../../services/posts/responseToMumble'
import { MumbleType } from '../../Types/Mumble'
import { Response } from '../../Types/Responses'
import { WritePost } from '../../components/writePost'
import { MumbleCard } from '../../components/mumbelCard'
import { getToken } from 'next-auth/jwt'
import { fetchMumblesWithUser } from '../../services/postsService'

type Props = {
  mumble: MumbleType
  responses: Response[]
}

export default function MumblePage({
  mumble,
  responses
}: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  return (
    <>
      <MumbleCard mumble={mumble} />
      <WritePost />

      {responses.length > 0 &&
        responses.map((response, index) => (
          <MumbleCard mumble={response} key={`mumblereponse-${index}`} />
        ))}
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req })
  const initialData = await fetchMumblesWithUser(
    token?.accessToken as string,
    0,
    10
  )

  return {
    props: {
      initialData
    }
  }
}
