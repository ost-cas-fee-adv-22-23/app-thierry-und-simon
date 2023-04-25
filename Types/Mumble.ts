import { UserType } from './User'

export type MumbleType = {
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
  responses?: Response[]
}

export type RawMumble = Omit<MumbleType, 'createdTimestamp'>

export type QwackerMumbleResponse = {
  count: number
  data: RawMumble[]
}

export type UploadImage = File & { preview: string }

export type Response = {
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

export type FetchMumblePropsType = {
  accessToken?: string
  offset: number
  limit: number
  creator?: string
}

export type FetchSingleMumbleWithUserPropsType = {
  id: string
  accessToken?: string
}
