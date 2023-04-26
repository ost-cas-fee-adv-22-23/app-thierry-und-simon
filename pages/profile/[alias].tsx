import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { getToken } from 'next-auth/jwt'
import { useMumblesWithUser } from '../../hooks/useMumblesWithUser'
import { getMumblesFromData } from '../../utils/helperFunctions'
import {
  Button,
  ButtonColor,
  ButtonSize
} from '@smartive-education/thierry-simon-mumble'
import Profile from '../../components/profile'
import { Cards } from '../../components/cards'
import {
  fetchMumblesWithUser,
  fetchProfile,
  fetchMumblesWithSearchWithUser
} from '../../services/queries'
import { MumbleType } from '../../types/Mumble'
import { UserType } from '../../types/User'

type ProfilPageProps = {
  user: UserType
  initialMumbles: MumbleType[]
  likes: MumbleType[]
}

export default function ProfilePage({
  user,
  likes,
  initialMumbles
}: ProfilPageProps) {
  const [showLikes, setShowLikes] = useState(false)
  const { data, size, setSize, isValidating } = useMumblesWithUser(
    10,
    initialMumbles,
    user.id
  )

  return (
    <div className="max-w-3xl mx-auto px-10 mb-s">
      <Profile user={user} />
      <Button
        onClick={() => setShowLikes(!showLikes)}
        size={ButtonSize.large}
        color={ButtonColor.gradiant}
      >
        {!showLikes ? 'Meine Likes' : 'Meine Mumbles'}
      </Button>
      <section className="mt-4">
        {!showLikes && (
          <>
            <Cards posts={getMumblesFromData(data)} />
            <Button
              size={ButtonSize.large}
              color={ButtonColor.violet}
              onClick={() => setSize(size + 1)}
            >
              {isValidating ? 'Loading...' : 'Mehr laden!'}
            </Button>
          </>
        )}
        {showLikes && <Cards posts={likes} />}
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token = await getToken({ req: context.req })
    const initialMumbles = await fetchMumblesWithUser({
      accessToken: token?.accessToken as string,
      offset: 0,
      limit: 10,
      creator: context.query.alias as string
    })
    const user = await fetchProfile(
      context.query.alias as string,
      token?.accessToken as string
    )
    const likes = await fetchMumblesWithSearchWithUser({
      accessToken: token?.accessToken as string,
      searchParams: { likedBy: [user.id], isReply: false }
    })

    return {
      props: {
        user: user,
        initialMumbles: initialMumbles,
        likes: likes,
        fallback: initialMumbles
      }
    }
  } catch (error) {
    let message
    if (error instanceof Error) {
      message = error.message
    } else {
      message = String(error)
    }
    return { props: { error: message, mumbles: [], count: 0 } }
  }
}
