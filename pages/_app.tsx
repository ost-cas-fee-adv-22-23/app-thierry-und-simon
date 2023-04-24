import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Layout } from '../components/layout/layout'
import { usePreserveScroll } from '../hooks/usePreserveScroll'
import Head from 'next/head'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}: AppProps) {
  usePreserveScroll()
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
