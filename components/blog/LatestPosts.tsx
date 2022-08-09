import siteMetadata from '@/data/siteMetadata'
import { PostList } from '@/components/blog/PostList'
import Link from '@/components/Link'
import { Blog } from 'contentlayer/generated'

interface LatestPostsProps {
  posts: Omit<Blog, '_id' | '_raw' | 'body'>[]
}

const MAX_DISPLAY = 5

export const LatestPosts = (props: LatestPostsProps) => {
  const { posts } = props

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <PostList posts={posts} maxDisplay={MAX_DISPLAY} />
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
