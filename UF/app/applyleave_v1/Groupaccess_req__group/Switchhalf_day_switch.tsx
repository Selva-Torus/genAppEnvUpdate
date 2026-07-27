
'use client'
import React, { useState, useContext, useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'
import { Switch } from '@/components/Switch'
import { Text } from '@/components/Text'
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { eventBus } from '@/app/eventBus';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import {Modal} from '@/components/Modal';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Switchhalf_day_switch = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [allCode,setAllCode] = useState<string>("");
  const [ruleCode,setRuleCode] = useState<any>("");
  const toast : Function = useInfoMsg();
  const routes : AppRouterInstance = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const prevRefreshRef = useRef<any>(false);
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
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "8b4e755807abc210c828a73248623855",
      "0778c687ecf5420c80322e288beb71e0"
    );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code)
      setRuleCode(orchestrationData?.data?.rule)
    }catch(err)
    {
      console.log(err)
    }
  }

  useEffect(() => {
    if(prevRefreshRef.current)
      setaccess_req__group23855((pre:any)=>({...pre,half_day_switch:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[half_day_switchb71e0?.refresh])

  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setaccess_req__group23855((prev: any) => ({ ...prev, half_day_switch: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group9bde0,
        codeStates['setnew_access_group'] = setnew_access_group9bde0,
        codeStates['new_access_group9bde0'] = new_access_group9bde0Props,
        codeStates['setnew_access_group9bde0'] = setnew_access_group9bde0Props,
        codeStates['dynamicactions'] = dynamicactionse55b7,
        codeStates['setdynamicactions'] = setdynamicactionse55b7,
        codeStates['dynamicactionse55b7'] = dynamicactionse55b7Props,
        codeStates['setdynamicactionse55b7'] = setdynamicactionse55b7Props,
        codeStates['access_req__group'] = access_req__group23855,
        codeStates['setaccess_req__group'] = setaccess_req__group23855,
        codeStates['access_req__group23855'] = access_req__group23855Props,
        codeStates['setaccess_req__group23855'] = setaccess_req__group23855Props,
        codeStates['leave_req_details'] = leave_req_details94d2a,
        codeStates['setleave_req_details'] = setleave_req_details94d2a,
        codeStates['leave_request_number'] = leave_request_number9e857,
        codeStates['setleave_request_number'] = setleave_request_number9e857,
        codeStates['full_name'] = full_namef5482,
        codeStates['setfull_name'] = setfull_namef5482,
        codeStates['policy_name'] = policy_nameca7f5,
        codeStates['setpolicy_name'] = setpolicy_nameca7f5,
        codeStates['leave_reason_category'] = leave_reason_category26b76,
        codeStates['setleave_reason_category'] = setleave_reason_category26b76,
        codeStates['emergency_leave_checkbox'] = emergency_leave_checkboxaac78,
        codeStates['setemergency_leave_checkbox'] = setemergency_leave_checkboxaac78,
        codeStates['start_date'] = start_date22dc6,
        codeStates['setstart_date'] = setstart_date22dc6,
        codeStates['end_date'] = end_dateb0819,
        codeStates['setend_date'] = setend_dateb0819,
        codeStates['days_requested'] = days_requested84d0e,
        codeStates['setdays_requested'] = setdays_requested84d0e,
        codeStates['half_day_switch'] = half_day_switchb71e0,
        codeStates['sethalf_day_switch'] = sethalf_day_switchb71e0,
        codeStates['haf_day_session'] = haf_day_session36e8a,
        codeStates['sethaf_day_session'] = sethaf_day_session36e8a,
        codeStates['emp_avail_group'] = emp_avail_group21476,
        codeStates['setemp_avail_group'] = setemp_avail_group21476,
        codeStates['emp_avail_group21476'] = emp_avail_group21476Props,
        codeStates['setemp_avail_group21476'] = setemp_avail_group21476Props,
        codeStates['leave_balance_group'] = leave_balance_group2b19a,
        codeStates['setleave_balance_group'] = setleave_balance_group2b19a,
        codeStates['leave_balance_group2b19a'] = leave_balance_group2b19aProps,
        codeStates['setleave_balance_group2b19a'] = setleave_balance_group2b19aProps,
        codeStates['app_det_group'] = app_det_groupe1335,
        codeStates['setapp_det_group'] = setapp_det_groupe1335,
        codeStates['app_det_groupe1335'] = app_det_groupe1335Props,
        codeStates['setapp_det_groupe1335'] = setapp_det_groupe1335Props,
        codeStates['approve_group'] = approve_group1e00a,
        codeStates['setapprove_group'] = setapprove_group1e00a,
        codeStates['approve_group1e00a'] = approve_group1e00aProps,
        codeStates['setapprove_group1e00a'] = setapprove_group1e00aProps,
        codeStates['audit_group'] = audit_groupa0703,
        codeStates['setaudit_group'] = setaudit_groupa0703,
        codeStates['audit_groupa0703'] = audit_groupa0703Props,
        codeStates['setaudit_groupa0703'] = setaudit_groupa0703Props,
    codeExecution(code,codeStates)
    }
    let presentRule:any=ruleCode?.nodes || comingRule
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

  if (half_day_switchb71e0?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `16 / 19`,gridRow: `20 / 31`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"center"}
        headerText="Half Day"
        headerPosition="top"
        disabled= {half_day_switchb71e0?.isDisabled ? true : false}
        content=" "
        checked={access_req__group23855?.half_day_switch || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchhalf_day_switch



