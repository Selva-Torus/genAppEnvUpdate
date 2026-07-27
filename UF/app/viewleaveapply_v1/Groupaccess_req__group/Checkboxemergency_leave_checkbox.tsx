

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
  const {new_access_group8a441, setnew_access_group8a441}= useContext(TotalContext) as TotalContextProps;  
  const {new_access_group8a441Props, setnew_access_group8a441Props}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__group578e5, setaccess_req__group578e5}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__group578e5Props, setaccess_req__group578e5Props}= useContext(TotalContext) as TotalContextProps;  
  const {leave_req_detailsf2bd7, setleave_req_detailsf2bd7}= useContext(TotalContext) as TotalContextProps;  
  const {leave_request_numberb0948, setleave_request_numberb0948}= useContext(TotalContext) as TotalContextProps;  
  const {full_namedebbe, setfull_namedebbe}= useContext(TotalContext) as TotalContextProps;  
  const {policy_name67103, setpolicy_name67103}= useContext(TotalContext) as TotalContextProps;  
  const {leave_reason_categorya15ad, setleave_reason_categorya15ad}= useContext(TotalContext) as TotalContextProps;  
  const {emergency_leave_checkbox63f2e, setemergency_leave_checkbox63f2e}= useContext(TotalContext) as TotalContextProps;  
  const {start_date8bb1a, setstart_date8bb1a}= useContext(TotalContext) as TotalContextProps;  
  const {end_datea8b1a, setend_datea8b1a}= useContext(TotalContext) as TotalContextProps;  
  const {days_requested4683c, setdays_requested4683c}= useContext(TotalContext) as TotalContextProps;  
  const {half_day_switch96651, sethalf_day_switch96651}= useContext(TotalContext) as TotalContextProps;  
  const {haf_day_session61b96, sethaf_day_session61b96}= useContext(TotalContext) as TotalContextProps;  
  const {emp_avail_groupeb48f, setemp_avail_groupeb48f}= useContext(TotalContext) as TotalContextProps;  
  const {emp_avail_groupeb48fProps, setemp_avail_groupeb48fProps}= useContext(TotalContext) as TotalContextProps;  
  const {leave_balance_group98af0, setleave_balance_group98af0}= useContext(TotalContext) as TotalContextProps;  
  const {leave_balance_group98af0Props, setleave_balance_group98af0Props}= useContext(TotalContext) as TotalContextProps;  
  const {app_det_group5b97e, setapp_det_group5b97e}= useContext(TotalContext) as TotalContextProps;  
  const {app_det_group5b97eProps, setapp_det_group5b97eProps}= useContext(TotalContext) as TotalContextProps;  
  const {approve_group4d845, setapprove_group4d845}= useContext(TotalContext) as TotalContextProps;  
  const {approve_group4d845Props, setapprove_group4d845Props}= useContext(TotalContext) as TotalContextProps;  
  const {audit_group2b7ff, setaudit_group2b7ff}= useContext(TotalContext) as TotalContextProps;  
  const {audit_group2b7ffProps, setaudit_group2b7ffProps}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "1adc3ad97f24278a74ffd028cc8578e5",
        "e04935a2c9e9011b6eb4b83b30863f2e"
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
  },[emergency_leave_checkbox63f2e?.refresh])

  useEffect(()=>{
    if (access_req__group578e5?.emergency_leave === undefined) {
      setaccess_req__group578e5((prev: any) => ({ ...prev, emergency_leave: true }));
    }
  },[])


  const handleChange=async(checked:boolean)=>{
    try{
    setIsProcessing(true);
    setaccess_req__group578e5((prev: any) => ({ ...prev, emergency_leave: checked}));
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
            codeStates['new_access_group']  = new_access_group8a441;
            codeStates['setnew_access_group'] = setnew_access_group8a441;
            codeStates['access_req__group']  = access_req__group578e5;
            codeStates['setaccess_req__group'] = setaccess_req__group578e5;
            codeStates['emp_avail_group']  = emp_avail_groupeb48f;
            codeStates['setemp_avail_group'] = setemp_avail_groupeb48f;
            codeStates['leave_balance_group']  = leave_balance_group98af0;
            codeStates['setleave_balance_group'] = setleave_balance_group98af0;
            codeStates['app_det_group']  = app_det_group5b97e;
            codeStates['setapp_det_group'] = setapp_det_group5b97e;
            codeStates['approve_group']  = approve_group4d845;
            codeStates['setapprove_group'] = setapprove_group4d845;
            codeStates['audit_group']  = audit_group2b7ff;
            codeStates['setaudit_group'] = setaudit_group2b7ff;
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

  if (emergency_leave_checkbox63f2e?.isHidden) {
    return <></>;
  }
  return (
    <div 
       style={{gridColumn: `21 / 25`,gridRow: `13 / 19`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Checkbox 
      className=""
      value={access_req__group578e5?.emergency_leave||false}
      checked={access_req__group578e5?.emergency_leave||true}
      disabled= {emergency_leave_checkbox63f2e?.isDisabled ? true : false}
      content = {'Emergency Leave'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    </div>
  )
}

export default Checkboxemergency_leave_checkbox;
