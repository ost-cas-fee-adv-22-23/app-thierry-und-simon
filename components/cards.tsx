import { FC } from 'react'
import { MumbleType } from '../Types/Mumble'
import { MumbleCard } from './mumbelCard'

type CardsProps = {
  posts: MumbleType[] | undefined
}

export const Cards: FC<CardsProps> = ({ posts }: CardsProps) => {
  return (
    <>
      {posts?.map((post: MumbleType) => {
        return <MumbleCard {...post} key={post.id} />
      })}
    </>
  )
}
