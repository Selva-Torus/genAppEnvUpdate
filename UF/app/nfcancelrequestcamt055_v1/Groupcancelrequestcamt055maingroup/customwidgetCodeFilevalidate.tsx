
    'use client'
import React, { useContext, useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext'

const CodeFilevalidate = ({ cancelrequestcamt055subgroup }: any) => {
  const { setValidate } = useContext(TotalContext) as TotalContextProps

  useEffect(() => {
    if (
      cancelrequestcamt055subgroup?.cancel_reason === 'NARR' &&
      !cancelrequestcamt055subgroup?.reason_description?.trim()
    ) {
      setValidate((prev: any) => ({
        ...prev,
        nfCancelRequestCamt055_v1: {
          ...prev?.nfCancelRequestCamt055_v1,
          reason_description: 'invalid'
        }
      }))
    } else {
      setValidate((prev: any) => ({
        ...prev,
        nfCancelRequestCamt055_v1: {
          ...prev?.nfCancelRequestCamt055_v1,
          reason_description: undefined
        }
      }))
    }
  }, [
    cancelrequestcamt055subgroup?.cancel_reason
  ])

  return null
}

export default CodeFilevalidate
 
