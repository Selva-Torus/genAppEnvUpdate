import { NextRequest, NextResponse } from 'next/server'
import { getServerCookie, deleteServerCookie } from '@/app/components/cookieMgment'
import { buildAuthorizationUrl } from './lib/fusionauth'

const FULL_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const COOKIE_PREFIX = FULL_BASE_PATH.replace(/^\/|\/$/g, '').replace(
  /\//g,
  '_'
)

function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map(b => chars[b % chars.length])
    .join('')
}

function decodeTokenPayload(token: string): any {
  try {
    return JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('utf8')
    )
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const token = getServerCookie(request, 'token')
  const path = request.nextUrl.pathname
  const isAuthRoute = ["/" , "/forgot-password"].includes(path);
   let screenName:string = 'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:VGPH:AFK:transaction:AFVK:v1';
    let screenDetails: any = {
        keys:[
  {
    "screenName": "my transaction",
    "screensName": "my_transaction-v1",
    "ufKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:VGPH:AFK:transaction:AFVK:v1"
  }
]
    }
    screenDetails = screenDetails.keys
        
    if (screenName === 'User Screen') {
        screenName = 'user'
    }else if (screenName === 'Logs Screen') {
        screenName = 'logs'
    }
   else{
        screenDetails.forEach((screen: any)   => {
        if (screenName === screen.ufKey) {
            screenName = screen.screensName
        }  
        });
        screenName =screenName.split('-')[0]+'_'+screenName.split('-').at(-1)
    }
  const landingScreen = `/${screenName}`

  if (!token && !isAuthRoute)
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}`, request.url)
    )

     const { pathname } = request.nextUrl

  // ── Always bypass these paths ────────────────────────────────────────────
  if (
    pathname.includes('/next-api/auth/callback') ||
    pathname.includes('/next-api/auth/logout') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/next-api/')
  ) {
    return NextResponse.next()
  }

  const isRootOrAuth =
    pathname === FULL_BASE_PATH ||
    pathname === `${FULL_BASE_PATH}/` ||
    pathname === `${FULL_BASE_PATH}/forgot-password`

  // ── No token → redirect to FusionAuth ───────────────────────────────────
  if (!token) {
    const state = generateRandomString(32)
    const authUrl = buildAuthorizationUrl(state)
    const response = NextResponse.redirect(authUrl)
    response.cookies.set(`${COOKIE_PREFIX}_oauth_state`, state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 10
    })
    return response
  }

  // ── Has token + on auth route → redirect to app ──────────────────────────
  if (token && isRootOrAuth) {
    const parsed = decodeTokenPayload(token)
    const destination = parsed?.psCode
      ? `${FULL_BASE_PATH}${landingScreen}`
      : `${FULL_BASE_PATH}/select-context`
    return NextResponse.redirect(new URL(destination, request.url))
  }

  return NextResponse.next()

//  if (token && isAuthRoute) {
//    try {
//      const decodedToken = Buffer.from(token!.split('.')[1], 'base64').toString(
//        'utf8'
//      )
//      const parsedToken = decodedToken ? JSON.parse(decodedToken) : {}
//      if (parsedToken?.psCode) {
//        return NextResponse.redirect(
//          new URL(
//            `${process.env.NEXT_PUBLIC_BASE_PATH}${landingScreen}`,
//            request.url
//          )
//        )
//      } else {
//        return NextResponse.redirect(
//          new URL(
//            `${process.env.NEXT_PUBLIC_BASE_PATH}/select-context`,
//            request.url
//          )
//        )
//      }
//    } catch (error) {
//      deleteServerCookie(request, 'token')
//      return NextResponse.redirect(
//        new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}`, request.url)
//      )
//    }
//  }
//
//  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api/|next-api/|_next/static|_next/image|robots.txt|public|images|manifest.json|sw.js|favicon.ico|workbox-*).*)',
    '/'
  ]
}
