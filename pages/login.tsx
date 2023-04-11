import {
  Button,
  ButtonColor,
  ButtonSize,
  Header,
  HeaderType
} from '@smartive-education/thierry-simon-mumble'
import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'

export default function Home() {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen">
        <section className="flex-1 bg-gradient-to-b from-pink-500 to-violet-700"></section>
        <section className="flex-1 flex flex-col justify-center items-center ">
          <Header style={HeaderType.h1} type={HeaderType.h1}>
            Anmelden
          </Header>
          {!!session && (
            <a href="#" onClick={() => signOut()}>
              <h2 className="font-medium">Logout &rarr;</h2>
              <p className="font-medium">Logout from your account</p>
            </a>
          )}

          {!session && (
            <a href="#" onClick={() => signIn('zitadel')}>
              <Button
                size={ButtonSize.large}
                color={ButtonColor.gradiant}
                label="Let's Mumble"
              />
            </a>
          )}
        </section>
      </main>
    </>
  )
}
