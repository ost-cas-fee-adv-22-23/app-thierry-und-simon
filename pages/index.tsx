import { GetServerSideProps } from 'next'
import { getToken } from 'next-auth/jwt'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { useMumbles } from '../hooks/mumbles'
import { Header, HeaderType } from '@smartive-education/thierry-simon-mumble'
import { Cards } from '../components/cards'
import { WritePost } from '../components/writePost'
import { fetchMumblesWithUser } from '../services/postsService'
import { useSession } from 'next-auth/react'

export default function PageHome() {
  const { data: session }: any = useSession()
  const { data: mumbles } = useMumbles(session?.accessToken as string)
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
        <Cards posts={mumbles?.mumbles} />
      </div>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const queryClient = new QueryClient()

  const token = await getToken({ req })
  await queryClient.fetchQuery(['mumbles', token], () =>
    fetchMumblesWithUser(token?.accessToken as string)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
