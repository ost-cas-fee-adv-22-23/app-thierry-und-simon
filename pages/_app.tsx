import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import '../styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  const hello = 'hello'
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
