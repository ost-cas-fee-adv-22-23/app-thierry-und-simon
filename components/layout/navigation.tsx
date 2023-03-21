import { useSession } from 'next-auth/react'
import { IconType, NaviButton } from '@smartive-education/thierry-simon-mumble'

export const Navigation = () => {
  const { data: session } = useSession()
  console.log(session)
  return (
    <header className="h-20 bg-violet-600">
      <div className="flex items-center justify-between h-full max-w-3xl mx-auto px-10 color text-white">
        <h1>Mumble</h1>
        <nav>
          <ul className="flex items-center gap-6">
            {session && (
              <>
                <li>
                  <div className="rounded-full bg-purple-700 h-10 w-10"></div>
                </li>
                <li>
                  <NaviButton text="Settings" icon={IconType.profile} />
                </li>
                <li>
                  <NaviButton text="Logout" icon={IconType.logout} />
                </li>
              </>
            )}
            {!session && (
              <li>
                <NaviButton text="Login" icon={IconType.mumble} />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navigation
