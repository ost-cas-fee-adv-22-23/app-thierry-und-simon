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

export default function ProfilePage({ profile }) {
  console.log(profile)

  return (
    <Layout>
      <Profile />
    </Layout>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  try {
    // const { count, mumbles } = await fetchProfile()
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret })
    const data = await fetchProfile(token)

    console.log(data)
    // return { props: { count, mumbles } }
    return { props: {} }
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
