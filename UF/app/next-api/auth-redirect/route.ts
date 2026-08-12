import { AxiosService } from '@/app/components/axiosService'
import { COOKIE_PREFIX, FULL_BASE_PATH } from '@/lib/cookies'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const baseUrl = new URL(process.env.NEXT_PUBLIC_APP_URL!).origin

  // `origin` is caller-supplied and was previously handed straight to
  // NextResponse.redirect() on every failure path — an open redirect that lets
  // an attacker send a victim from a trusted app URL to any site they choose.
  // Resolve it against our own origin and reject anything that leaves it.
  const resolveSafeOrigin = (raw: string | null): string => {
    const fallback = `${baseUrl}${FULL_BASE_PATH}/`
    if (!raw) return fallback
    try {
      const candidate = new URL(raw, baseUrl)
      return candidate.origin === baseUrl ? candidate.toString() : fallback
    } catch {
      return fallback
    }
  }
  const origin = resolveSafeOrigin(searchParams.get('origin'))


  try {
    if (!token) {
      return NextResponse.redirect(origin)
    }
    // verify token with the Origin
    const signinApiResponse = await AxiosService.post('UF/sso', {
      token,
      ufClientType: 'UFW'
    })

    let response

    if (signinApiResponse.status === 201) {
      if (signinApiResponse.data?.redirectToORPSelector) {
        response = NextResponse.redirect(
          new URL(
            `${process.env.NEXT_PUBLIC_BASE_PATH}/select-context`,
            baseUrl
          )
        )
      } else {
        response = NextResponse.redirect(
          new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/user`, baseUrl)
        )
      }
      const cookieOptions = {
        // httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        path: FULL_BASE_PATH,
        // maxAge: 0
      }
      response.cookies.set(`${COOKIE_PREFIX}_token`, signinApiResponse.data?.token, cookieOptions as any)
      response.cookies.set(`${COOKIE_PREFIX}_tp_ps`, '', {...cookieOptions , expires: new Date(0)} as any)
    } else {
      response = NextResponse.redirect(origin)
    }

    return response
  } catch {
    return NextResponse.redirect(origin)
  }
}
