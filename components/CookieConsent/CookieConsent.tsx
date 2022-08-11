import React, { ReactElement, useState, useEffect } from 'react'
import cn from 'clsx'
import { setCookie, hasCookie } from 'cookies-next'
import s from './CookieConsent.module.css'

const cookieMaxAge = {
  year: 60 * 60 * 24 * 365,
  day: 60 * 60 * 24,
}

const GALocalConsentCookieName = 'localConsent'

export const CookieConsent = (): ReactElement => {
  const [userChose, setUserChose] = useState(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => setUserChose(hasCookie(GALocalConsentCookieName)), 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  const acceptCookie = () => {
    setUserChose(true)
    setCookie(GALocalConsentCookieName, 'true', { maxAge: cookieMaxAge.year })
    window.gtag &&
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      })
  }
  const denyCookie = () => {
    setUserChose(true)
    setCookie(GALocalConsentCookieName, 'false', { maxAge: cookieMaxAge.day })
  }

  if (userChose) {
    return null
  }
  return (
    <div className={cn(s.root, 'dark:border-gray-100 dark:bg-gray-900')}>
      <p>
        This Site uses cookies to provide the best user experience. You can accept or deny them.
      </p>
      <div className={s.buttonBox}>
        <button onClick={denyCookie} className={cn(s.buttonDeny, 'dark:bg-gray-900')}>
          Deny All
        </button>
        <button
          onClick={acceptCookie}
          className={cn(s.buttonAccept, 'dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900')}
        >
          Accept All
        </button>
      </div>
    </div>
  )
}
