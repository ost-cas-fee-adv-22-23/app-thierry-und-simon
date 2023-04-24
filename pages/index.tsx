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
import { useMumblesWithUser } from '../hooks/useMumblesWithUser'
import { getToken } from 'next-auth/jwt'
import { getMumblesFromData, getHighestCount } from '../utils/helperFunctions'
import { fetchMumblesWithUser } from '../services/queries'
import { LoadingSpinner } from '../components/loadingSpinner'
import { MumbleType } from '../types/Mumble'

export default function PageHome({ fallback }: { fallback: MumbleType[] }) {
  const { data, size, setSize, mutate, isValidating } = useMumblesWithUser(
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
        <div className="flex justify-center align-center py-m">
          <div>
            {isValidating ? (
              <LoadingSpinner />
            ) : (
              <Button
                size={ButtonSize.large}
                color={ButtonColor.violet}
                onClick={() => setSize(size + 1)}
              >
                Mehr laden!
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req })

  if (!token) {
    return {
      redirect: {
        destination: '/mk-timeline',
        permanent: false
      }
    }
  }

  const initialMumbles = await fetchMumblesWithUser({
    accessToken: token?.accessToken,
    offset: 0,
    limit: 10
  })

  return {
    props: {
      fallback: initialMumbles
    }
  }
}
