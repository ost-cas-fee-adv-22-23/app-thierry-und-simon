import { FC } from 'react'
import { MumbleType } from '../types/Mumble'
import { MumbleCard } from './mumbleCard'

type CardsProps = {
  posts: MumbleType[] | undefined
}

export const Cards: FC<CardsProps> = ({ posts }: CardsProps) => {
  return (
    <>
      {posts?.map((post: MumbleType) => {
        return <MumbleCard mumble={post} key={post.id} />
      })}
    </>
  )
}
