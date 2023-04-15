export const fetchUser = async (accessToken: string, id: string) => {
  const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}users/${id}`

  const res = await fetch(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  const user = await res.json()
  return user
}
