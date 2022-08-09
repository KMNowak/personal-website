import siteMetadata from '@/data/siteMetadata'
import { useEffect } from 'react'
import Router from 'next/router'

export const useRedirectIfAboutMeOnly = () => {
  const { indexPageConfig: { displayOnlyAboutMe } } = siteMetadata

  useEffect(() => {
    if (displayOnlyAboutMe) {
      Router.push('/')
    }
  }, [displayOnlyAboutMe])

  return {
    hideContent: displayOnlyAboutMe
  }
}
