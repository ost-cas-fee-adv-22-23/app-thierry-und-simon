import { Card, SizeType, User } from '@smartive-education/thierry-simon-mumble'
import Link from 'next/link'
import Image from 'next/image'
import { MumbleType } from '../types/Mumble'
import { InteractionButtons } from './interactionButtons'
import { useSession } from 'next-auth/react'
import { LoadingUserShimmer } from './loadingUserShimmer'

type Props = {
  mumble: MumbleType
}

export const MumbleCard = ({ mumble }: Props) => {
  const isReply = mumble.type === 'reply'
  const { data: session } = useSession()
  const isLoggedIn = session

  return (
    <div className={!isReply ? 'mb-s' : 'mb-1'}>
      <Card
        showProfileImage={isReply || !isLoggedIn ? false : true}
        roundedBorders={isReply ? false : true}
        profileImageUrl={mumble.user?.avatarUrl}
      >
        {
          // If session is null - the user is not logged in but initially all sessions are undefined but can also become sessions
          session !== null && (
            <Link href={`/profile/${mumble.user?.id}`}>
              <div className="mb-m">
                {
                  // if session is undefined, it is not yet clear it user is logged in or not so show loading spinner - if not logged in the session becomes null
                  !session ? (
                    <LoadingUserShimmer />
                  ) : (
                    <User
                      type={isReply ? SizeType.SM : SizeType.BASE}
                      userName={mumble.user?.userName}
                      fullName={`${mumble.user?.firstName} ${mumble.user?.lastName}`}
                      userImageSrc={mumble.user?.avatarUrl}
                      datePosted={mumble.createdTimestamp}
                    />
                  )
                }
              </div>
            </Link>
          )
        }
        <Link href={`/mumble/${mumble.id}`}>
          <p>{mumble.text}</p>
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
        {!isReply && isLoggedIn && <InteractionButtons post={mumble} />}
      </Card>
    </div>
  )
}
