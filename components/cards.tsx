import { FC } from 'react'
import { MumbleType } from '../types/Mumble'
import { MumbleCard } from './mumbleCard'

type CardsProps = {
  posts: MumbleType[] | undefined
  showUser?: boolean
}

export const Cards: FC<CardsProps> = ({
  posts,
  showUser = true
}: CardsProps) => {
  return (
    <>
      {posts?.map((post: MumbleType) => {
        return <MumbleCard showUser={showUser} mumble={post} key={post.id} />
      })}
    </>
  )
}
