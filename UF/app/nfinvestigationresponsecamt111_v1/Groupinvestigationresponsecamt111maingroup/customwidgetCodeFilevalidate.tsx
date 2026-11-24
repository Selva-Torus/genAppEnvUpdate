
    'use client'
import React, { useContext, useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext'

const CodeFilevalidate = ({ investigationresponsecamt111subgroup }: any) => {
  const { setValidate } = useContext(TotalContext) as TotalContextProps

  useEffect(() => {
    if (
      investigationresponsecamt111subgroup?.response_reason === 'NARR' &&
      !investigationresponsecamt111subgroup?.reason_description?.trim()
    ) {
      setValidate((prev: any) => ({
        ...prev,
        nfInvestigationResponseCamt111_v1: {
          ...prev?.nfInvestigationResponseCamt111_v1,
          reason_description: 'invalid'
        }
      }))
    } else {
      setValidate((prev: any) => ({
        ...prev,
        nfInvestigationResponseCamt111_v1: {
          ...prev?.nfInvestigationResponseCamt111_v1,
          reason_description: undefined
        }
      }))
    }
  }, [
    investigationresponsecamt111subgroup?.response_reason
  ])

  return null
}

export default CodeFilevalidate 
