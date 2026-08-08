

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { getCookie } from '@/app/components/cookieMgment';
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
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickersla_wait_start_time = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token:string = getCookie('token'); 
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
  const {add_case_group1f6e4, setadd_case_group1f6e4}= useContext(TotalContext) as TotalContextProps  
  const {add_case_group1f6e4Props, setadd_case_group1f6e4Props}= useContext(TotalContext) as TotalContextProps  
  const {header_group3749a, setheader_group3749a}= useContext(TotalContext) as TotalContextProps  
  const {header_group3749aProps, setheader_group3749aProps}= useContext(TotalContext) as TotalContextProps  
  const {case_information_groupcec29, setcase_information_groupcec29}= useContext(TotalContext) as TotalContextProps  
  const {case_information_groupcec29Props, setcase_information_groupcec29Props}= useContext(TotalContext) as TotalContextProps  
  const {case_info_textdf3f1, setcase_info_textdf3f1}= useContext(TotalContext) as TotalContextProps  
  const {creditor_name257be, setcreditor_name257be}= useContext(TotalContext) as TotalContextProps  
  const {attorney_name87be1, setattorney_name87be1}= useContext(TotalContext) as TotalContextProps  
  const {status_namea5f92, setstatus_namea5f92}= useContext(TotalContext) as TotalContextProps  
  const {priority_name449dd, setpriority_name449dd}= useContext(TotalContext) as TotalContextProps  
  const {queue_positionceb8d, setqueue_positionceb8d}= useContext(TotalContext) as TotalContextProps  
  const {quality_scoredfaa9, setquality_scoredfaa9}= useContext(TotalContext) as TotalContextProps  
  const {sla_wait_start_time20502, setsla_wait_start_time20502}= useContext(TotalContext) as TotalContextProps  
  const {venue_groupa72d9, setvenue_groupa72d9}= useContext(TotalContext) as TotalContextProps  
  const {venue_groupa72d9Props, setvenue_groupa72d9Props}= useContext(TotalContext) as TotalContextProps  
  const {georgia_groupa636c, setgeorgia_groupa636c}= useContext(TotalContext) as TotalContextProps  
  const {georgia_groupa636cProps, setgeorgia_groupa636cProps}= useContext(TotalContext) as TotalContextProps  
  const {georgias_groupbac01, setgeorgias_groupbac01}= useContext(TotalContext) as TotalContextProps  
  const {georgias_groupbac01Props, setgeorgias_groupbac01Props}= useContext(TotalContext) as TotalContextProps  
  const {georgias_groupsbf356, setgeorgias_groupsbf356}= useContext(TotalContext) as TotalContextProps  
  const {georgias_groupsbf356Props, setgeorgias_groupsbf356Props}= useContext(TotalContext) as TotalContextProps  
  const {georgiass_groups9e4dd, setgeorgiass_groups9e4dd}= useContext(TotalContext) as TotalContextProps  
  const {georgiass_groups9e4ddProps, setgeorgiass_groups9e4ddProps}= useContext(TotalContext) as TotalContextProps  
  const {georgsiass_groups6bf7a, setgeorgsiass_groups6bf7a}= useContext(TotalContext) as TotalContextProps  
  const {georgsiass_groups6bf7aProps, setgeorgsiass_groups6bf7aProps}= useContext(TotalContext) as TotalContextProps  
  const {debtor_information_groupdfa55, setdebtor_information_groupdfa55}= useContext(TotalContext) as TotalContextProps  
  const {debtor_information_groupdfa55Props, setdebtor_information_groupdfa55Props}= useContext(TotalContext) as TotalContextProps  
  const {financial_details_grouped0d9, setfinancial_details_grouped0d9}= useContext(TotalContext) as TotalContextProps  
  const {financial_details_grouped0d9Props, setfinancial_details_grouped0d9Props}= useContext(TotalContext) as TotalContextProps  
  const {venue_details_group6a27a, setvenue_details_group6a27a}= useContext(TotalContext) as TotalContextProps  
  const {venue_details_group6a27aProps, setvenue_details_group6a27aProps}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_main_group3eb5b, setrequired_dociument_main_group3eb5b}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_main_group3eb5bProps, setrequired_dociument_main_group3eb5bProps}= useContext(TotalContext) as TotalContextProps  
  const {doc_tablee79c7, setdoc_tablee79c7}= useContext(TotalContext) as TotalContextProps  
  const {doc_tablee79c7Props, setdoc_tablee79c7Props}= useContext(TotalContext) as TotalContextProps  
  const {checklist_main_group5b62e, setchecklist_main_group5b62e}= useContext(TotalContext) as TotalContextProps  
  const {checklist_main_group5b62eProps, setchecklist_main_group5b62eProps}= useContext(TotalContext) as TotalContextProps  
  const {checklist_table45abc, setchecklist_table45abc}= useContext(TotalContext) as TotalContextProps  
  const {checklist_table45abcProps, setchecklist_table45abcProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,viewCase_v1:{...pre?.viewCase_v1,sla_wait_start_time:undefined}}));
  if (!date) {
    setcase_information_groupcec29((prev: any) => ({ ...prev, sla_wait_start_time: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setcase_information_groupcec29((prev: any) => ({ ...prev, sla_wait_start_time: isoDate }))
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
        "19e9edfb1e7ccf7985bc9825117cec29",
        "8e4203dfeadf83a81eda34016be20502"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['add_case_group'] = add_case_group1f6e4,
    codeStates['setadd_case_group'] = setadd_case_group1f6e4,
    codeStates['add_case_group1f6e4'] = add_case_group1f6e4Props,
    codeStates['setadd_case_group1f6e4'] = setadd_case_group1f6e4Props,
    codeStates['header_group'] = header_group3749a,
    codeStates['setheader_group'] = setheader_group3749a,
    codeStates['header_group3749a'] = header_group3749aProps,
    codeStates['setheader_group3749a'] = setheader_group3749aProps,
    codeStates['case_information_group'] = case_information_groupcec29,
    codeStates['setcase_information_group'] = setcase_information_groupcec29,
    codeStates['case_information_groupcec29'] = case_information_groupcec29Props,
    codeStates['setcase_information_groupcec29'] = setcase_information_groupcec29Props,
    codeStates['case_info_text'] = case_info_textdf3f1,
    codeStates['setcase_info_text'] = setcase_info_textdf3f1,
    codeStates['creditor_name'] = creditor_name257be,
    codeStates['setcreditor_name'] = setcreditor_name257be,
    codeStates['attorney_name'] = attorney_name87be1,
    codeStates['setattorney_name'] = setattorney_name87be1,
    codeStates['status_name'] = status_namea5f92,
    codeStates['setstatus_name'] = setstatus_namea5f92,
    codeStates['priority_name'] = priority_name449dd,
    codeStates['setpriority_name'] = setpriority_name449dd,
    codeStates['queue_position'] = queue_positionceb8d,
    codeStates['setqueue_position'] = setqueue_positionceb8d,
    codeStates['quality_score'] = quality_scoredfaa9,
    codeStates['setquality_score'] = setquality_scoredfaa9,
    codeStates['sla_wait_start_time'] = sla_wait_start_time20502,
    codeStates['setsla_wait_start_time'] = setsla_wait_start_time20502,
    codeStates['venue_group'] = venue_groupa72d9,
    codeStates['setvenue_group'] = setvenue_groupa72d9,
    codeStates['venue_groupa72d9'] = venue_groupa72d9Props,
    codeStates['setvenue_groupa72d9'] = setvenue_groupa72d9Props,
    codeStates['georgia_group'] = georgia_groupa636c,
    codeStates['setgeorgia_group'] = setgeorgia_groupa636c,
    codeStates['georgia_groupa636c'] = georgia_groupa636cProps,
    codeStates['setgeorgia_groupa636c'] = setgeorgia_groupa636cProps,
    codeStates['georgias_group'] = georgias_groupbac01,
    codeStates['setgeorgias_group'] = setgeorgias_groupbac01,
    codeStates['georgias_groupbac01'] = georgias_groupbac01Props,
    codeStates['setgeorgias_groupbac01'] = setgeorgias_groupbac01Props,
    codeStates['georgias_groups'] = georgias_groupsbf356,
    codeStates['setgeorgias_groups'] = setgeorgias_groupsbf356,
    codeStates['georgias_groupsbf356'] = georgias_groupsbf356Props,
    codeStates['setgeorgias_groupsbf356'] = setgeorgias_groupsbf356Props,
    codeStates['georgiass_groups'] = georgiass_groups9e4dd,
    codeStates['setgeorgiass_groups'] = setgeorgiass_groups9e4dd,
    codeStates['georgiass_groups9e4dd'] = georgiass_groups9e4ddProps,
    codeStates['setgeorgiass_groups9e4dd'] = setgeorgiass_groups9e4ddProps,
    codeStates['georgsiass_groups'] = georgsiass_groups6bf7a,
    codeStates['setgeorgsiass_groups'] = setgeorgsiass_groups6bf7a,
    codeStates['georgsiass_groups6bf7a'] = georgsiass_groups6bf7aProps,
    codeStates['setgeorgsiass_groups6bf7a'] = setgeorgsiass_groups6bf7aProps,
    codeStates['debtor_information_group'] = debtor_information_groupdfa55,
    codeStates['setdebtor_information_group'] = setdebtor_information_groupdfa55,
    codeStates['debtor_information_groupdfa55'] = debtor_information_groupdfa55Props,
    codeStates['setdebtor_information_groupdfa55'] = setdebtor_information_groupdfa55Props,
    codeStates['financial_details_group'] = financial_details_grouped0d9,
    codeStates['setfinancial_details_group'] = setfinancial_details_grouped0d9,
    codeStates['financial_details_grouped0d9'] = financial_details_grouped0d9Props,
    codeStates['setfinancial_details_grouped0d9'] = setfinancial_details_grouped0d9Props,
    codeStates['venue_details_group'] = venue_details_group6a27a,
    codeStates['setvenue_details_group'] = setvenue_details_group6a27a,
    codeStates['venue_details_group6a27a'] = venue_details_group6a27aProps,
    codeStates['setvenue_details_group6a27a'] = setvenue_details_group6a27aProps,
    codeStates['required_dociument_main_group'] = required_dociument_main_group3eb5b,
    codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group3eb5b,
    codeStates['required_dociument_main_group3eb5b'] = required_dociument_main_group3eb5bProps,
    codeStates['setrequired_dociument_main_group3eb5b'] = setrequired_dociument_main_group3eb5bProps,
    codeStates['doc_table'] = doc_tablee79c7,
    codeStates['setdoc_table'] = setdoc_tablee79c7,
    codeStates['doc_tablee79c7'] = doc_tablee79c7Props,
    codeStates['setdoc_tablee79c7'] = setdoc_tablee79c7Props,
    codeStates['checklist_main_group'] = checklist_main_group5b62e,
    codeStates['setchecklist_main_group'] = setchecklist_main_group5b62e,
    codeStates['checklist_main_group5b62e'] = checklist_main_group5b62eProps,
    codeStates['setchecklist_main_group5b62e'] = setchecklist_main_group5b62eProps,
    codeStates['checklist_table'] = checklist_table45abc,
    codeStates['setchecklist_table'] = setchecklist_table45abc,
    codeStates['checklist_table45abc'] = checklist_table45abcProps,
    codeStates['setchecklist_table45abc'] = setchecklist_table45abcProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setcase_information_groupcec29Props((pre:any)=>({...pre,validation:true}))
 },[sla_wait_start_time20502?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (sla_wait_start_time20502?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 13`,gridRow: `52 / 64`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={case_information_groupcec29?.sla_wait_start_time}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly={true}
      disabled= {sla_wait_start_time20502?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="SLA Start Time"
      dateValidation=""
      validationState={validate?.viewCase_v1?.sla_wait_start_time ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickersla_wait_start_time
