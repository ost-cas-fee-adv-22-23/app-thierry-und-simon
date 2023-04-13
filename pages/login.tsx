import {
  Button,
  ButtonColor,
  ButtonSize,
  Header,
  HeaderType,
  Icon,
  IconType,
  Label,
  LabelType
} from '@smartive-education/thierry-simon-mumble'
import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { Hashtag } from '../components/hashtag'

export default function Home() {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen">
        <section className="flex-1 flex flex-col justify-center items-center bg-gradient-to-b from-pink-500 to-violet-700 text-pink-300 text-center">
          <Icon type={IconType.logo_narrow} size={335} />
          <Hashtag
            hashtags={['#mumble', '#style', '#bla']}
            titel="find out what's new in"
          />
        </section>
        <section className="flex-1 flex flex-col justify-center items-center gap-10">
          <Header style={HeaderType.h1} type={HeaderType.h1}>
            Anmelden
          </Header>
          {!!session && (
            <a
              href="#"
              onClick={() =>
                signOut({
                  callbackUrl: '/'
                })
              }
            >
              <h2 className="font-medium">Logout &rarr;</h2>
              <p className="font-medium">Logout from your account</p>
            </a>
          )}

          {!session && (
            <Link
              href="/"
              onClick={() =>
                signIn('zitadel', {
                  callbackUrl: '/'
                })
              }
            >
              <Button
                size={ButtonSize.large}
                color={ButtonColor.gradiant}
                label="Let's Mumble"
              />
            </Link>
          )}
          <Label type={LabelType.M}>
            Noch nicht registriert?{' '}
            <Link href="/register" className="text-violet-600 underline">
              Jetzt registrieren
            </Link>
          </Label>
        </section>
      </main>
    </>
  )
}
