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
import { fetchMumblesWithUser, fetchProfile } from '../../services/queries'
import { MumbleType } from '../../types/Mumble'
import { UserType } from '../../types/User'

type ProfilPageProps = {
  user: UserType
  initialMumbles: MumbleType[]
}

export default function ProfilePage({ user, initialMumbles }: ProfilPageProps) {
  const { data, size, setSize, isValidating } = useMumblesWithUser(
    10,
    initialMumbles,
    user.id
  )
  console.log(user, initialMumbles)
  return (
    <>
      <Profile user={user} />
      <Cards posts={getMumblesFromData(data)} />
      <Button
        size={ButtonSize.medium}
        color={ButtonColor.violet}
        onClick={() => setSize(size + 1)}
      >
        {isValidating ? 'Loading...' : 'Mehr laden, JETZT!'}
      </Button>
    </>
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

    return { props: { user, initialMumbles, fallback: initialMumbles } }
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
