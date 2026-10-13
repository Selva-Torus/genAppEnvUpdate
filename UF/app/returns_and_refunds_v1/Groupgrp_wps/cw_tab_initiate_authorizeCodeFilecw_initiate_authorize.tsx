
    'use client'
import React, { useContext, useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { getCookie } from '@/app/components/cookieMgment';
import decodeToken from '@/app/components/decodeToken';
import { useGlobal } from '@/context/GlobalContext'
const ForNotFound = (props: any) => {
      const { token } = useGlobal();
    const {group2e463,setgroup2e463}= useContext(TotalContext) as TotalContextProps;
     const {group64e07,setgroup64e07}= useContext(TotalContext) as TotalContextProps;
       const {grp_overall_tran_list10bd5, setgrp_overall_tran_list10bd5}= useContext(TotalContext) as TotalContextProps;
    const decodedToken = decodeToken(token)
        const {grp_overall_tran_listc200a, setgrp_overall_tran_listc200a}= useContext(TotalContext) as TotalContextProps;

    useEffect(() => {
        const currentTab:string =props.tabgroup_return_refund?.tabgroup_return_refund;
        const currentRole:string =decodedToken.roleName

      
        
        if (currentTab === 'tab_header_return_frm_agent' && currentRole=='Maker') {
            setgroup2e463((prev: any) => ({ ...prev, p_process_name : 'RETURN_INITIATE' }))
            console.log("Process Name :RETURN_INITIATE");
        }else if(currentTab === 'tab_header_req_for_refund' && currentRole=='Maker'){
            setgroup64e07((prev: any) => ({ ...prev, p_process_name : 'REQUEST_INITIATE' }))
            console.log("Process Name :REQUEST_INITIATE");
        }else if(currentTab === 'tab_header_return_frm_agent' && currentRole=='Checker'){
          
            setgrp_overall_tran_list10bd5((prev: any) => ({ ...prev, p_process_name : 'RETURN_AUTHORIZE' }))
            console.log("Process Name :RETURN_AUTHORIZE");
        }else if(currentTab === 'tab_header_req_for_refund' && currentRole=='Checker'){
            setgrp_overall_tran_listc200a((prev: any) => ({ ...prev, p_process_name : 'REQUEST_AUTHORIZE' }))
            console.log("Process Name :REQUEST_AUTHORIZE");
        }
    }, [props.tabgroup_return_refund?.tabgroup_return_refund])

    return (
    <></>
    )
}
export default ForNotFound 
    

 
 
 
  
