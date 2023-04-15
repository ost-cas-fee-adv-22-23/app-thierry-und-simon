import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { Header, HeaderType } from '@smartive-education/thierry-simon-mumble'
import { Cards } from '../components/cards'
import { WritePost } from '../components/writePost'
import { fetchMumblesWithUser } from '../services/postsService'
import { useSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import useSWRInfinite from 'swr/infinite'
import { useEffect } from 'react'
import { MumbleType } from '../Types/Mumble'

export default function PageHome() {
  const { data: session }: any = useSession()
  const [mumbles, setMumbles] = useState<MumbleType[]>([])

  const getKey = (accessToken: string, index: number) => {
    const key = {
      toeken: accessToken,
      offset: index * 10,
      index: index
    }
    return key
  }

  const { data, size, setSize, isValidating } = useSWRInfinite(
    (index: number) => getKey(session.accessToken, index),
    (key) => fetchMumblesWithUser(key.toeken, key.offset, 10)
  )

  // Make sure that Mumbles are not undefined
  function getMumblesFromData(data: any[] | undefined): MumbleType[] {
    if (!data) return []
    return data.map((d) => (d ? d.mumbles : [])).flat()
  }

  // Set Mumbles when data changes
  useEffect(() => {
    setMumbles(getMumblesFromData(data))
  }, [data])

  console.log('data', isValidating)
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
        <button onClick={() => setSize(size + 1)}>
          {isValidating ? 'Loading...' : 'Mehr laden, JETZT!'}
        </button>
      </div>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log('getServerSideProps')
  const token = await getToken({ req })
  const initialData = await fetchMumblesWithUser(
    token?.accessToken as string,
    0,
    10
  )

  return {
    props: {
      initialData
    }
  }
}
