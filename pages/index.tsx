import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import { sortedBlogPost, allCoreContent } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import NewsletterForm from '@/components/NewsletterForm'
import { allAuthors, allBlogs } from 'contentlayer/generated'
import { LatestPosts } from '@/components/blog/LatestPosts'
import { About } from '@/components/About'

export const getStaticProps = async () => {
  // TODO: move computation to get only the essential frontmatter to contentlayer.config
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const author = allAuthors.find((p) => p.slug === 'default')

  return { props: { posts, author } }
}

export default function Home({ posts, author }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      {siteMetadata.indexPageConfig.displayOnlyAboutMe ? (
        <About author={author} />
      ) : (
        <>
          {siteMetadata.indexPageConfig.displayLatestPosts && <LatestPosts posts={posts} />}
          {siteMetadata.newsletter.provider !== '' && (
            <div className="flex items-center justify-center pt-4">
              <NewsletterForm />
            </div>
          )}
        </>
      )}
    </>
  )
}
