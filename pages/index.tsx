import { GetServerSideProps, InferGetStaticPropsType } from 'next'

import {
  Button,
  ButtonColor,
  ButtonSize,
  Header,
  HeaderType
} from '@smartive-education/thierry-simon-mumble'
import { Cards } from '../components/cards'
import { WritePost } from '../components/writePost'

type PageProps = {
  posts: any
}

export default function PageHome({
  posts
}: PageProps): InferGetStaticPropsType<typeof getServerSideProps> {
  console.log(posts)
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
        <Cards posts={posts} />
      </div>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async () => ({
  props: { posts: require('../data/posts.json') }
})
