const BASE_URL = process.env.NEXT_PUBLIC_QWACKER_API_URL

type fetchProps = {
  url: string
  id?: string
  headers?: object
  body?: object
  details?: '/replies' | '/likes' | ''
  methode?: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

export const fetchService = async ({
  url,
  headers,
  id,
  details,
  methode = 'GET'
}: fetchProps) => {
  try {
    const data = await fetch(`${BASE_URL}${url}${id}${details}`, {
      method: methode,
      headers: {
        'content-type': 'application/json',
        ...headers
      }
    })
    return await data.json()
  } catch (error) {
    console.error(error)
  }
}
