import { FC, useState, useEffect } from 'react'
import { Header, HeaderType } from '@smartive-education/thierry-simon-mumble'

type HashtagProps = {
  hashtags: string[]
  titel: string
}

export const Hashtag: FC<HashtagProps> = ({
  titel,
  hashtags
}: HashtagProps) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % hashtags.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [index])

  return (
    <Header style={HeaderType.h1} type={HeaderType.h1}>
      {titel} <div className="text-white w-10">{hashtags[index]}</div>
    </Header>
  )
}
