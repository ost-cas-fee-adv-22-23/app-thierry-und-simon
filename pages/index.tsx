import { GetServerSideProps, InferGetStaticPropsType } from 'next'
import { Header } from '../components/header'
import {
  Button,
  ButtonColor,
  ButtonSize
} from '@smartive-education/thierry-simon-mumble'
import { Cards } from '../components/cards'

type PageProps = {
  posts: any
}

export default function PageHome({posts}: PageProps): InferGetStaticPropsType<
  typeof getServerSideProps
> {
  console.log(posts)
  return (
    <>
      <Header title="Mumble">
        <span>Your custom network</span>
      </Header>
      {/* <Button
        size={ButtonSize.large}
        color={ButtonColor.gradiant}
        label="Hello"
      /> */}
      <Cards title="piss" posts={posts}/>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async () => ({
  props: { posts: require('../data/posts.json') }
})
