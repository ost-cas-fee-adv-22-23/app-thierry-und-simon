import { Card, SizeType, User } from '@smartive-education/thierry-simon-mumble'
import Link from 'next/link'
import Image from 'next/image'
import { MumbleType } from '../Types/Mumble'
import { InteractionButtons } from './interactionButtons'

export const MumbleCard = (post: MumbleType) => {
  return (
    <div className="mb-s" key={post.id}>
      <Card
        showProfileImage={true}
        roundedBorders={true}
        profileImageUrl={post.user?.avatarUrl}
      >
        {post.user && (
          <Link href={`/profile/${post.user?.id}`}>
            <User
              type={SizeType.BASE}
              userName={post.user?.userName}
              fullName={`${post.user?.firstName} ${post.user?.lastName}`}
            />
          </Link>
        )}
        <Link href={`/mumble/${post.id}`}>
          <p className="mt-m">{post.text}</p>
        </Link>
        {post.mediaUrl && (
          <div className="my-m rounded-lg bg-violet-200 w-100 w-100 pt-16/9 relative">
            <div className="overflow-hidden absolute w-full h-full top-0 bottom-0  rounded-lg">
              <Image
                className="object-cover w-full h-full"
                src={post.mediaUrl}
                alt=""
                width={500}
                height={500}
              />
            </div>
          </div>
        )}

        <InteractionButtons post={post} />
      </Card>
    </div>
  )
}
