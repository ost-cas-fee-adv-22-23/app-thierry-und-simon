import {
  InteractionButton,
  InteractionButtonType
} from '@smartive-education/thierry-simon-mumble'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { likeMumble, unLikeMumble } from '../services/mutations'
import { MumbleType } from '../types/Mumble'

export const InteractionButtons = ({ post }: { post: MumbleType }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [hasLiked, setHasLiked] = useState(post.likedByUser)

  const handleLike = async () => {
    if (!hasLiked) {
      const res = await likeMumble(post.id, session?.accessToken)
      res.status === 204 && setHasLiked(true)
    } else {
      const res = await unLikeMumble(post.id, session?.accessToken)
      res.status === 204 && setHasLiked(false)
    }
  }

  return (
    <div className="flex mt-m">
      <div>
        <InteractionButton
          type={InteractionButtonType.comment}
          count={post.replyCount}
          onClick={() => router.push(`/mumble/${post.id}`)}
        />
      </div>
      <div className="ml-xl">
        <InteractionButton
          type={InteractionButtonType.like}
          count={post.likeCount}
          hasLiked={hasLiked}
          onClick={() => handleLike()}
          data-testid="like-button"
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
