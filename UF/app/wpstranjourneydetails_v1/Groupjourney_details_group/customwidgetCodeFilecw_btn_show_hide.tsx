
    
'use client'
import React, { useContext, useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';

const CodeFilecw_btn_show_hide = (props: any) => {
     console.log(props?.journey_details_group)
    const {view_tran_log_btn00416:view_tran_log_btn, setview_tran_log_btn00416:setview_tran_log_btn}= useContext(TotalContext) as TotalContextProps;
    useEffect(()=>{
      if(props?.journey_details_group?.response_data||props?.journey_details_group?.request_data)
        setview_tran_log_btn((pre:any)=>({...pre,isDisabled:false}))
    else
        setview_tran_log_btn((pre:any)=>({...pre,isDisabled:true}))
    })
    return (
    null
    )
}
export default CodeFilecw_btn_show_hide
 
