import {
  Card,
  InteractionButton,
  InteractionButtonType,
  SizeType,
  User
} from '@smartive-education/thierry-simon-mumble'
import Link from 'next/link'
import { FC } from 'react'

type CardsProps = {
  posts: any
}

export const Cards: FC<CardsProps> = ({ posts }: CardsProps) => {
  return (
    <>
      {posts.map((post: any, index: number) => {
        return (
          <div className="mb-s" key={index}>
            <Card
              showProfileImage={true}
              roundedBorders={true}
              profileImageUrl={post.user.avatarUrl}
            >
              <Link href={`/profile/${post.user.id}`}>
                <User
                  type={SizeType.BASE}
                  userName={post.user.userName}
                  fullName={`${post.user.firstName} ${post.user.lastName}`}
                />
              </Link>

              <p className="mt-m">{post.text}</p>
              {post.mediaUrl && (
                <div className="my-m rounded-lg bg-violet-200 w-100 w-100 pt-16/9 relative">
                  <div className="overflow-hidden absolute w-full h-full top-0 bottom-0  rounded-lg">
                    <img
                      className="object-cover w-full h-full"
                      src={post.mediaUrl}
                    />
                  </div>
                </div>
              )}

              <div className="flex">
                <div>
                  <InteractionButton
                    type={InteractionButtonType.comment}
                    count={post.replyCount}
                  />
                </div>
                <div className="ml-xl">
                  <InteractionButton
                    type={InteractionButtonType.like}
                    count={post.likeCount}
                  />
                </div>
                <div className="ml-xl">
                  <InteractionButton
                    type={InteractionButtonType.share}
                    count={0}
                  />
                </div>
              </div>
            </Card>
          </div>
        )
      })}
    </>
  )
}
