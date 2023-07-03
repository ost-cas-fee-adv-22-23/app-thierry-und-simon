import { Card, SizeType, User } from '@smartive-education/thierry-simon-mumble'
import Link from 'next/link'
import Image from 'next/image'
import { MumbleType } from '../types/Mumble'
import { InteractionButtons } from './interactionButtons'
import { useSession } from 'next-auth/react'
import { LoadingUserShimmer } from './loadingUserShimmer'
type Props = {
  mumble: MumbleType
  showUser?: boolean
}

export const MumbleCard = ({ mumble, showUser = true }: Props) => {
  const isReply = mumble.type === 'reply'
  const { data: session } = useSession()
  console.log('Mumble', mumble)
  return (
    <div className={!isReply ? 'mb-s' : 'mb-1'} data-testid="single-mumble">
      <Card
        showProfileImage={isReply || !mumble.user ? false : true}
        roundedBorders={isReply ? false : true}
        profileImageUrl={mumble.user?.avatarUrl}
      >
        {
          // If session is null - the user is not logged in but initially all sessions are undefined but can also become sessions
          session !== null && showUser && (
            <Link href={`/profile/${mumble.user?.id}`}>
              <div className="mb-m" suppressHydrationWarning>
                {
                  // if session is undefined, it is not yet clear it user is logged in or not so show loading spinner - if not logged in the session becomes null
                  mumble?.user?.userName === undefined ? (
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
          <p data-testid="single-mumble-text">{mumble.text}</p>
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
        {!isReply && mumble.user && <InteractionButtons post={mumble} />}
      </Card>
    </div>
  )
}
