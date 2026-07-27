

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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, string>>({name:'emergency_leave',type:"text"});
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  let code:string='';
  const [allCode,setAllCode]=useState<any>("");
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {new_access_groupc501f, setnew_access_groupc501f}= useContext(TotalContext) as TotalContextProps;  
  const {new_access_groupc501fProps, setnew_access_groupc501fProps}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__group7ac49, setaccess_req__group7ac49}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__group7ac49Props, setaccess_req__group7ac49Props}= useContext(TotalContext) as TotalContextProps;  
  const {leave_req_details0272a, setleave_req_details0272a}= useContext(TotalContext) as TotalContextProps;  
  const {leave_request_number77855, setleave_request_number77855}= useContext(TotalContext) as TotalContextProps;  
  const {full_name9076a, setfull_name9076a}= useContext(TotalContext) as TotalContextProps;  
  const {policy_nameab68b, setpolicy_nameab68b}= useContext(TotalContext) as TotalContextProps;  
  const {leave_reason_category1f94d, setleave_reason_category1f94d}= useContext(TotalContext) as TotalContextProps;  
  const {emergency_leave_checkbox8efe9, setemergency_leave_checkbox8efe9}= useContext(TotalContext) as TotalContextProps;  
  const {start_date34ff8, setstart_date34ff8}= useContext(TotalContext) as TotalContextProps;  
  const {end_date35399, setend_date35399}= useContext(TotalContext) as TotalContextProps;  
  const {days_requested70ed8, setdays_requested70ed8}= useContext(TotalContext) as TotalContextProps;  
  const {half_day_switch3bf69, sethalf_day_switch3bf69}= useContext(TotalContext) as TotalContextProps;  
  const {half_day_sessioneee3c, sethalf_day_sessioneee3c}= useContext(TotalContext) as TotalContextProps;  
  const {emp_avail_group11178, setemp_avail_group11178}= useContext(TotalContext) as TotalContextProps;  
  const {emp_avail_group11178Props, setemp_avail_group11178Props}= useContext(TotalContext) as TotalContextProps;  
  const {leave_balance_group98e23, setleave_balance_group98e23}= useContext(TotalContext) as TotalContextProps;  
  const {leave_balance_group98e23Props, setleave_balance_group98e23Props}= useContext(TotalContext) as TotalContextProps;  
  const {app_det_groupe2c1b, setapp_det_groupe2c1b}= useContext(TotalContext) as TotalContextProps;  
  const {app_det_groupe2c1bProps, setapp_det_groupe2c1bProps}= useContext(TotalContext) as TotalContextProps;  
  const {approve_group4086e, setapprove_group4086e}= useContext(TotalContext) as TotalContextProps;  
  const {approve_group4086eProps, setapprove_group4086eProps}= useContext(TotalContext) as TotalContextProps;  
  const {audit_group087fd, setaudit_group087fd}= useContext(TotalContext) as TotalContextProps;  
  const {audit_group087fdProps, setaudit_group087fdProps}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactionsafd15, setdynamicactionsafd15}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactionsafd15Props, setdynamicactionsafd15Props}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "e968590033094bbfaf1b81b7bf27ac49",
        "49659f1049ebcb42905c228a0468efe9"
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
  },[emergency_leave_checkbox8efe9?.refresh])

  useEffect(()=>{
    if (access_req__group7ac49?.emergency_leave === undefined) {
      setaccess_req__group7ac49((prev: any) => ({ ...prev, emergency_leave: false }));
    }
  },[])


  const handleChange=async(checked:boolean)=>{
    try{
    setIsProcessing(true);
    setaccess_req__group7ac49((prev: any) => ({ ...prev, emergency_leave: checked}));
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
            codeStates['new_access_group']  = new_access_groupc501f;
            codeStates['setnew_access_group'] = setnew_access_groupc501f;
            codeStates['access_req__group']  = access_req__group7ac49;
            codeStates['setaccess_req__group'] = setaccess_req__group7ac49;
            codeStates['emp_avail_group']  = emp_avail_group11178;
            codeStates['setemp_avail_group'] = setemp_avail_group11178;
            codeStates['leave_balance_group']  = leave_balance_group98e23;
            codeStates['setleave_balance_group'] = setleave_balance_group98e23;
            codeStates['app_det_group']  = app_det_groupe2c1b;
            codeStates['setapp_det_group'] = setapp_det_groupe2c1b;
            codeStates['approve_group']  = approve_group4086e;
            codeStates['setapprove_group'] = setapprove_group4086e;
            codeStates['audit_group']  = audit_group087fd;
            codeStates['setaudit_group'] = setaudit_group087fd;
            codeStates['dynamicactions']  = dynamicactionsafd15;
            codeStates['setdynamicactions'] = setdynamicactionsafd15;
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

  if (emergency_leave_checkbox8efe9?.isHidden) {
    return <></>;
  }
  return (
    <div 
       style={{gridColumn: `21 / 25`,gridRow: `12 / 19`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Checkbox 
      className=""
      value={access_req__group7ac49?.emergency_leave||false}
      checked={access_req__group7ac49?.emergency_leave||false}
      disabled= {emergency_leave_checkbox8efe9?.isDisabled ? true : false}
      content = {'Emergency Leave'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    </div>
  )
}

export default Checkboxemergency_leave_checkbox;
