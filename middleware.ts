import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })

  if (!token && req.nextUrl.pathname === '/') {
    return NextResponse.rewrite(`${req.nextUrl.origin}/mk-timeline`)
  }

  return NextResponse.next()
}
