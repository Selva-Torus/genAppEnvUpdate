import { AxiosService } from '@/app/components/axiosService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const origin = searchParams.get('origin') || '/'
  const baseUrl = new URL(process.env.NEXT_PUBLIC_API_BASE_URL!).origin
  const FULL_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

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
        maxAge: 0
      }
      response.cookies.set(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX}_token`, signinApiResponse.data?.token, cookieOptions as any)
      response.cookies.set(`${process.env.NEXT_PUBLIC_COOKIE_PREFIX}_tp_ps`, '', {...cookieOptions , expires: new Date(0)} as any)
    } else {
      response = NextResponse.redirect(origin)
    }

    return response
  } catch {
    return NextResponse.redirect(origin)
  }
}
