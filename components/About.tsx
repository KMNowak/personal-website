import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { allAuthors } from 'contentlayer/generated'
import { Chat } from '@/components/chat'

interface Props {
  author: typeof allAuthors[number]
}

const DEFAULT_LAYOUT = 'AuthorLayout'

export const About = (props: Props) => {
  const { author } = props
  return (
    <>
      <Chat />
      <MDXLayoutRenderer layout={author.layout || DEFAULT_LAYOUT} content={author} />
    </>
  )
}
