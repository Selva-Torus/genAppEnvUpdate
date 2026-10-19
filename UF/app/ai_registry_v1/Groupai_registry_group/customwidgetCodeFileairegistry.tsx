
    'use client'

import React, { useState, useEffect, useContext, useRef } from 'react'

import { TotalContext, TotalContextProps } from '@/app/globalContext'

const customwidgetCodeFileairegistry = (props: any) => {
  const { edit_ai_registrya3497, setedit_ai_registrya3497 } = useContext(
    TotalContext
  ) as TotalContextProps
  const { delete_ai_registry1de8b, setdelete_ai_registry1de8b } = useContext(
    TotalContext
  ) as TotalContextProps

  useEffect(() => {
    setdelete_ai_registry1de8b((pre: any) => ({ ...pre, isDisabled: true }))
    setedit_ai_registrya3497((pre: any) => ({ ...pre, isDisabled: true }))
  }, [])

  useEffect(()=>{
 if(props?.ai_registry_tableProps?.selectedIds?.length)
 {
    setdelete_ai_registry1de8b((pre: any) => ({ ...pre, isDisabled: false }))
    setedit_ai_registrya3497((pre: any) => ({ ...pre, isDisabled: false }))
 }
  },[props?.ai_registry_tableProps?.selectedIds])
  return null
}

export default customwidgetCodeFileairegistry 
