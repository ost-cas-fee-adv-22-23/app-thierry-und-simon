export const fetchSingleMumble = async (id: string) => {
  console.log(id)
  try {
    const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts/${id}`
    const res = await fetch(url)
    const mumble = await res.json()
    return mumble
  } catch (error) {
    console.log(error)
  }
}

export default fetchSingleMumble
