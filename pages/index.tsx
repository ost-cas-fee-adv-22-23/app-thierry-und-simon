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
import { getMumblesFromData, getHighestCount } from '../utils/helperFunctions'

export default function PageHome({ fallback }: any) {
  const { data, size, setSize, isValidating, mutate } = useMumblesWithUser(
    10,
    fallback
  )

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
        <Cards posts={getMumblesFromData(data)} />
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
  const token = await getToken({ req })
  const initialMumbles = await fetchMumblesWithUser({
    accessToken: token?.accessToken as string,
    offset: 0,
    limit: 10
  })

  return {
    props: {
      fallback: initialMumbles
    }
  }
}
