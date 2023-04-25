import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Layout } from '../components/layout/layout'
import { usePreserveScroll } from '../hooks/usePreserveScroll'
import Head from 'next/head'
import '../styles/nprogress.css'
import NProgress from 'nprogress'
import { useEffect } from 'react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },

  ...appProps
}: AppProps) {
  usePreserveScroll()

  NProgress.configure({ showSpinner: false })
  useEffect(() => {
    const handleRouteStart = () => NProgress.start()
    const handleRouteDone = () => NProgress.done()

    appProps.router.events.on('routeChangeStart', handleRouteStart)
    appProps.router.events.on('routeChangeComplete', handleRouteDone)
    appProps.router.events.on('routeChangeError', handleRouteDone)

    return () => {
      // Make sure to remove the event handler on unmount!
      appProps.router.events.off('routeChangeStart', handleRouteStart)
      appProps.router.events.off('routeChangeComplete', handleRouteDone)
      appProps.router.events.off('routeChangeError', handleRouteDone)
    }
  }, [appProps.router])

  const getLayout = () => {
    if ([`/login`, `/register`].includes(appProps.router.pathname)) {
      return <Component {...pageProps} />
    } else {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )
    }
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>{getLayout()}</SessionProvider>
    </>
  )
}
