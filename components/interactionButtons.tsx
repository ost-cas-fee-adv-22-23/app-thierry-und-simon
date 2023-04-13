import {
  InteractionButton,
  InteractionButtonType
} from '@smartive-education/thierry-simon-mumble'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { likeMumble, unLikeMumble } from '../services/qwacker'
import { MumbleType } from '../Types/Mumble'

export const InteractionButtons = ({ post }) => {
  const { data: session }: any = useSession()
  const router = useRouter()
  const [hasLiked, setHasLiked] = useState(post.likedByUser)

  const handleLike = async () => {
    if (!hasLiked) {
      const res = await likeMumble(session.accessToken, post.id)
      console.log(res)
    } else {
      const res = await unLikeMumble(session.accessToken, post.id)
      console.log(res)
    }
  }

  return (
    <div className="flex mt-m">
      <div>
        <InteractionButton
          type={InteractionButtonType.comment}
          count={post.replyCount}
          hasLiked={hasLiked}
          onClick={() => router.push(`/mumble/${post.id}`)}
        />
      </div>
      <div className="ml-xl">
        <InteractionButton
          type={InteractionButtonType.like}
          count={post.likeCount}
          onClick={() => handleLike()}
        />
      </div>
      <div className="ml-xl">
        <InteractionButton
          type={InteractionButtonType.share}
          count={0}
          onClick={() =>
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_FRONTEND_URL}/mumble/${post.id}`
            )
          }
        />
      </div>
    </div>
  )
}
