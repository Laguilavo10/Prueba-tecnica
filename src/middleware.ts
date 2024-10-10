/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function middleware(request: Request) {
  const url = new URL(request.url)
  const token = cookies().get('Token')

  const jwtKey = new TextEncoder().encode(process.env.JWT_SIGN)

  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/proyectos', request.url).toString())
  }
  if (url.pathname === '/login') {
    if (token) {
      try {
        await jwtVerify(token.value, jwtKey)
        return NextResponse.redirect(new URL('/proyectos', request.url).toString())
      } catch (error) {
        return NextResponse.next()
      }
    }
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url).toString())
  }

  try {
    await jwtVerify(token.value, jwtKey)
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url).toString())
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
