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

const RadioGrouphalf_day_session = ({encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const options: any[] = [
      {value: '' ,content:''},
      {value: '' ,content:''},
  ];
  const defaultValue = "";

  let optionsValue:any=options.map(item=>item.content);   
  //validation
  let schemaArray = [] ;
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(
      controlData,
      "e968590033094bbfaf1b81b7bf27ac49",
      "7872915f6bec47a9aa362e31b8ceee3c"
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
    if(access_req__group7ac49?.half_day_session == undefined || access_req__group7ac49?.half_day_session == ""){
    setaccess_req__group7ac49((pre:any)=>({...pre,half_day_session: defaultValue}));
    }
  },[half_day_sessioneee3c?.refresh])
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
    setaccess_req__group7ac49((prev: any) => ({ ...prev, half_day_session: e }));
      } else {
      setaccess_req__group7ac49((prev: any) => ({ ...prev, half_day_session: ''}))
      setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,applyLeaveApproval_v1:{...pre?.applyLeaveApproval_v1,half_day_session:undefined}}));
    selected.current=String(e)
    let code = allCode;
    if (code == "") {
      //toast(code?.data?.errorDetails?.message, 'danger')
      //return
    }  else if (code != '') {
      let codeStates: any = {}
        codeStates['new_access_group'] = new_access_groupc501f,
        codeStates['setnew_access_group'] = setnew_access_groupc501f,
        codeStates['new_access_groupc501f'] = new_access_groupc501fProps,
        codeStates['setnew_access_groupc501f'] = setnew_access_groupc501fProps,
        codeStates['access_req__group'] = access_req__group7ac49,
        codeStates['setaccess_req__group'] = setaccess_req__group7ac49,
        codeStates['access_req__group7ac49'] = access_req__group7ac49Props,
        codeStates['setaccess_req__group7ac49'] = setaccess_req__group7ac49Props,
        codeStates['leave_req_details'] = leave_req_details0272a,
        codeStates['setleave_req_details'] = setleave_req_details0272a,
        codeStates['leave_request_number'] = leave_request_number77855,
        codeStates['setleave_request_number'] = setleave_request_number77855,
        codeStates['full_name'] = full_name9076a,
        codeStates['setfull_name'] = setfull_name9076a,
        codeStates['policy_name'] = policy_nameab68b,
        codeStates['setpolicy_name'] = setpolicy_nameab68b,
        codeStates['leave_reason_category'] = leave_reason_category1f94d,
        codeStates['setleave_reason_category'] = setleave_reason_category1f94d,
        codeStates['emergency_leave_checkbox'] = emergency_leave_checkbox8efe9,
        codeStates['setemergency_leave_checkbox'] = setemergency_leave_checkbox8efe9,
        codeStates['start_date'] = start_date34ff8,
        codeStates['setstart_date'] = setstart_date34ff8,
        codeStates['end_date'] = end_date35399,
        codeStates['setend_date'] = setend_date35399,
        codeStates['days_requested'] = days_requested70ed8,
        codeStates['setdays_requested'] = setdays_requested70ed8,
        codeStates['half_day_switch'] = half_day_switch3bf69,
        codeStates['sethalf_day_switch'] = sethalf_day_switch3bf69,
        codeStates['half_day_session'] = half_day_sessioneee3c,
        codeStates['sethalf_day_session'] = sethalf_day_sessioneee3c,
        codeStates['emp_avail_group'] = emp_avail_group11178,
        codeStates['setemp_avail_group'] = setemp_avail_group11178,
        codeStates['emp_avail_group11178'] = emp_avail_group11178Props,
        codeStates['setemp_avail_group11178'] = setemp_avail_group11178Props,
        codeStates['leave_balance_group'] = leave_balance_group98e23,
        codeStates['setleave_balance_group'] = setleave_balance_group98e23,
        codeStates['leave_balance_group98e23'] = leave_balance_group98e23Props,
        codeStates['setleave_balance_group98e23'] = setleave_balance_group98e23Props,
        codeStates['app_det_group'] = app_det_groupe2c1b,
        codeStates['setapp_det_group'] = setapp_det_groupe2c1b,
        codeStates['app_det_groupe2c1b'] = app_det_groupe2c1bProps,
        codeStates['setapp_det_groupe2c1b'] = setapp_det_groupe2c1bProps,
        codeStates['approve_group'] = approve_group4086e,
        codeStates['setapprove_group'] = setapprove_group4086e,
        codeStates['approve_group4086e'] = approve_group4086eProps,
        codeStates['setapprove_group4086e'] = setapprove_group4086eProps,
        codeStates['audit_group'] = audit_group087fd,
        codeStates['setaudit_group'] = setaudit_group087fd,
        codeStates['audit_group087fd'] = audit_group087fdProps,
        codeStates['setaudit_group087fd'] = setaudit_group087fdProps,
        codeStates['dynamicactions'] = dynamicactionsafd15,
        codeStates['setdynamicactions'] = setdynamicactionsafd15,
        codeStates['dynamicactionsafd15'] = dynamicactionsafd15Props,
        codeStates['setdynamicactionsafd15'] = setdynamicactionsafd15Props,
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


 
  if (half_day_sessioneee3c?.isHidden) {
    return <></>
  }
  
return (
  <div 
    style={{gridColumn: `19 / 25`,gridRow: `20 / 33`, gap:``, height: `100%`, overflow: 'auto'}} >
      <RadioGroup
        className=""
        value={access_req__group7ac49?.half_day_session || ""} 
        disabled= {half_day_sessioneee3c?.isDisabled ? true : false}
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

export default RadioGrouphalf_day_session
