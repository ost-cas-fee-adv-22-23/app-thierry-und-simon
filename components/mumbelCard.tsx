import { Card, SizeType, User } from '@smartive-education/thierry-simon-mumble'
import Link from 'next/link'
import Image from 'next/image'
import { MumbleType } from '../Types/Mumble'
import { InteractionButtons } from './interactionButtons'

type Props = {
  mumble: MumbleType
}

export const MumbleCard = ({ mumble }: Props) => {
  const isReply = mumble.type === 'reply'

  return (
    <div className={!isReply ? 'mb-s' : 'mb-1'}>
      <Card
        showProfileImage={isReply ? false : true}
        roundedBorders={isReply ? false : true}
        profileImageUrl={mumble.user?.avatarUrl}
      >
        {mumble.user && (
          <Link href={`/profile/${mumble.user?.id}`}>
            <User
              type={isReply ? SizeType.SM : SizeType.BASE}
              userName={mumble.user?.userName}
              fullName={`${mumble.user?.firstName} ${mumble.user?.lastName}`}
              userImageSrc={mumble.user?.avatarUrl}
            />
          </Link>
        )}
        <Link href={`/mumble/${mumble.id}`}>
          <p className="mt-m">{mumble.text}</p>
          {mumble.mediaUrl && (
            <div className="my-m rounded-lg bg-violet-200 w-100 w-100 pt-16/9 relative">
              <div className="overflow-hidden absolute w-full h-full top-0 bottom-0  rounded-lg">
                <Image
                  className="object-cover w-full h-full"
                  src={mumble.mediaUrl}
                  alt=""
                  width={500}
                  height={500}
                />
              </div>
            </div>
          )}
        </Link>

        <InteractionButtons post={mumble} />
      </Card>
    </div>
  )
}
