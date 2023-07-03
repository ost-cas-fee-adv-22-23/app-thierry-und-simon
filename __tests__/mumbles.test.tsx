import { render } from '@testing-library/react'
import { Cards } from '../components/cards'
import { useSession } from 'next-auth/react'
import mumblesList from '../__mocks__/mumbles.json'

jest.mock('next-auth/react')

describe('Test Single Mumble Component and its functionality', () => {
  const mumbles = mumblesList
  it('should render List of Mumbles', () => {
    const mockSession = {
      user: { name: 'Simon Herensperger', email: 'sh@eoss.ch' },
      expires: '1234567890'
    }
    ;(useSession as jest.Mock).mockReturnValue([mockSession, true])

    const { getAllByTestId } = render(<Cards posts={mumbles} showUser={true} />)
    const mumbleList = getAllByTestId('mumbles-list')
    expect(mumbleList).toBeTruthy()
  })
})
