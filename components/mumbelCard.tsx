import {
  Card,
  InteractionButton,
  InteractionButtonType,
  SizeType,
  User
} from '@smartive-education/thierry-simon-mumble'
import Link from 'next/link'
import Image from 'next/image'
import { MumbleType } from '../Types/Mumble'
import { UserType } from '../Types/User'
import { useSession } from 'next-auth/react'
import { fetchProfile, likeMumble } from '../services/qwacker'
import { useEffect, useState } from 'react'
import { InteractionButtons } from './interactionButtons'

export const MumbleCard = (post: MumbleType) => {
  const { data: session }: any = useSession()
  const [user, setUser] = useState<UserType | null>(null)

  // useEffect(() => {
  //   if (!session) return
  //   const fetchCreater = async () => {
  //     //const creater = await fetchProfile(session?.accessToken, post.creator)
  //     //setUser(creater)
  //   }
  //   fetchCreater()
  // }, [post.creator, session])

  useEffect(() => {
    fetch(`/api/profile/${post.creator}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user)
      })
  }, [post.creator])

  return (
    <div className="mb-s" key={post.id}>
      <Card
        showProfileImage={true}
        roundedBorders={true}
        profileImageUrl={user?.avatarUrl}
      >
        {user && (
          <Link href={`/profile/${user?.id}`}>
            <User
              type={SizeType.BASE}
              userName={user?.userName}
              fullName={`${user?.firstName} ${user?.lastName}`}
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
