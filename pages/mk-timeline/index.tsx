import { GetStaticProps } from 'next'
import {
  Button,
  ButtonColor,
  ButtonSize,
  Header,
  HeaderType
} from '@smartive-education/thierry-simon-mumble'
import { Cards } from '../../components/cards'
import { useMumbles } from '../../hooks/useMumbles'
import { getMumblesFromData } from '../../utils/helperFunctions'
import { fetchMumbles } from '../../services/queries'

export default function PageHome({ fallback }: { fallback: unknown }) {
  const { data, size, setSize, isValidating } = useMumbles(10, fallback)

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
            repellat dicta. HELLO MK
          </Header>
        </div>
        <Cards posts={getMumblesFromData(data)} />
        <div className="flex justify-center align-center py-m">
          <div>
            <Button
              size={ButtonSize.large}
              color={ButtonColor.violet}
              onClick={() => setSize(size + 1)}
            >
              {isValidating ? 'Loading...' : 'Mehr laden!'}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  try {
    const initialMumbles = await fetchMumbles({ limit: 100 })

    return {
      props: {
        fallback: initialMumbles
      },
      revalidate: 60
    }
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
