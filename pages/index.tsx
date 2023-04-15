import { useState } from 'react'
import { GetServerSideProps } from 'next'
import {
  Button,
  ButtonColor,
  ButtonSize,
  Header,
  HeaderType
} from '@smartive-education/thierry-simon-mumble'
import { Cards } from '../components/cards'
import { WritePost } from '../components/writePost'
import { fetchMumblesWithUser } from '../services/postsService'
import { useMumblesWithUser } from '../hooks/useMumblesWithUser'
import { getToken } from 'next-auth/jwt'
import { useEffect } from 'react'
import { MumbleType } from '../Types/Mumble'

export default function PageHome() {
  const [mumbles, setMumbles] = useState<MumbleType[]>([])
  const { data, size, setSize, isValidating, mutate } = useMumblesWithUser(10)

  // Get Mumbles from data and make sure that Mumbles are not undefined
  function getMumblesFromData(data: any[] | undefined): MumbleType[] {
    if (!data) return []
    return data.map((d) => (d ? d.mumbles : [])).flat()
  }

  // get highest count from all arrays
  function getHighestCount(data: any[] | undefined): number {
    if (!data) return 0
    return data.map((d) => (d ? d.count : 0)).reduce((a, b) => Math.max(a, b))
  }

  // Set Mumbles when data changes, mainly for reloading additional mumbles
  useEffect(() => {
    setMumbles(getMumblesFromData(data))
  }, [data])

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
        <WritePost
          data={getMumblesFromData(data)}
          mutateFn={mutate}
          count={getHighestCount(data)}
        />
        <Cards posts={mumbles} />
        <Button
          size={ButtonSize.medium}
          color={ButtonColor.violet}
          onClick={() => setSize(size + 1)}
        >
          {isValidating ? 'Loading...' : 'Mehr laden, JETZT!'}
        </Button>
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
