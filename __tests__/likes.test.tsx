import * as mutations from '../services/mutations'
import { useSession } from 'next-auth/react'

jest.mock('../services/mutations')
jest.mock('next-auth/react')

describe('Test Like Mumble functionality', () => {
  test('call api to like mumble', async () => {
    const mockSession = {
      user: {
        name: 'Simon Herensperger',
        email: 'sh@eoss.ch',
        accessToken: 'ac-123'
      },
      expires: '1234567890'
    }
    ;(useSession as jest.Mock).mockReturnValue([mockSession, true])
    mutations.likeMumble('123', mockSession.user.accessToken)
    expect(mutations.likeMumble).toHaveBeenCalledTimes(1)
    expect(mutations.likeMumble).toHaveBeenCalledWith('123', 'ac-123')
  })
})
