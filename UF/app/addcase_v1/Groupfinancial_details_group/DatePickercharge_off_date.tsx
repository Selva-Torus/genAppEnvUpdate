

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


const DatePickercharge_off_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {add_case_groupeb161, setadd_case_groupeb161}= useContext(TotalContext) as TotalContextProps  
  const {add_case_groupeb161Props, setadd_case_groupeb161Props}= useContext(TotalContext) as TotalContextProps  
  const {header_group4878f, setheader_group4878f}= useContext(TotalContext) as TotalContextProps  
  const {header_group4878fProps, setheader_group4878fProps}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions094c3, setdynamicactions094c3}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions094c3Props, setdynamicactions094c3Props}= useContext(TotalContext) as TotalContextProps  
  const {case_information_group28f6f, setcase_information_group28f6f}= useContext(TotalContext) as TotalContextProps  
  const {case_information_group28f6fProps, setcase_information_group28f6fProps}= useContext(TotalContext) as TotalContextProps  
  const {venue_group6a36d, setvenue_group6a36d}= useContext(TotalContext) as TotalContextProps  
  const {venue_group6a36dProps, setvenue_group6a36dProps}= useContext(TotalContext) as TotalContextProps  
  const {georgia_group0fa18, setgeorgia_group0fa18}= useContext(TotalContext) as TotalContextProps  
  const {georgia_group0fa18Props, setgeorgia_group0fa18Props}= useContext(TotalContext) as TotalContextProps  
  const {georgias_group945fd, setgeorgias_group945fd}= useContext(TotalContext) as TotalContextProps  
  const {georgias_group945fdProps, setgeorgias_group945fdProps}= useContext(TotalContext) as TotalContextProps  
  const {georgias_groups6f85f, setgeorgias_groups6f85f}= useContext(TotalContext) as TotalContextProps  
  const {georgias_groups6f85fProps, setgeorgias_groups6f85fProps}= useContext(TotalContext) as TotalContextProps  
  const {georgiass_groups86a87, setgeorgiass_groups86a87}= useContext(TotalContext) as TotalContextProps  
  const {georgiass_groups86a87Props, setgeorgiass_groups86a87Props}= useContext(TotalContext) as TotalContextProps  
  const {georgsiass_groupsb044a, setgeorgsiass_groupsb044a}= useContext(TotalContext) as TotalContextProps  
  const {georgsiass_groupsb044aProps, setgeorgsiass_groupsb044aProps}= useContext(TotalContext) as TotalContextProps  
  const {debtor_information_group78a70, setdebtor_information_group78a70}= useContext(TotalContext) as TotalContextProps  
  const {debtor_information_group78a70Props, setdebtor_information_group78a70Props}= useContext(TotalContext) as TotalContextProps  
  const {financial_details_group52f47, setfinancial_details_group52f47}= useContext(TotalContext) as TotalContextProps  
  const {financial_details_group52f47Props, setfinancial_details_group52f47Props}= useContext(TotalContext) as TotalContextProps  
  const {financial_dtls_text3b122, setfinancial_dtls_text3b122}= useContext(TotalContext) as TotalContextProps  
  const {charge_off_datef15ef, setcharge_off_datef15ef}= useContext(TotalContext) as TotalContextProps  
  const {last_payment_date23905, setlast_payment_date23905}= useContext(TotalContext) as TotalContextProps  
  const {total_balanced15a0, settotal_balanced15a0}= useContext(TotalContext) as TotalContextProps  
  const {principalc3ba6, setprincipalc3ba6}= useContext(TotalContext) as TotalContextProps  
  const {interest81968, setinterest81968}= useContext(TotalContext) as TotalContextProps  
  const {fees0f99a, setfees0f99a}= useContext(TotalContext) as TotalContextProps  
  const {venue_details_group17ac6, setvenue_details_group17ac6}= useContext(TotalContext) as TotalContextProps  
  const {venue_details_group17ac6Props, setvenue_details_group17ac6Props}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_main_group04e92, setrequired_dociument_main_group04e92}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_main_group04e92Props, setrequired_dociument_main_group04e92Props}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_header_groupe39c8, setrequired_dociument_header_groupe39c8}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_header_groupe39c8Props, setrequired_dociument_header_groupe39c8Props}= useContext(TotalContext) as TotalContextProps  
  const {doc_type_tablebe9fa, setdoc_type_tablebe9fa}= useContext(TotalContext) as TotalContextProps  
  const {doc_type_tablebe9faProps, setdoc_type_tablebe9faProps}= useContext(TotalContext) as TotalContextProps  
  const {checklist_main_group0df6b, setchecklist_main_group0df6b}= useContext(TotalContext) as TotalContextProps  
  const {checklist_main_group0df6bProps, setchecklist_main_group0df6bProps}= useContext(TotalContext) as TotalContextProps  
  const {checklist_group32b3d, setchecklist_group32b3d}= useContext(TotalContext) as TotalContextProps  
  const {checklist_group32b3dProps, setchecklist_group32b3dProps}= useContext(TotalContext) as TotalContextProps  
  const {checklist_table198e1, setchecklist_table198e1}= useContext(TotalContext) as TotalContextProps  
  const {checklist_table198e1Props, setchecklist_table198e1Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,addCase_v1:{...pre?.addCase_v1,charge_off_date:undefined}}));
  if (!date) {
    setfinancial_details_group52f47((prev: any) => ({ ...prev, charge_off_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setfinancial_details_group52f47((prev: any) => ({ ...prev, charge_off_date: isoDate }))
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
        "564f1b6503aa4531afd30f4a41852f47",
        "2957d03a8f3343f19600743205ff15ef"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['add_case_group'] = add_case_groupeb161,
    codeStates['setadd_case_group'] = setadd_case_groupeb161,
    codeStates['add_case_groupeb161'] = add_case_groupeb161Props,
    codeStates['setadd_case_groupeb161'] = setadd_case_groupeb161Props,
    codeStates['header_group'] = header_group4878f,
    codeStates['setheader_group'] = setheader_group4878f,
    codeStates['header_group4878f'] = header_group4878fProps,
    codeStates['setheader_group4878f'] = setheader_group4878fProps,
    codeStates['dynamicactions'] = dynamicactions094c3,
    codeStates['setdynamicactions'] = setdynamicactions094c3,
    codeStates['dynamicactions094c3'] = dynamicactions094c3Props,
    codeStates['setdynamicactions094c3'] = setdynamicactions094c3Props,
    codeStates['case_information_group'] = case_information_group28f6f,
    codeStates['setcase_information_group'] = setcase_information_group28f6f,
    codeStates['case_information_group28f6f'] = case_information_group28f6fProps,
    codeStates['setcase_information_group28f6f'] = setcase_information_group28f6fProps,
    codeStates['venue_group'] = venue_group6a36d,
    codeStates['setvenue_group'] = setvenue_group6a36d,
    codeStates['venue_group6a36d'] = venue_group6a36dProps,
    codeStates['setvenue_group6a36d'] = setvenue_group6a36dProps,
    codeStates['georgia_group'] = georgia_group0fa18,
    codeStates['setgeorgia_group'] = setgeorgia_group0fa18,
    codeStates['georgia_group0fa18'] = georgia_group0fa18Props,
    codeStates['setgeorgia_group0fa18'] = setgeorgia_group0fa18Props,
    codeStates['georgias_group'] = georgias_group945fd,
    codeStates['setgeorgias_group'] = setgeorgias_group945fd,
    codeStates['georgias_group945fd'] = georgias_group945fdProps,
    codeStates['setgeorgias_group945fd'] = setgeorgias_group945fdProps,
    codeStates['georgias_groups'] = georgias_groups6f85f,
    codeStates['setgeorgias_groups'] = setgeorgias_groups6f85f,
    codeStates['georgias_groups6f85f'] = georgias_groups6f85fProps,
    codeStates['setgeorgias_groups6f85f'] = setgeorgias_groups6f85fProps,
    codeStates['georgiass_groups'] = georgiass_groups86a87,
    codeStates['setgeorgiass_groups'] = setgeorgiass_groups86a87,
    codeStates['georgiass_groups86a87'] = georgiass_groups86a87Props,
    codeStates['setgeorgiass_groups86a87'] = setgeorgiass_groups86a87Props,
    codeStates['georgsiass_groups'] = georgsiass_groupsb044a,
    codeStates['setgeorgsiass_groups'] = setgeorgsiass_groupsb044a,
    codeStates['georgsiass_groupsb044a'] = georgsiass_groupsb044aProps,
    codeStates['setgeorgsiass_groupsb044a'] = setgeorgsiass_groupsb044aProps,
    codeStates['debtor_information_group'] = debtor_information_group78a70,
    codeStates['setdebtor_information_group'] = setdebtor_information_group78a70,
    codeStates['debtor_information_group78a70'] = debtor_information_group78a70Props,
    codeStates['setdebtor_information_group78a70'] = setdebtor_information_group78a70Props,
    codeStates['financial_details_group'] = financial_details_group52f47,
    codeStates['setfinancial_details_group'] = setfinancial_details_group52f47,
    codeStates['financial_details_group52f47'] = financial_details_group52f47Props,
    codeStates['setfinancial_details_group52f47'] = setfinancial_details_group52f47Props,
    codeStates['financial_dtls_text'] = financial_dtls_text3b122,
    codeStates['setfinancial_dtls_text'] = setfinancial_dtls_text3b122,
    codeStates['charge_off_date'] = charge_off_datef15ef,
    codeStates['setcharge_off_date'] = setcharge_off_datef15ef,
    codeStates['last_payment_date'] = last_payment_date23905,
    codeStates['setlast_payment_date'] = setlast_payment_date23905,
    codeStates['total_balance'] = total_balanced15a0,
    codeStates['settotal_balance'] = settotal_balanced15a0,
    codeStates['principal'] = principalc3ba6,
    codeStates['setprincipal'] = setprincipalc3ba6,
    codeStates['interest'] = interest81968,
    codeStates['setinterest'] = setinterest81968,
    codeStates['fees'] = fees0f99a,
    codeStates['setfees'] = setfees0f99a,
    codeStates['venue_details_group'] = venue_details_group17ac6,
    codeStates['setvenue_details_group'] = setvenue_details_group17ac6,
    codeStates['venue_details_group17ac6'] = venue_details_group17ac6Props,
    codeStates['setvenue_details_group17ac6'] = setvenue_details_group17ac6Props,
    codeStates['required_dociument_main_group'] = required_dociument_main_group04e92,
    codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group04e92,
    codeStates['required_dociument_main_group04e92'] = required_dociument_main_group04e92Props,
    codeStates['setrequired_dociument_main_group04e92'] = setrequired_dociument_main_group04e92Props,
    codeStates['required_dociument_header_group'] = required_dociument_header_groupe39c8,
    codeStates['setrequired_dociument_header_group'] = setrequired_dociument_header_groupe39c8,
    codeStates['required_dociument_header_groupe39c8'] = required_dociument_header_groupe39c8Props,
    codeStates['setrequired_dociument_header_groupe39c8'] = setrequired_dociument_header_groupe39c8Props,
    codeStates['doc_type_table'] = doc_type_tablebe9fa,
    codeStates['setdoc_type_table'] = setdoc_type_tablebe9fa,
    codeStates['doc_type_tablebe9fa'] = doc_type_tablebe9faProps,
    codeStates['setdoc_type_tablebe9fa'] = setdoc_type_tablebe9faProps,
    codeStates['checklist_main_group'] = checklist_main_group0df6b,
    codeStates['setchecklist_main_group'] = setchecklist_main_group0df6b,
    codeStates['checklist_main_group0df6b'] = checklist_main_group0df6bProps,
    codeStates['setchecklist_main_group0df6b'] = setchecklist_main_group0df6bProps,
    codeStates['checklist_group'] = checklist_group32b3d,
    codeStates['setchecklist_group'] = setchecklist_group32b3d,
    codeStates['checklist_group32b3d'] = checklist_group32b3dProps,
    codeStates['setchecklist_group32b3d'] = setchecklist_group32b3dProps,
    codeStates['checklist_table'] = checklist_table198e1,
    codeStates['setchecklist_table'] = setchecklist_table198e1,
    codeStates['checklist_table198e1'] = checklist_table198e1Props,
    codeStates['setchecklist_table198e1'] = setchecklist_table198e1Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setfinancial_details_group52f47Props((pre:any)=>({...pre,validation:true}))
 },[charge_off_datef15ef?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (charge_off_datef15ef?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 8`,gridRow: `10 / 22`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={financial_details_group52f47?.charge_off_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {charge_off_datef15ef?.isDisabled ? true : false}
      disabled= {charge_off_datef15ef?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Charge Off Date"
      dateValidation=""
      validationState={validate?.addCase_v1?.charge_off_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickercharge_off_date
