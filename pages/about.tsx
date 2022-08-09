import { InferGetStaticPropsType } from 'next'
import { allAuthors } from 'contentlayer/generated'
import { About as AboutComponent } from '@/components/About'
import { useRedirectIfAboutMeOnly } from '@/hooks/useRedirectIfAboutMeOnly'

export const getStaticProps = async () => {
  const author = allAuthors.find((p) => p.slug === 'default')
  return { props: { author } }
}

export default function About({ author }: InferGetStaticPropsType<typeof getStaticProps>) {
  useRedirectIfAboutMeOnly()

  return <AboutComponent author={author} />
}
