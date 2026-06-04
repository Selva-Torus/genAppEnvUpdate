// app/next-api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { fusionAuthConfig } from '@/lib/fusionauth'

const FULL_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
export const COOKIE_PREFIX = FULL_BASE_PATH.replace(/^\/|\/$/g, '').replace(
  /\//g,
  '_'
)

export async function GET(request: NextRequest) {
  // Fire and forget FA server-side logout
  try {
    await fetch(
      `${fusionAuthConfig.baseUrl}/oauth2/logout?client_id=${fusionAuthConfig.clientId}`,
      {
        method: 'GET',
        redirect: 'manual',
        headers: { 'X-FusionAuth-TenantId': fusionAuthConfig.tenantId }
      }
    )
  } catch {
    // non-blocking
  }

  // Redirect to app root — middleware will handle sending to FA login
  const response = NextResponse.redirect(
    new URL(`${process.env.NEXT_PUBLIC_APP_URL}${FULL_BASE_PATH}/`)
  )

  const cookieOptions = {
    // httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 0
  }

  // Clear all cookie name variants
  response.cookies.set(`${COOKIE_PREFIX}_token`, '', cookieOptions)
  response.cookies.set('token', '', cookieOptions)
  response.cookies.set(`${COOKIE_PREFIX}_oauth_state`, '', cookieOptions)

  return response
}
