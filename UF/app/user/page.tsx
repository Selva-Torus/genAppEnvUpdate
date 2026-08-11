

'use client'
import React, { useEffect } from 'react'
import SetupScreen from './components'
import { AxiosService } from '../components/axiosService'
import {
  deleteAllCookies,
  getCookie,
  setCookie
} from '../components/cookieMgment'
import { useRouter } from 'next/navigation'
import decodeToken from '../components/decodeToken'
import { useGlobal } from '@/context/GlobalContext'

function page() {
  const { token } = useGlobal()
  const decodedToken = decodeToken(token)
  const router = useRouter()
  let landingScreen: string = 'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:dashboard:AFVK:v1'
  const encryptionFlagApp: boolean = false;    
  const securityCheck = async () => {
    try {
      const encryptionDpd: string =
        'CK:CT006:FNGK:AF:FNK:CDF-DPD:CATK:LAP:AFGK:LAP:AFK:lapDPD:AFVK:v1'
      const encryptionMethod: string = ''
      let introspect: any
      if (encryptionFlagApp) {
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
      } else {
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
        }
        if (introspect?.data?.updatedToken) {
          setCookie('token', introspect?.data.updatedToken)
        }
      } else {
        await deleteAllCookies()
      }
    } catch (err: any) {
      await deleteAllCookies()
    }
  }

  useEffect(() => {
    if (token) {
      securityCheck()
    }
  }, [token])

  return (
    <div>
      <SetupScreen />
    </div>
  )
}

export default page