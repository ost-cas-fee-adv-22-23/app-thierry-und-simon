import { UserType } from './User'

export type Mumble = {
  id: string
  creator: string
  text: string
  mediaUrl: string
  mediaType: string
  likeCount: number
  likedByUser: boolean
  type: string
  replyCount: number
  createdTimestamp: number
  user?: UserType
}
