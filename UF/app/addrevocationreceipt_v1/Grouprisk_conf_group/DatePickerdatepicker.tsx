

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { useGlobal } from '@/context/GlobalContext'
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { DatePicker } from '@/components/DatePicker';
import { Text } from '@/components/Text';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickerdatepicker = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const [isRequiredData,setIsRequiredData]=useState<boolean>(false)
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
 
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  //showComponentAsPopup || showArtifactAsModal
    
  /////////////
   //another screen
  const {overall_group4dbd5, setoverall_group4dbd5}= useContext(TotalContext) as TotalContextProps  
  const {overall_group4dbd5Props, setoverall_group4dbd5Props}= useContext(TotalContext) as TotalContextProps  
  const {action_details_group8c83a, setaction_details_group8c83a}= useContext(TotalContext) as TotalContextProps  
  const {action_details_group8c83aProps, setaction_details_group8c83aProps}= useContext(TotalContext) as TotalContextProps  
  const {action_detail_group71892, setaction_detail_group71892}= useContext(TotalContext) as TotalContextProps  
  const {action_detail_group71892Props, setaction_detail_group71892Props}= useContext(TotalContext) as TotalContextProps  
  const {risk_conf_groupe5642, setrisk_conf_groupe5642}= useContext(TotalContext) as TotalContextProps  
  const {risk_conf_groupe5642Props, setrisk_conf_groupe5642Props}= useContext(TotalContext) as TotalContextProps  
  const {lifecycle_textbd096, setlifecycle_textbd096}= useContext(TotalContext) as TotalContextProps  
  const {datepickerf70e5, setdatepickerf70e5}= useContext(TotalContext) as TotalContextProps  
  const {ack_status0e020, setack_status0e020}= useContext(TotalContext) as TotalContextProps  
  const {detailefde3, setdetailefde3}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsc7861, setdynamicactionsc7861}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsc7861Props, setdynamicactionsc7861Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addRevocationReceipt_v1:{...pre?.addRevocationReceipt_v1,datepicker:undefined}}));
  if (!date) {
    setrisk_conf_groupe5642((prev: any) => ({ ...prev, datepicker: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setrisk_conf_groupe5642((prev: any) => ({ ...prev, datepicker: isoDate }))
  }catch (err: any) {
    //setIsProcessing(false);
    if(typeof err == 'string')
      toast(err, 'danger');
    else
      toast(err?.response?.data?.errorDetails?.message, 'danger');
  }finally{
    //setIsProcessing(false);
  }
}



const handleBlur=async () => {
    //validation
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "48fde300650b0ffaf9ee4f1bb1ce5642",
        "8a9093028cf7454fa50c05bfe88f70e5"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['overall_group'] = overall_group4dbd5,
    codeStates['setoverall_group'] = setoverall_group4dbd5,
    codeStates['overall_group4dbd5'] = overall_group4dbd5Props,
    codeStates['setoverall_group4dbd5'] = setoverall_group4dbd5Props,
    codeStates['action_details_group'] = action_details_group8c83a,
    codeStates['setaction_details_group'] = setaction_details_group8c83a,
    codeStates['action_details_group8c83a'] = action_details_group8c83aProps,
    codeStates['setaction_details_group8c83a'] = setaction_details_group8c83aProps,
    codeStates['action_detail_group'] = action_detail_group71892,
    codeStates['setaction_detail_group'] = setaction_detail_group71892,
    codeStates['action_detail_group71892'] = action_detail_group71892Props,
    codeStates['setaction_detail_group71892'] = setaction_detail_group71892Props,
    codeStates['risk_conf_group'] = risk_conf_groupe5642,
    codeStates['setrisk_conf_group'] = setrisk_conf_groupe5642,
    codeStates['risk_conf_groupe5642'] = risk_conf_groupe5642Props,
    codeStates['setrisk_conf_groupe5642'] = setrisk_conf_groupe5642Props,
    codeStates['lifecycle_text'] = lifecycle_textbd096,
    codeStates['setlifecycle_text'] = setlifecycle_textbd096,
    codeStates['datepicker'] = datepickerf70e5,
    codeStates['setdatepicker'] = setdatepickerf70e5,
    codeStates['ack_status'] = ack_status0e020,
    codeStates['setack_status'] = setack_status0e020,
    codeStates['detail'] = detailefde3,
    codeStates['setdetail'] = setdetailefde3,
    codeStates['dynamicactions'] = dynamicactionsc7861,
    codeStates['setdynamicactions'] = setdynamicactionsc7861,
    codeStates['dynamicactionsc7861'] = dynamicactionsc7861Props,
    codeStates['setdynamicactionsc7861'] = setdynamicactionsc7861Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
    if(!risk_conf_groupe5642?.datepicker)
    {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const IST_OFFSET = 5.5 * 60 * 60 * 1000;
      const indiaToday = new Date(today.getTime() + IST_OFFSET);
      setrisk_conf_groupe5642((pre:any)=>({...pre,datepicker:indiaToday.toISOString()}))
    }
  setrisk_conf_groupe5642Props((pre:any)=>({...pre,validation:true}))
 },[datepickerf70e5?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (datepickerf70e5?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 13`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={risk_conf_groupe5642?.datepicker}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {datepickerf70e5?.isDisabled ? true : false}
      disabled= {datepickerf70e5?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Acknowledged At"
      dateValidation=""
      validationState={validate?.addRevocationReceipt_v1?.datepicker ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdatepicker
