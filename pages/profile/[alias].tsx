import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Layout from '../../components/layout'
import Profile from '../../components/profile'
import { fetchProfile } from '../../services/qwacker'
import getServerSession from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import { getToken } from 'next-auth/jwt'

type Props = {
  profile: {
    alias: string
  }
}

export default function ProfilePage({ user }) {
  return (
    <Layout>
      <Profile user={user} />
    </Layout>
  )
}

export const getServerSideProps = async ({ req, res, query }) => {
  console.log(query)

  try {
    // const { count, mumbles } = await fetchProfile()
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret })
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
