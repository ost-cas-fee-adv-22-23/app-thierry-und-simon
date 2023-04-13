import { GetServerSideProps } from 'next'
import { getToken } from 'next-auth/jwt'
import { useQuery } from '@tanstack/react-query'
import { Header, HeaderType } from '@smartive-education/thierry-simon-mumble'
import { Cards } from '../components/cards'
import { WritePost } from '../components/writePost'
import { MumbleType } from '../Types/Mumble'
import { fetchMumblesWithUser } from '../services/postsService'
import { useSession } from 'next-auth/react'

export default function PageHome({ mumbles }: { mumbles: MumbleType[] }) {
  const { data: session }: any = useSession()

  const { data } = useQuery({
    queryKey: ['mumbles', session?.accessToken],
    queryFn: () => fetchMumblesWithUser(session?.accessToken),
    initialData: { mumbles, count: mumbles?.length }
  })

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
        <p>{data?.count}</p>
        <Cards posts={data?.mumbles} />
      </div>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req })
  const data = await fetchMumblesWithUser(token?.accessToken as string)

  return {
    props: {
      mumbles: data?.mumbles,
      count: data?.count
    }
  }
}
