
    'use client'
import React, { useContext, useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext'
import { useInfoMsg } from '@/app/components/infoMsgHandler'

const logicCodes = (props: any) => {
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps;
  const toast: Function = useInfoMsg()
  useEffect(() => {
    if (props?.op_financial_grp?.status_drp_dwn_op == 'RJCT') {
      toast('Reject Reason is mandatory when Status is set to "RJCT"')
      setValidate((pre: any) => ({
        ...pre,
        simulatorProcessUi_v1: {
          ...pre?.simulatorProcessUi_v1,
          reject_reason_drp_dwn_op: 'invalid'
        }
      })) 
      
    } else  {
      setValidate((pre: any) => ({
        ...pre,
        simulatorProcessUi_v1: {
          ...pre?.simulatorProcessUi_v1,
          reject_reason_drp_dwn_op: undefined
        }
      }))
    }
  }, [props?.op_financial_grp?.status_drp_dwn_op])

  return null
}
export default logicCodes
 
