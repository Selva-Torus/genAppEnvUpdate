
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
    if (props?.op_simulator_sub_group?.status == 'RJCT') {
      toast('Reject Reason is mandatory when Status is set to "RJCT"')
      setValidate((pre: any) => ({
        ...pre,
        ackSimulator_v1: {
          ...pre?.ackSimulator_v1,
          reject_reason: 'invalid'
        }
      })) 
    } else  {
      setValidate((pre: any) => ({
        ...pre,
        ackSimulator_v1: {
          ...pre?.ackSimulator_v1,
          reject_reason: undefined
        }
      }))
    }
  }, [props?.op_simulator_sub_group?.status])

  return null
}
export default logicCodes
 
