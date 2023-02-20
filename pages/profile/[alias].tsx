import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Layout from '../../components/layout'
import Profile from '../../components/profile'
import { fetchProfile } from '../../services/qwacker'
import getServerSession from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'

type Props = {
  profile: {
    alias: string
  }
}

export default function ProfilePage({ profile }) {
  console.log(profile)

  return (
    <Layout>
      {/* <h1>{profile.alias}</h1> */}
      <Profile />
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getServerSession(authOptions)

  try {
    // const { count, mumbles } = await fetchProfile()
    const data = await fetchProfile(session)

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
