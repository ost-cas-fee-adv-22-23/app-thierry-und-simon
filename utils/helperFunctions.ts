import { MumbleType } from '../Types/Mumble'

// Get Mumbles from data and make sure that Mumbles are not undefined
export function getMumblesFromData(data: any[] | undefined): MumbleType[] {
  if (!data) return []
  return data.map((d) => (d ? d.mumbles : [])).flat()
}

// get highest count from all arrays
export function getHighestCount(data: any[] | undefined): number {
  if (!data) return 0
  return data.map((d) => (d ? d.count : 0)).reduce((a, b) => Math.max(a, b))
}
