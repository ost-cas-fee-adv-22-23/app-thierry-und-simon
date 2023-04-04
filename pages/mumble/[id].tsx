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
import { fetchResponseToMumble } from '../../services/posts/responseToMumble'
import { MumbleType } from '../../Types/Mumble'
import { Response } from '../../Types/Responses'
import { WritePost } from '../../components/writePost'

type Props = {
  mumble: MumbleType
  responses: Response[]
}

export default function MumblePage({
  mumble,
  responses
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
      <WritePost />
      {responses.length > 0 &&
        responses.map((response) => (
          <Card
            roundedBorders={false}
            showProfileImage={false}
            key={response.id}
          >
            <Link href={`/profile/${response?.user?.id}`}>
              <User
                type={SizeType.BASE}
                userName={response?.user?.userName}
                fullName={`${response?.user?.firstName} ${response?.user?.lastName}`}
              />
            </Link>
            <p className="mt-m">{mumble.text}</p>
            {response.mediaUrl && (
              <div className="my-m rounded-lg bg-violet-200 w-100 w-100 pt-16/9 relative">
                <div className="overflow-hidden absolute w-full h-full top-0 bottom-0  rounded-lg">
                  <img
                    className="object-cover w-full h-full"
                    src={response.mediaUrl}
                  />
                </div>
              </div>
            )}

            <div className="flex">
              <div>
                <InteractionButton
                  type={InteractionButtonType.comment}
                  count={response.replyCount}
                />
              </div>
              <div className="ml-xl">
                <InteractionButton
                  type={InteractionButtonType.like}
                  count={response.likeCount}
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
        ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { id }
}) => {
  const mumble = await fetchSingleMumble(id as string)
  const responses = await fetchResponseToMumble(id as string)
  return {
    props: {
      mumble,
      responses
    }
  }
}
