import { NextRequest, NextResponse } from 'next/server'
import { buildAuthorizationUrl, generateCodeChallenge, generateCodeVerifier } from './lib/fusionauth'
import { COOKIE_PREFIX, FULL_BASE_PATH } from './lib/cookies'

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
  const token = request.cookies.get(`${COOKIE_PREFIX}_token`)?.value || "";
  const path = request.nextUrl.pathname
  const isAuthRoute = ["/" , "/forgot-password"].includes(path);
  const isForgotPasswordRoute = ["/forgot-password"].includes(path);
   let screenName:string = 'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:dashboard:AFVK:v1';
    let screenDetails: any = {
        keys:[
  {
    "screenName": "dashboard",
    "screensName": "dashboard-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:dashboard:AFVK:v1"
  },
  {
    "screenName": "ai registry",
    "screensName": "ai_registry-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIRegistry:AFVK:v1"
  },
  {
    "screenName": "discovery queue",
    "screensName": "discovery_queue-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:discoveryQueue:AFVK:v1"
  },
  {
    "screenName": "evidence packs",
    "screensName": "evidence_packs-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:auditEvidence:AFVK:v1"
  },
  {
    "screenName": "code type",
    "screensName": "code_type-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:codeTypes:AFVK:v1"
  },
  {
    "screenName": "code value",
    "screensName": "code_value-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1"
  },
  {
    "screenName": "integration source",
    "screensName": "integration_source-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1"
  },
  {
    "screenName": "integration run",
    "screensName": "integration_run-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1"
  },
  {
    "screenName": "integration field map",
    "screensName": "integration_field_map-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationFieldMap:AFVK:v1"
  },
  {
    "screenName": "risk rule",
    "screensName": "risk_rule-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1"
  },
  {
    "screenName": "risk rule condition",
    "screensName": "risk_rule_condition-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ruleCondition:AFVK:v1"
  },
  {
    "screenName": "certification template",
    "screensName": "certification_template-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1"
  },
  {
    "screenName": "certification template stage",
    "screensName": "certification_template_stage-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificationTemplateStage:AFVK:v1"
  },
  {
    "screenName": "ai agent action",
    "screensName": "ai_agent_action-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1"
  },
  {
    "screenName": "asset version",
    "screensName": "asset_version-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AiAssetVersion:AFVK:v1"
  },
  {
    "screenName": "asset dependency",
    "screensName": "asset_dependency-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AiAssetDependency:AFVK:v1"
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
    const state = generateRandomString(32);
    const codeVerifier = generateCodeVerifier()
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    const appTenantParam = request.nextUrl.searchParams.get('tenant');
    
    try {
       const authResponse = await buildAuthorizationUrl(state, codeChallenge, appTenantParam)
       if(!authResponse) throw new Error('Fausion auth details not found')
       const response = NextResponse.redirect(authResponse.url)
       response.cookies.set(`${COOKIE_PREFIX}_tp_ps`, '', {
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          path: FULL_BASE_PATH,
          maxAge: 0
       })
       response.cookies.set(`${COOKIE_PREFIX}_oauth_state`, state, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          path: FULL_BASE_PATH,
          maxAge: 60 * 10
       })
       response.cookies.set(`${COOKIE_PREFIX}_pkce_verifier`, codeVerifier, {   // ← new
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

}

export const config = {
  matcher: [
    '/((?!api/|next-api/|_next/static|_next/image|robots.txt|public|images|manifest.json|sw.js|favicon.ico|workbox-*).*)',
    '/'
  ]
}
