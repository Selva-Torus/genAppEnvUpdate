import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname
  const isAuthRoute = ["/" , "/forgot-password"].includes(path);
   let screenName:string = 'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Report:AFVK:v1';
    let screenDetails: any = {
        keys:[
  {
    "screenName": "user home screen",
    "screensName": "user_home_screen-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_User:AFVK:v1"
  },
  {
    "screenName": "manager home screen",
    "screensName": "manager_home_screen-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Dashboard_For_Manager:AFVK:v1"
  },
  {
    "screenName": "user daily expense",
    "screensName": "user_daily_expense-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Daily_Expense_User_Table:AFVK:v1"
  },
  {
    "screenName": "user offsite expense",
    "screensName": "user_offsite_expense-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Offsite_Expense_User_Table:AFVK:v1"
  },
  {
    "screenName": "manager daily expense",
    "screensName": "manager_daily_expense-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Daily_Expense_Manager_Table:AFVK:v1"
  },
  {
    "screenName": "manager offsite expense",
    "screensName": "manager_offsite_expense-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Offsite_Expense_Manager_Table:AFVK:v1"
  },
  {
    "screenName": "report",
    "screensName": "report-v1",
    "ufKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Report:AFVK:v1"
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

  if (token && isAuthRoute) {
    try {
      const decodedToken = Buffer.from(token!.split('.')[1], 'base64').toString(
        'utf8'
      )
      const parsedToken = decodedToken ? JSON.parse(decodedToken) : {}
      if (parsedToken?.psCode) {
        return NextResponse.redirect(
          new URL(
            `${process.env.NEXT_PUBLIC_BASE_PATH}${landingScreen}`,
            request.url
          )
        )
      } else {
        return NextResponse.redirect(
          new URL(
            `${process.env.NEXT_PUBLIC_BASE_PATH}/select-context`,
            request.url
          )
        )
      }
    } catch (error) {
      request.cookies.delete('token')
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}`, request.url)
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|robots.txt|public|images|manifest.json|sw.js|favicon.ico|workbox-*).*)',
    '/'
  ]
}
