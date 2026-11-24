
    'use client'
import React, { useContext, useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext'

const CodeFilevalidate = ({ investigationrequestcamt110subgroup }: any) => {
  const { setValidate } = useContext(TotalContext) as TotalContextProps

  useEffect(() => {
    if (
      investigationrequestcamt110subgroup?.investigation_reason === 'NARR' &&
      !investigationrequestcamt110subgroup?.reason_description?.trim()
    ) {
      setValidate((prev: any) => ({
        ...prev,
        nfInvestigationRequestCamt110_v1: {
          ...prev?.nfInvestigationRequestCamt110_v1,
          reason_description: 'invalid'
        }
      }))
    } else {
      setValidate((prev: any) => ({
        ...prev,
        nfInvestigationRequestCamt110_v1: {
          ...prev?.nfInvestigationRequestCamt110_v1,
          reason_description: undefined
        }
      }))
    }
  }, [
    investigationrequestcamt110subgroup?.investigation_reason
  ])

  return null
}

export default CodeFilevalidate 
