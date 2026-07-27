

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Text } from '@/components/Text';
import { Checkbox } from '@/components/Checkbox';
import {Modal} from '@/components/Modal';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';


const Checkboxemergency_leave_checkbox = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, string>>({name:'emergency_leave_checkbox',type:"text"});
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  let code:string='';
  const [allCode,setAllCode]=useState<any>("");
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {new_access_group9bde0, setnew_access_group9bde0}= useContext(TotalContext) as TotalContextProps;  
  const {new_access_group9bde0Props, setnew_access_group9bde0Props}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactionse55b7, setdynamicactionse55b7}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactionse55b7Props, setdynamicactionse55b7Props}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__group23855, setaccess_req__group23855}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__group23855Props, setaccess_req__group23855Props}= useContext(TotalContext) as TotalContextProps;  
  const {leave_req_details94d2a, setleave_req_details94d2a}= useContext(TotalContext) as TotalContextProps;  
  const {leave_request_number9e857, setleave_request_number9e857}= useContext(TotalContext) as TotalContextProps;  
  const {full_namef5482, setfull_namef5482}= useContext(TotalContext) as TotalContextProps;  
  const {policy_nameca7f5, setpolicy_nameca7f5}= useContext(TotalContext) as TotalContextProps;  
  const {leave_reason_category26b76, setleave_reason_category26b76}= useContext(TotalContext) as TotalContextProps;  
  const {emergency_leave_checkboxaac78, setemergency_leave_checkboxaac78}= useContext(TotalContext) as TotalContextProps;  
  const {start_date22dc6, setstart_date22dc6}= useContext(TotalContext) as TotalContextProps;  
  const {end_dateb0819, setend_dateb0819}= useContext(TotalContext) as TotalContextProps;  
  const {days_requested84d0e, setdays_requested84d0e}= useContext(TotalContext) as TotalContextProps;  
  const {half_day_switchb71e0, sethalf_day_switchb71e0}= useContext(TotalContext) as TotalContextProps;  
  const {haf_day_session36e8a, sethaf_day_session36e8a}= useContext(TotalContext) as TotalContextProps;  
  const {emp_avail_group21476, setemp_avail_group21476}= useContext(TotalContext) as TotalContextProps;  
  const {emp_avail_group21476Props, setemp_avail_group21476Props}= useContext(TotalContext) as TotalContextProps;  
  const {leave_balance_group2b19a, setleave_balance_group2b19a}= useContext(TotalContext) as TotalContextProps;  
  const {leave_balance_group2b19aProps, setleave_balance_group2b19aProps}= useContext(TotalContext) as TotalContextProps;  
  const {app_det_groupe1335, setapp_det_groupe1335}= useContext(TotalContext) as TotalContextProps;  
  const {app_det_groupe1335Props, setapp_det_groupe1335Props}= useContext(TotalContext) as TotalContextProps;  
  const {approve_group1e00a, setapprove_group1e00a}= useContext(TotalContext) as TotalContextProps;  
  const {approve_group1e00aProps, setapprove_group1e00aProps}= useContext(TotalContext) as TotalContextProps;  
  const {audit_groupa0703, setaudit_groupa0703}= useContext(TotalContext) as TotalContextProps;  
  const {audit_groupa0703Props, setaudit_groupa0703Props}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "8b4e755807abc210c828a73248623855",
        "b0a09ffa4671466780c2b80cc3caac78"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code);
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[emergency_leave_checkboxaac78?.refresh])

  useEffect(()=>{
    if (access_req__group23855?.emergency_leave_checkbox === undefined) {
      setaccess_req__group23855((prev: any) => ({ ...prev, emergency_leave_checkbox: true }));
    }
  },[])


  const handleChange=async(checked:boolean)=>{
    try{
    setIsProcessing(true);
    setaccess_req__group23855((prev: any) => ({ ...prev, emergency_leave_checkbox: checked}));
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }
  
  const handleBlur=async(e:any)=>{
    try{
    setIsProcessing(true);
    code = allCode;
    if (code != '') {
      let codeStates: any = {};
            codeStates['new_access_group']  = new_access_group9bde0;
            codeStates['setnew_access_group'] = setnew_access_group9bde0;
            codeStates['dynamicactions']  = dynamicactionse55b7;
            codeStates['setdynamicactions'] = setdynamicactionse55b7;
            codeStates['access_req__group']  = access_req__group23855;
            codeStates['setaccess_req__group'] = setaccess_req__group23855;
            codeStates['emp_avail_group']  = emp_avail_group21476;
            codeStates['setemp_avail_group'] = setemp_avail_group21476;
            codeStates['leave_balance_group']  = leave_balance_group2b19a;
            codeStates['setleave_balance_group'] = setleave_balance_group2b19a;
            codeStates['app_det_group']  = app_det_groupe1335;
            codeStates['setapp_det_group'] = setapp_det_groupe1335;
            codeStates['approve_group']  = approve_group1e00a;
            codeStates['setapprove_group'] = setapprove_group1e00a;
            codeStates['audit_group']  = audit_groupa0703;
            codeStates['setaudit_group'] = setaudit_groupa0703;
    codeExecution(code,codeStates);
    }
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }

  if (emergency_leave_checkboxaac78?.isHidden) {
    return <></>;
  }
  return (
    <div 
       style={{gridColumn: `21 / 25`,gridRow: `13 / 19`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Checkbox 
      className=""
      value={access_req__group23855?.emergency_leave_checkbox||false}
      checked={access_req__group23855?.emergency_leave_checkbox||true}
      disabled= {emergency_leave_checkboxaac78?.isDisabled ? true : false}
      content = {'Emergency Leave'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    </div>
  )
}

export default Checkboxemergency_leave_checkbox;
