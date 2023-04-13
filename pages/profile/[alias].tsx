import Profile from '../../components/profile'
import { fetchProfile } from '../../services/qwacker'
import { getToken } from 'next-auth/jwt'

export default function ProfilePage({ user }) {
  console.log(user)
  return <Profile user={user} />
}

export const getServerSideProps = async ({ query }) => {
  try {
    console.log('get server side props')
    const secret = process.env.NEXTAUTH_SECRET
    console.log('token ' + secret)
    const token = await getToken({ secret })
    console.log('token ' + secret)
    console.log({ token })
    const userId = query.alias

    const user = await fetchProfile(token?.accessToken, userId)

    return { props: { user } }
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
