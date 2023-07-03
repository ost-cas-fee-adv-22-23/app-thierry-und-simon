import { render, screen } from '@testing-library/react'
import { MumbleCard } from '../components/mumbleCard'
import { useSession } from 'next-auth/react'
import singelMumble from '../__mocks__/singleMumble.json'

jest.mock('next-auth/react')

describe('Test Single Mumble Component and its functionality', () => {
  const mumble = singelMumble
  it('should render Single Mumble component', () => {
    const mockSession = {
      user: { name: 'Simon Herensperger', email: 'sh@eoss.ch' },
      expires: '1234567890'
    }
    ;(useSession as jest.Mock).mockReturnValue([mockSession, true])

    const { getAllByTestId } = render(
      <MumbleCard mumble={mumble} showUser={true} />
    )
    const singleMumble = getAllByTestId('single-mumble')
    expect(singleMumble).toBeTruthy()

    const singleMumbleText = screen.getByTestId('single-mumble-text')
    expect(singleMumbleText).toBeTruthy()
    expect(singleMumbleText).toHaveTextContent(
      'E2E Test Thierry-Simon ID: 23610'
    )
  })
})
