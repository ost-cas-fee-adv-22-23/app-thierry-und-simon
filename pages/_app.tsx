import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import '../styles/globals.css'
import { Layout } from '../components/layout/layout'
import { SWRConfig } from 'swr'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}: AppProps) {
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
    <SWRConfig value={pageProps.fallback}>
      <SessionProvider session={session}>{getLayout()}</SessionProvider>
    </SWRConfig>
  )
}
