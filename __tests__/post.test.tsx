import * as queries from '../services/queries'

jest.mock('../services/queries')

describe('Test Loading of Single Mumbles from Api', () => {
  test('query single mumble from api', async () => {
    queries.fetchSingleMumble('123')
    expect(queries.fetchSingleMumble).toHaveBeenCalledTimes(1)
    expect(queries.fetchSingleMumble).toHaveBeenCalledWith('123')
  })
})
