
'use client'
import LoginForm from './components/LoginForm';
import { AxiosService } from './components/axiosService';
import { deleteAllCookies, deleteCookie, getCookie } from './components/cookieMgment';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import decodeToken from './components/decodeToken';
import { useInfoMsg } from './components/infoMsgHandler';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,ScreenDetail } from '@/types/global';
import { useGlobal } from '@/context/GlobalContext';

export default function HomePage() {
  const router : AppRouterInstance = useRouter();
  const { token } = useGlobal()
  const decodedToken : DecodedToken = decodeToken(token);
  const encryptionFlagApp: boolean = false;    
  let landingScreen:string = 'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:newDashboard:AFVK:v1';
  const toast : Function = useInfoMsg();
  let screenDetails : ScreenDetail[] = [
  {
    "screenName": "dashboard",
    "screensName": "dashboard-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:newDashboard:AFVK:v1"
  },
  {
    "screenName": "report",
    "screensName": "report-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFR:CATK:LAP:AFGK:LAP:AFK:report:AFVK:v1"
  },
  {
    "screenName": "filing packages",
    "screensName": "filing_packages-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "submissions hub",
    "screensName": "submissions_hub-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "service tracking",
    "screensName": "service_tracking-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "judgments",
    "screensName": "judgments-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "enforcement",
    "screensName": "enforcement-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "kill-switch control",
    "screensName": "kill-switch_control-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "compliance",
    "screensName": "compliance-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "analytics",
    "screensName": "analytics-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  }
]
  const isSaasApp = process.env.NEXT_PUBLIC_IS_SAAS_APPLICATION;
  const [appTenantList , setAppTenantList] = useState([]);
  const securityCheck = async () : Promise<void> => {
    try {
      const encryptionDpd: string = "CK:CT006:FNGK:AF:FNK:CDF-DPD:CATK:LAP:AFGK:LAP:AFK:lapDPD:AFVK:v1";
      const encryptionMethod: string = "";
      let introspect:any;
      if(encryptionFlagApp){
        introspect = await AxiosService.get('/UF/introspect', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            dpdKey: encryptionDpd,
            method: encryptionMethod,
            key:"Logs Screen"
          }
        })        
      }else{
        introspect = await AxiosService.get('/UF/introspect', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            key:"Logs Screen"  
          }
        })
      }

      if (introspect?.data?.authenticated) {
        if (!decodedToken.selectedAccessProfile) {
          router.push('/select-context')
        } else if (landingScreen === 'User Screen') {
          router.push('/user')
          }
          else if (landingScreen === 'Logs Screen') {
          router.push('/logs')
        }
        else {
          let defaultScreen : string = "";
            screenDetails.map((screen: any) => {
              if (landingScreen === screen.ufKey) {
                defaultScreen = screen.screensName
              }
            })
            defaultScreen =
              defaultScreen.split('-')[0] +
              '_' +
              defaultScreen.split('-').at(-1)
              if(defaultScreen)
                router.push('/' + defaultScreen)
          }
      } else {
        await deleteAllCookies()
      }
    } catch (err: any) {
      await deleteAllCookies()
    }
  }

    const handleGetAppSubTenants = async () => {
    const appTenants = await AxiosService.get('UF/app-tenant-app' , {
      validateStatus: () => true
    })
    if(appTenants.status == 200){
       setAppTenantList(appTenants.data)
       return
    }
    setAppTenantList([])
    return
  }

  useEffect(() => {
    if(token)
    {
      securityCheck()
    }
    if (getCookie('server_error')) {
      toast(decodeURIComponent(getCookie('server_error')), 'danger')
      deleteCookie('server_error')
    }
    if(isSaasApp){
      handleGetAppSubTenants()
    }
  }, [token])

  return (
    <>
      <LoginForm logo=""  image="" appTenantList={appTenantList}/>
    </>
  )
}
 