import { decodeTime } from 'ulid'
import { MumbleType, RawMumble } from '../types/Mumble'

// Get Mumbles from data and make sure that Mumbles are not undefined and combine Mumbles from the useSWRInfinite data
export function getMumblesFromData(data: any[] | undefined): MumbleType[] {
  if (!data) return []
  console.log(data)
  return data.map((d) => (d ? d : [])).flat()
}

export const transformMumble = (mumble: RawMumble) => ({
  ...mumble,
  createdTimestamp: decodeTime(mumble.id)
})
