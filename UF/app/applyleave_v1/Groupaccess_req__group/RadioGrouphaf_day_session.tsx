'use client'
import React, { useState,useContext,useEffect,useRef } from 'react';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/Modal';
import { Text } from '@/components/Text';
import { RadioGroup } from '@/components/RadioGroup';
import { AxiosService } from "@/app/components/axiosService";
import { getCookie } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { eventBus } from '@/app/eventBus';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import i18n from '@/app/components/i18n';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import * as v from 'valibot';

const RadioGrouphaf_day_session = ({encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token: string = getCookie('token');
  const decodedTokenObj:any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { validate, setValidate } = useContext(TotalContext) as TotalContextProps;
  const { validateRefetch, setValidateRefetch } = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const prevRefreshRef = useRef(false);
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const keyset:any=i18n.keyset("language");
  const [error, setError] = useState<string>('')
  const [isRequredData, setIsRequredData]=useState<boolean>(false)
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
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
  const options: any[] = [
      {value: 'FN' ,content:'FN'},
      {value: 'AN' ,content:'AN'},
  ];
  const defaultValue = "";

  let optionsValue:any=options.map(item=>item.content);   
  //validation
  let schemaArray = [] ;
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(
      controlData,
      "8b4e755807abc210c828a73248623855",
      "e0e5e36974b84e61a0595ee96a436e8a"
    );
     if(orchestrationData?.data?.error == true){
      return;
    }
    setAllCode( orchestrationData?.data?.code);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    handleMapperValue();
    if(access_req__group23855?.haf_day_session == undefined || access_req__group23855?.haf_day_session == ""){
    setaccess_req__group23855((pre:any)=>({...pre,haf_day_session: defaultValue}));
    }
  },[haf_day_session36e8a?.refresh])
    const selected=useRef({})
  useEffect(()=>{
    handleBlur()
},[validateRefetch.value])
  const handleBlur = async () => {
    //validation
  }
  const handleChange= async(e:any)=>{
    try{
    setIsProcessing(true);
    if (e !== '') {
    setaccess_req__group23855((prev: any) => ({ ...prev, haf_day_session: e }));
      } else {
      setaccess_req__group23855((prev: any) => ({ ...prev, haf_day_session: ''}))
      setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,applyLeave_v1:{...pre?.applyLeave_v1,haf_day_session:undefined}}));
    selected.current=String(e)
    let code = allCode;
    if (code == "") {
      //toast(code?.data?.errorDetails?.message, 'danger')
      //return
    }  else if (code != '') {
      let codeStates: any = {}
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
        codeStates['selected']  = selected
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


 
  if (haf_day_session36e8a?.isHidden) {
    return <></>
  }
  
return (
  <div 
    style={{gridColumn: `19 / 25`,gridRow: `20 / 33`, gap:``, height: `100%`, overflow: 'auto'}} >
      <RadioGroup
        className=""
        value={access_req__group23855?.haf_day_session || ""} 
        disabled= {haf_day_session36e8a?.isDisabled ? true : false}
        direction="horizontal"
        items={options}
        onChange={handleChange}
        contentAlign={"center"}
        headerPosition='top'
        headerText="Half Day session"
      />
  </div>
  )
}

export default RadioGrouphaf_day_session
