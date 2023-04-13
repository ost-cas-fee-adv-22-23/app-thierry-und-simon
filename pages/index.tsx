import { GetStaticProps } from 'next'
import { Header, HeaderType } from '@smartive-education/thierry-simon-mumble'
import { Cards } from '../components/cards'
import { WritePost } from '../components/writePost'
import { fetchMumbles } from '../services/qwacker'
import { MumbleType } from '../Types/Mumble'

export default function PageHome({ mumbles }: { mumbles: MumbleType[] }) {
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
export const getStaticProps: GetStaticProps = async () => {
  try {
    const { count, mumbles } = await fetchMumbles({ limit: 100 })
    return { props: { count, mumbles }, revalidate: 60 }
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
