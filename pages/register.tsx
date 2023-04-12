import { useState } from 'react'
import {
  Button,
  ButtonColor,
  ButtonSize,
  FormWrapper,
  Header,
  HeaderType,
  Icon,
  IconType,
  Input,
  Label,
  LabelType
} from '@smartive-education/thierry-simon-mumble'
import Head from 'next/head'
import Link from 'next/link'
import { Hashtag } from '../components/hashtag'

type RegistetType = {
  name: string
  email: string
  password: string
  username: string
}

export default function Register() {
  const [user, setUser] = useState<RegistetType>({
    name: '',
    email: '',
    password: '',
    username: ''
  })

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('User Registrier', event, user)
  }

  return (
    <>
      <Head>
        <title>Registrieren</title>
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
            Registrieren
          </Header>
          <FormWrapper onSubmit={() => handleFormSubmit}>
            <Input
              name="name"
              type="text"
              label="Vorname Name"
              id="name"
              onChange={(event) =>
                setUser({ ...user, name: event.target.value })
              }
              value={user.name}
            />
            <Input
              name="username"
              type="text"
              label="User Name"
              id="user"
              onChange={(event) =>
                setUser({ ...user, username: event.target.value })
              }
              value={user.username}
            />
            <Input
              name="email"
              type="text"
              label="E-Mail"
              id="email"
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
              value={user.email}
            />
            <Input
              name="password"
              type="password"
              label="Passwort"
              id="password"
              onChange={(event) =>
                setUser({ ...user, password: event.target.value })
              }
              value={user.password}
            />
            <Button
              label="Let's Mumble"
              size={ButtonSize.large}
              color={ButtonColor.gradiant}
              onClick={() => console.log('User registered', user)}
            />
          </FormWrapper>
          <Label type={LabelType.M}>
            Bereits registriert?{' '}
            <Link href="/login" className="text-violet-600 underline">
              Jetzt anmelden
            </Link>
          </Label>
        </section>
      </main>
    </>
  )
}
