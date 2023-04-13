import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Layout } from '../components/layout/layout'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}: AppProps) {
  const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>{getLayout()}</SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
