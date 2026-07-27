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

export async function middleware(request: NextRequest) {
  const token = getServerCookie(request, 'token')
  const path = request.nextUrl.pathname
  const isAuthRoute = ["/" , "/forgot-password"].includes(path);
  const isForgotPasswordRoute = ["/forgot-password"].includes(path);
   let screenName:string = 'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1';
    let screenDetails: any = {
        keys:[
  {
    "screenName": "dashboard",
    "screensName": "dashboard-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1"
  },
  {
    "screenName": "employees",
    "screensName": "employees-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1"
  },
  {
    "screenName": "access request",
    "screensName": "access_request-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:accessRequest:AFVK:v1"
  },
  {
    "screenName": "leave management",
    "screensName": "leave_management-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leaveRequest:AFVK:v1"
  },
  {
    "screenName": "background check",
    "screensName": "background_check-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1"
  },
  {
    "screenName": "performance review",
    "screensName": "performance_review-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceReview:AFVK:v1"
  },
  {
    "screenName": "job grades",
    "screensName": "job_grades-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobGrades:AFVK:v1"
  },
  {
    "screenName": "job position",
    "screensName": "job_position-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobPositions:AFVK:v1"
  },
  {
    "screenName": "leave policy",
    "screensName": "leave_policy-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leavePolicy:AFVK:v1"
  },
  {
    "screenName": "performance cycle",
    "screensName": "performance_cycle-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceCycles:AFVK:v1"
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
    pathname === '/' ||
    pathname === FULL_BASE_PATH ||
    pathname === `${FULL_BASE_PATH}/` ||
    pathname === `/forgot-password`

 if (!token && !isForgotPasswordRoute) {
    const state = generateRandomString(32)
    const appTenantParam = request.nextUrl.searchParams.get('tenant');
    
    try {
       const authResponse = await buildAuthorizationUrl(state , appTenantParam)
       if(!authResponse) throw new Error('Fausion auth details not found')
       const response = NextResponse.redirect(authResponse.url)
       response.cookies.set(`${COOKIE_PREFIX}_oauth_state`, state, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          path: FULL_BASE_PATH,
          maxAge: 60 * 10
       })
       if(appTenantParam && authResponse.appTenantId){
         response.cookies.set(`${COOKIE_PREFIX}_app_tenant`, appTenantParam, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          path: FULL_BASE_PATH,
          maxAge: 60 * 10
       })
         response.cookies.set(`${COOKIE_PREFIX}_app_tenant_id`, authResponse.appTenantId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          path: FULL_BASE_PATH,
          maxAge: 60 * 10
       })
      }
    return response
    } catch (error) {
      return NextResponse.json({
        status : (error as any).status ?? 400,
        message : (error as any).message ?? 'There are some Misconfiguration , please check your tenant configuration'
      })
    }
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
