import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Header,
  HeaderType,
  Icon,
  IconType,
  NaviButton
} from '@smartive-education/thierry-simon-mumble'

export const Navigation = () => {
  const { data: session } = useSession()

  return (
    <header className="h-20 bg-violet-600">
      <div className="flex items-center justify-between h-full max-w-3xl mx-auto px-10 color text-white">
        <Link href="/">
          <div className="flex items-center">
            <Header type={HeaderType.h1} style={HeaderType.h2}>
              Mumble
            </Header>
            <div className="ml-s">
              <Icon type={IconType.mumble} size={40} />
            </div>
          </div>
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            {session && (
              <>
                <li data-testid="login-profil">
                  <Link href={`profile/${session.user.id}`}>
                    <div className="rounded-full bg-purple-700 h-10 w-10 overflow-hidden">
                      {session?.user?.avatarUrl && (
                        <Image
                          src={session?.user?.avatarUrl}
                          alt={session?.user?.name || 'User'}
                          width={40}
                          height={40}
                        />
                      )}
                    </div>
                  </Link>
                </li>
                <li>
                  <NaviButton text="Settings" icon={IconType.profile} />
                </li>
                <li
                  onClick={() => {
                    signOut({
                      callbackUrl: '/'
                    })
                  }}
                  data-testid="logout"
                >
                  <NaviButton text="Logout" icon={IconType.logout} />
                </li>
              </>
            )}
            {!session && (
              <li>
                <Link href="/login">
                  <NaviButton text="Login" icon={IconType.mumble} />
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navigation
