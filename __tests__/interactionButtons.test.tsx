import { render } from '@testing-library/react'
import { InteractionButtons } from '../components/interactionButtons'
import { useSession } from 'next-auth/react'
import singelMumble from '../__mocks__/singleMumble.json'

jest.mock('next-auth/react')

describe('Test InteractionButtons and its functionality', () => {
  const mumble = singelMumble
  it('should render InteractionButtons component', () => {
    const mockSession = {
      user: { name: 'Simon Herensperger', email: 'sh@eoss.ch' },
      expires: '1234567890'
    }
    ;(useSession as jest.Mock).mockReturnValue([mockSession, true])

    const { getAllByTestId } = render(<InteractionButtons post={mumble} />)
    const interactionButtons = getAllByTestId('like-button')
    expect(interactionButtons).toBeTruthy()
  })
})
