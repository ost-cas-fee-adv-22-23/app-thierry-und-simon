import { GetServerSideProps } from 'next'
import { Header, HeaderType } from '@smartive-education/thierry-simon-mumble'
import { Cards } from '../components/cards'
import { WritePost } from '../components/writePost'
import { fetchMumblesWithUser } from '../services/postsService'
import { useSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import useSWRInfinite from 'swr/infinite'

export default function PageHome() {
  const { data: session }: any = useSession()

  const getKey = (accessToken: string | null, index: number) => {
    if (accessToken !== undefined) {
      return [accessToken, (index + 1) * 10]
    }
    return null
  }

  const { data } = useSWRInfinite(
    (index: number) => getKey(session.accessToken, index),
    session?.accessToken !== undefined
      ? (accessToken: string) => fetchMumblesWithUser(accessToken)
      : null
  )
  console.log(data)
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
        {data && data.length > 0 && <Cards posts={data[0]?.mumbles} />}
      </div>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req })
  const initialData = await fetchMumblesWithUser(token?.accessToken as string)

  return {
    props: {
      initialData
    }
  }
}
