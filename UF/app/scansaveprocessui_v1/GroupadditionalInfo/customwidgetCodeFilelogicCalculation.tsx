
    
    
    
    'use client'
import { useInfoMsg } from '@/app/components/infoMsgHandler'
import { TotalContext, TotalContextProps } from '@/app/globalContext'
import decodeToken from '@/app/components/decodeToken'
import { getCookie } from '@/app/components/cookieMgment'
import React, { use, useContext, useEffect, useRef } from 'react'
const ForNotFound = (props: any) => {
  const {savef2390, setsavef2390,setsignature3ad2e}= useContext(TotalContext) as TotalContextProps;
    
  const toast = useInfoMsg()
  const prevRefreshRef = useRef(false);
  const onloadButtonRef = useRef(false);
  useEffect(() => {
    if (!props?.basicinfo?.rate_ref_no && !props?.basicinfo?.rate_cust_id) {
      let dr_amount = Number(props?.basicinfo?.dr_amount)
      let exchange_rate = Number(props?.basicinfo?.exchange_rate)
      if (
        props?.basicinfo?.rate_code == 'TTS' ||
        props?.basicinfo?.rate_code == 'MEAN'
      ) {
        if (!isNaN(dr_amount) && !isNaN(exchange_rate)) {
          props?.setbasicinfo((prev: any) => {
            return {
              ...prev,
              cr_amount: Number((dr_amount * exchange_rate).toFixed(2))
            }
          })
        }
      } else if (props?.basicinfo?.rate_code == 'TTB') {
        if (!isNaN(dr_amount) && !isNaN(exchange_rate)) {
          props?.setbasicinfo((prev: any) => {
            return {
              ...prev,
              cr_amount: Number((dr_amount / exchange_rate).toFixed(2))
            }
          })
        }
      } else {
         if (prevRefreshRef.current) {
          if(props?.commoninfo?.dr_account)
        toast('No values in rate code field', 'danger')
         }else{
          prevRefreshRef.current = true;
         }
      }
    }
  }, [props?.basicinfo?.dr_amount, props?.basicinfo?.exchange_rate])

console.log(props?.additionalinfo?._itsFrom_);

  useEffect(() => {
console.log(props?.commoninfo?.dr_cust_ac_sanc_lmt,props?.basicinfo?.cr_amount)
    if(props?.commoninfo?.dr_cust_ac_balance<props?.basicinfo?.cr_amount){
      if(props?.commoninfo?.dr_cust_ac_sanc_lmt<props?.basicinfo?.cr_amount)
      {
        toast('no sufficient balance', 'warning')
        setsavef2390((prev:any)=>({...prev,isDisabled:true}))
      }
    }else
    {
      // if(props?.additionalinfo?._itsFrom_!='repair')
      //   setsavef2390((prev:any)=>({...prev,isDisabled:false}))
    }


  },[props?.basicinfo?.cr_amount])

   useEffect(() => {
      let dr_account:any = Number(props?.commoninfo?.dr_account)
      if(dr_account == '' || dr_account == undefined || !dr_account)
      {
        setsignature3ad2e((prev:any)=>({...prev,isDisabled:true}))
      }else{
        setsignature3ad2e((prev:any)=>({...prev,isDisabled:false}))
      }
  },[props?.commoninfo?.dr_account])

  return null
}
export default ForNotFound
  
 
 
 
