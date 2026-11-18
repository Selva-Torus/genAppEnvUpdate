

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


const DatePickerdue_date = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {info_groupcb42f, setinfo_groupcb42f}= useContext(TotalContext) as TotalContextProps  
  const {info_groupcb42fProps, setinfo_groupcb42fProps}= useContext(TotalContext) as TotalContextProps  
  const {group85ee1, setgroup85ee1}= useContext(TotalContext) as TotalContextProps  
  const {group85ee1Props, setgroup85ee1Props}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_groupa2b93, setrule_config_groupa2b93}= useContext(TotalContext) as TotalContextProps  
  const {rule_config_groupa2b93Props, setrule_config_groupa2b93Props}= useContext(TotalContext) as TotalContextProps  
  const {info_rule54cff, setinfo_rule54cff}= useContext(TotalContext) as TotalContextProps  
  const {due_date7d947, setdue_date7d947}= useContext(TotalContext) as TotalContextProps  
  const {closed_on4d979, setclosed_on4d979}= useContext(TotalContext) as TotalContextProps  
  const {is_active1ad4d, setis_active1ad4d}= useContext(TotalContext) as TotalContextProps  
  const {closure_comment3d878, setclosure_comment3d878}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsbe417, setdynamicactionsbe417}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactionsbe417Props, setdynamicactionsbe417Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addCertificationCondition_v1:{...pre?.addCertificationCondition_v1,due_date:undefined}}));
  if (!date) {
    setrule_config_groupa2b93((prev: any) => ({ ...prev, due_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setrule_config_groupa2b93((prev: any) => ({ ...prev, due_date: isoDate }))
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
        "64d64b79fce6405ba8fb78fb832a2b93",
        "d5b7f6934fbdc8eaf1828144f127d947"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['info_group'] = info_groupcb42f,
    codeStates['setinfo_group'] = setinfo_groupcb42f,
    codeStates['info_groupcb42f'] = info_groupcb42fProps,
    codeStates['setinfo_groupcb42f'] = setinfo_groupcb42fProps,
    codeStates['group'] = group85ee1,
    codeStates['setgroup'] = setgroup85ee1,
    codeStates['group85ee1'] = group85ee1Props,
    codeStates['setgroup85ee1'] = setgroup85ee1Props,
    codeStates['rule_config_group'] = rule_config_groupa2b93,
    codeStates['setrule_config_group'] = setrule_config_groupa2b93,
    codeStates['rule_config_groupa2b93'] = rule_config_groupa2b93Props,
    codeStates['setrule_config_groupa2b93'] = setrule_config_groupa2b93Props,
    codeStates['info_rule'] = info_rule54cff,
    codeStates['setinfo_rule'] = setinfo_rule54cff,
    codeStates['due_date'] = due_date7d947,
    codeStates['setdue_date'] = setdue_date7d947,
    codeStates['closed_on'] = closed_on4d979,
    codeStates['setclosed_on'] = setclosed_on4d979,
    codeStates['is_active'] = is_active1ad4d,
    codeStates['setis_active'] = setis_active1ad4d,
    codeStates['closure_comment'] = closure_comment3d878,
    codeStates['setclosure_comment'] = setclosure_comment3d878,
    codeStates['dynamicactions'] = dynamicactionsbe417,
    codeStates['setdynamicactions'] = setdynamicactionsbe417,
    codeStates['dynamicactionsbe417'] = dynamicactionsbe417Props,
    codeStates['setdynamicactionsbe417'] = setdynamicactionsbe417Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setrule_config_groupa2b93Props((pre:any)=>({...pre,validation:true}))
 },[due_date7d947?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (due_date7d947?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 13`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={rule_config_groupa2b93?.due_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {due_date7d947?.isDisabled ? true : false}
      disabled= {due_date7d947?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Due date"
      dateValidation=""
      validationState={validate?.addCertificationCondition_v1?.due_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdue_date
