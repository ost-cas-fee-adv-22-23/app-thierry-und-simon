import { GetServerSideProps, InferGetStaticPropsType } from 'next'

import { Header, HeaderType } from '@smartive-education/thierry-simon-mumble'
import { Cards } from '../components/cards'
import { WritePost } from '../components/writePost'
import { fetchMumbles, fetchProfile } from '../services/qwacker'
import { IndexKind } from 'typescript'
import { getToken } from 'next-auth/jwt'

type PostProps = {
  id: string
  creator: string
  text: string
  mediaUrl: string
  mediaType: string
  likeCount: number
  likedByUser: boolean
  type: string
  replyCount: number
}

export default function PageHome({ mumbles }: { mumbles: PostProps[] }) {
  console.log(mumbles)
  return (
    <>
      <div className="max-w-3xl mx-auto px-10 mb-s">
        <div className="mb-xs text-violet-600">
          <Header type={HeaderType.h1} style={HeaderType.h1}>
            Willkommen auf Mumble
          </Header>
        </div>
        <div className="mb-l text-slate-500">
          <Header type={HeaderType.h2} style={HeaderType.h4}>
            Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel
            repellat dicta.
          </Header>
        </div>

        <WritePost />
        <Cards posts={mumbles} />
      </div>
    </>
  )
}
export const getServerSideProps = async ({ req, res }) => {
  try {
    const { count, mumbles } = await fetchMumbles({ limit: 100 })
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret })
    console.log({ token })

    const mumblesWithUser = await Promise.all(
      mumbles.map(async (mumble, index) => {
        const user = await fetchProfile(token?.accessToken, mumble.creator)
        mumble.user = user
        return mumble
      })
    )

    return { props: { count, mumbles: mumblesWithUser } }
  } catch (error) {
    let message
    if (error instanceof Error) {
      message = error.message
    } else {
      message = String(error)
    }

    return { props: { error: message, mumbles: [], count: 0 } }
  }

  // const res = await fetch(
  //   'https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts'
  // )
  // const posts: PostProps[] = await res.json()
  // return {
  //   props: {
  //     posts: posts
  //   }
  // }
}
