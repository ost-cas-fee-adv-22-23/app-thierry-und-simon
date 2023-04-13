import Profile from '../../components/profile'
import {
  fetchMumbles,
  fetchProfile,
  searchMumbles
} from '../../services/qwacker'
import { getToken } from 'next-auth/jwt'

export default function ProfilePage({
  user,
  mumblesLikedByUser,
  mumblesCreatedByUser
}) {
  console.log(mumblesLikedByUser)
  console.log(mumblesCreatedByUser)
  return <Profile user={user} />
}

export const getServerSideProps = async ({ query, req }) => {
  try {
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret })
    const userId = query.alias

    const user = await fetchProfile(token?.accessToken, userId)

    const mumblesCreatedByUser = await fetchMumbles({
      creator: userId,
      limit: 100
    })
    const mumblesLikedByUser = await fetchMumbles({
      likedBy: userId,
      limit: 100
    })

    console.log(mumblesLikedByUser)

    return { props: { user, mumblesCreatedByUser } }
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
