import { Layout } from '../../components/layout/layout'
import Profile from '../../components/profile'
import { fetchProfile } from '../../services/qwacker'
import { getToken } from 'next-auth/jwt'

export default function ProfilePage({ user }) {
  return (
    <Layout>
      <Profile user={user} />
    </Layout>
  )
}

export const getServerSideProps = async ({ query }) => {
  console.log(query)

  try {
    // const { count, mumbles } = await fetchProfile(
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ secret })
    const id = query.alias

    const user = await fetchProfile(token?.accessToken, id)

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
