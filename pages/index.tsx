import { GetServerSideProps } from 'next'
import { Header, HeaderType } from '@smartive-education/thierry-simon-mumble'
import { Cards } from '../components/cards'
import { WritePost } from '../components/writePost'
import { fetchMumbles, fetchProfile } from '../services/qwacker'
import { getToken } from 'next-auth/jwt'
import { Mumble } from '../Types/Mumble'
import { UserType } from '../Types/User'

export default function PageHome({ mumbles }: { mumbles: Mumble[] }) {
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
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const { count, mumbles } = await fetchMumbles({ limit: 100 })
    const token = await getToken({ req })

    const mumblesWithUser = await Promise.all(
      mumbles.map(async (mumble) => {
        const user = await fetchProfile(
          token?.accessToken as string,
          mumble.creator
        )
        mumble.user = user
        return mumble
      })
    )

    return { props: { count, mumbles: token ? mumblesWithUser : mumbles } }
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
