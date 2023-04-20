/* eslint-disable @typescript-eslint/consistent-type-definitions */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
    accessToken?: string
  }
  interface User {
    id: string
    firstname: string
    lastname: string
    username: string
    avatarUrl?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    user?: User
  }
}
