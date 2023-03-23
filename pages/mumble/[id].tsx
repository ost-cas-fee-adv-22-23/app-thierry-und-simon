import {
  Card,
  InteractionButton,
  InteractionButtonType,
  SizeType,
  User
} from '@smartive-education/thierry-simon-mumble'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import fetchSingleMumble from '../../services/posts/singleMumble'
import { MumbleType } from '../../Types/Mumble'

type Props = {
  mumble: MumbleType
}

export default function MumblePage({
  mumble
}: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  return (
    <>
      <Card
        showProfileImage={true}
        roundedBorders={true}
        profileImageUrl={mumble?.user?.avatarUrl}
      >
        <Link href={`/profile/${mumble?.user?.id}`}>
          <User
            type={SizeType.BASE}
            userName={mumble?.user?.userName}
            fullName={`${mumble?.user?.firstName} ${mumble?.user?.lastName}`}
          />
        </Link>

        <Link href={`/mumble/${mumble.id}`}>
          <p className="mt-m">{mumble.text}</p>
        </Link>
        {mumble.mediaUrl && (
          <div className="my-m rounded-lg bg-violet-200 w-100 w-100 pt-16/9 relative">
            <div className="overflow-hidden absolute w-full h-full top-0 bottom-0  rounded-lg">
              <img
                className="object-cover w-full h-full"
                src={mumble.mediaUrl}
              />
            </div>
          </div>
        )}

        <div className="flex">
          <div>
            <InteractionButton
              type={InteractionButtonType.comment}
              count={mumble.replyCount}
            />
          </div>
          <div className="ml-xl">
            <InteractionButton
              type={InteractionButtonType.like}
              count={mumble.likeCount}
            />
          </div>
          <div className="ml-xl">
            <InteractionButton type={InteractionButtonType.share} count={0} />
          </div>
        </div>
      </Card>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { id }
}) => {
  const mumble = await fetchSingleMumble(id as string)
  return {
    props: {
      mumble
    }
  }
}
