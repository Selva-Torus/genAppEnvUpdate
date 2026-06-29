// app/next-api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server'

const FULL_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
export const COOKIE_PREFIX = FULL_BASE_PATH.replace(/^\/|\/$/g, '').replace(
  /\//g,
  '_'
)

export async function GET(request: NextRequest) {
  // Fire and forget FA server-side logout
  try {
    const queryParams = new URLSearchParams();
    const app_tenant = request.cookies.get(`${COOKIE_PREFIX}_app_tenant`)?.value;
   
      if (app_tenant) {
        queryParams.append('tenant', app_tenant);
      }

    const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/fusionauth-credentials?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Issue while getting FusionAuth registration details: ${response.status}`,
    );
  }

  const {
    tenantUniqueId,
    applicationId,
    fusionAuthAppClientSecret,
  } = await response.json();

    await fetch(
      `${process.env.AUTH_FUSIONAUTH_ISSUER}/oauth2/logout?client_id=${applicationId}`,
      {
        method: 'GET',
        redirect: 'manual',
        headers: { 'X-FusionAuth-TenantId': tenantUniqueId }
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
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path: FULL_BASE_PATH,
    maxAge: 0
  }

  // Clear all cookie name variants
  response.cookies.set(`${COOKIE_PREFIX}_token`, '', cookieOptions)
  response.cookies.set(`${COOKIE_PREFIX}_tp_ps`, '', cookieOptions)
  response.cookies.set('token', '', cookieOptions)
  response.cookies.set(`${COOKIE_PREFIX}_oauth_state`, '', cookieOptions)
  response.cookies.set(`${COOKIE_PREFIX}_app_tenant`, '', cookieOptions)

  return response
}
