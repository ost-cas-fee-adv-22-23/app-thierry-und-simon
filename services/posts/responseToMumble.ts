export const fetchResponseToMumble = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts/${id}/replies`
    const res = await fetch(url)
    const responses = await res.json()
    console.log(responses)
    return responses
  } catch (error) {
    console.log(error)
  }
}
