

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
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';


const DatePickerdob = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {add_case_grouped126, setadd_case_grouped126}= useContext(TotalContext) as TotalContextProps  
  const {add_case_grouped126Props, setadd_case_grouped126Props}= useContext(TotalContext) as TotalContextProps  
  const {header_groupbd8a8, setheader_groupbd8a8}= useContext(TotalContext) as TotalContextProps  
  const {header_groupbd8a8Props, setheader_groupbd8a8Props}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_main_group255d1, setrequired_dociument_main_group255d1}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_main_group255d1Props, setrequired_dociument_main_group255d1Props}= useContext(TotalContext) as TotalContextProps  
  const {doc_table9c4f7, setdoc_table9c4f7}= useContext(TotalContext) as TotalContextProps  
  const {doc_table9c4f7Props, setdoc_table9c4f7Props}= useContext(TotalContext) as TotalContextProps  
  const {case_information_group48f3c, setcase_information_group48f3c}= useContext(TotalContext) as TotalContextProps  
  const {case_information_group48f3cProps, setcase_information_group48f3cProps}= useContext(TotalContext) as TotalContextProps  
  const {case_info_text1e3db, setcase_info_text1e3db}= useContext(TotalContext) as TotalContextProps  
  const {debtor_name2af58, setdebtor_name2af58}= useContext(TotalContext) as TotalContextProps  
  const {case_display_idd1272, setcase_display_idd1272}= useContext(TotalContext) as TotalContextProps  
  const {ssn_maskedc4424, setssn_maskedc4424}= useContext(TotalContext) as TotalContextProps  
  const {dob29785, setdob29785}= useContext(TotalContext) as TotalContextProps  
  const {address70906, setaddress70906}= useContext(TotalContext) as TotalContextProps  
  const {creditor_namea9b98, setcreditor_namea9b98}= useContext(TotalContext) as TotalContextProps  
  const {charge_off_date763d0, setcharge_off_date763d0}= useContext(TotalContext) as TotalContextProps  
  const {last_payment_date43bdb, setlast_payment_date43bdb}= useContext(TotalContext) as TotalContextProps  
  const {dividere3c67, setdividere3c67}= useContext(TotalContext) as TotalContextProps  
  const {card_group4c709, setcard_group4c709}= useContext(TotalContext) as TotalContextProps  
  const {card_group4c709Props, setcard_group4c709Props}= useContext(TotalContext) as TotalContextProps  
  const {principal_group42235, setprincipal_group42235}= useContext(TotalContext) as TotalContextProps  
  const {principal_group42235Props, setprincipal_group42235Props}= useContext(TotalContext) as TotalContextProps  
  const {intrest_group65c3b, setintrest_group65c3b}= useContext(TotalContext) as TotalContextProps  
  const {intrest_group65c3bProps, setintrest_group65c3bProps}= useContext(TotalContext) as TotalContextProps  
  const {fees_group8c4a6, setfees_group8c4a6}= useContext(TotalContext) as TotalContextProps  
  const {fees_group8c4a6Props, setfees_group8c4a6Props}= useContext(TotalContext) as TotalContextProps  
  const {total_groupc52d3, settotal_groupc52d3}= useContext(TotalContext) as TotalContextProps  
  const {total_groupc52d3Props, settotal_groupc52d3Props}= useContext(TotalContext) as TotalContextProps  
  const {sol_expiry_date4dfe3, setsol_expiry_date4dfe3}= useContext(TotalContext) as TotalContextProps  
  const {venue_details_group51614, setvenue_details_group51614}= useContext(TotalContext) as TotalContextProps  
  const {venue_details_group51614Props, setvenue_details_group51614Props}= useContext(TotalContext) as TotalContextProps  
  const {checklist_main_group2b466, setchecklist_main_group2b466}= useContext(TotalContext) as TotalContextProps  
  const {checklist_main_group2b466Props, setchecklist_main_group2b466Props}= useContext(TotalContext) as TotalContextProps  
  const {checklist_tablecafb0, setchecklist_tablecafb0}= useContext(TotalContext) as TotalContextProps  
  const {checklist_tablecafb0Props, setchecklist_tablecafb0Props}= useContext(TotalContext) as TotalContextProps  
  const {special_rules_group7ce9f, setspecial_rules_group7ce9f}= useContext(TotalContext) as TotalContextProps  
  const {special_rules_group7ce9fProps, setspecial_rules_group7ce9fProps}= useContext(TotalContext) as TotalContextProps  
  const {special_rules7f109, setspecial_rules7f109}= useContext(TotalContext) as TotalContextProps  
  const {special_rules7f109Props, setspecial_rules7f109Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,viewAMRCasePgGraph_v1:{...pre?.viewAMRCasePgGraph_v1,dob:undefined}}));
  if (!date) {
    setcase_information_group48f3c((prev: any) => ({ ...prev, dob: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setcase_information_group48f3c((prev: any) => ({ ...prev, dob: isoDate }))
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
        "2723b3f0ae705c0f66d6e06787248f3c",
        "6af4f231e44e0d710a4c056c2a229785"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['add_case_group'] = add_case_grouped126,
    codeStates['setadd_case_group'] = setadd_case_grouped126,
    codeStates['add_case_grouped126'] = add_case_grouped126Props,
    codeStates['setadd_case_grouped126'] = setadd_case_grouped126Props,
    codeStates['header_group'] = header_groupbd8a8,
    codeStates['setheader_group'] = setheader_groupbd8a8,
    codeStates['header_groupbd8a8'] = header_groupbd8a8Props,
    codeStates['setheader_groupbd8a8'] = setheader_groupbd8a8Props,
    codeStates['required_dociument_main_group'] = required_dociument_main_group255d1,
    codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group255d1,
    codeStates['required_dociument_main_group255d1'] = required_dociument_main_group255d1Props,
    codeStates['setrequired_dociument_main_group255d1'] = setrequired_dociument_main_group255d1Props,
    codeStates['doc_table'] = doc_table9c4f7,
    codeStates['setdoc_table'] = setdoc_table9c4f7,
    codeStates['doc_table9c4f7'] = doc_table9c4f7Props,
    codeStates['setdoc_table9c4f7'] = setdoc_table9c4f7Props,
    codeStates['case_information_group'] = case_information_group48f3c,
    codeStates['setcase_information_group'] = setcase_information_group48f3c,
    codeStates['case_information_group48f3c'] = case_information_group48f3cProps,
    codeStates['setcase_information_group48f3c'] = setcase_information_group48f3cProps,
    codeStates['case_info_text'] = case_info_text1e3db,
    codeStates['setcase_info_text'] = setcase_info_text1e3db,
    codeStates['debtor_name'] = debtor_name2af58,
    codeStates['setdebtor_name'] = setdebtor_name2af58,
    codeStates['case_display_id'] = case_display_idd1272,
    codeStates['setcase_display_id'] = setcase_display_idd1272,
    codeStates['ssn_masked'] = ssn_maskedc4424,
    codeStates['setssn_masked'] = setssn_maskedc4424,
    codeStates['dob'] = dob29785,
    codeStates['setdob'] = setdob29785,
    codeStates['address'] = address70906,
    codeStates['setaddress'] = setaddress70906,
    codeStates['creditor_name'] = creditor_namea9b98,
    codeStates['setcreditor_name'] = setcreditor_namea9b98,
    codeStates['charge_off_date'] = charge_off_date763d0,
    codeStates['setcharge_off_date'] = setcharge_off_date763d0,
    codeStates['last_payment_date'] = last_payment_date43bdb,
    codeStates['setlast_payment_date'] = setlast_payment_date43bdb,
    codeStates['divider'] = dividere3c67,
    codeStates['setdivider'] = setdividere3c67,
    codeStates['card_group'] = card_group4c709,
    codeStates['setcard_group'] = setcard_group4c709,
    codeStates['card_group4c709'] = card_group4c709Props,
    codeStates['setcard_group4c709'] = setcard_group4c709Props,
    codeStates['principal_group'] = principal_group42235,
    codeStates['setprincipal_group'] = setprincipal_group42235,
    codeStates['principal_group42235'] = principal_group42235Props,
    codeStates['setprincipal_group42235'] = setprincipal_group42235Props,
    codeStates['intrest_group'] = intrest_group65c3b,
    codeStates['setintrest_group'] = setintrest_group65c3b,
    codeStates['intrest_group65c3b'] = intrest_group65c3bProps,
    codeStates['setintrest_group65c3b'] = setintrest_group65c3bProps,
    codeStates['fees_group'] = fees_group8c4a6,
    codeStates['setfees_group'] = setfees_group8c4a6,
    codeStates['fees_group8c4a6'] = fees_group8c4a6Props,
    codeStates['setfees_group8c4a6'] = setfees_group8c4a6Props,
    codeStates['total_group'] = total_groupc52d3,
    codeStates['settotal_group'] = settotal_groupc52d3,
    codeStates['total_groupc52d3'] = total_groupc52d3Props,
    codeStates['settotal_groupc52d3'] = settotal_groupc52d3Props,
    codeStates['sol_expiry_date'] = sol_expiry_date4dfe3,
    codeStates['setsol_expiry_date'] = setsol_expiry_date4dfe3,
    codeStates['venue_details_group'] = venue_details_group51614,
    codeStates['setvenue_details_group'] = setvenue_details_group51614,
    codeStates['venue_details_group51614'] = venue_details_group51614Props,
    codeStates['setvenue_details_group51614'] = setvenue_details_group51614Props,
    codeStates['checklist_main_group'] = checklist_main_group2b466,
    codeStates['setchecklist_main_group'] = setchecklist_main_group2b466,
    codeStates['checklist_main_group2b466'] = checklist_main_group2b466Props,
    codeStates['setchecklist_main_group2b466'] = setchecklist_main_group2b466Props,
    codeStates['checklist_table'] = checklist_tablecafb0,
    codeStates['setchecklist_table'] = setchecklist_tablecafb0,
    codeStates['checklist_tablecafb0'] = checklist_tablecafb0Props,
    codeStates['setchecklist_tablecafb0'] = setchecklist_tablecafb0Props,
    codeStates['special_rules_group'] = special_rules_group7ce9f,
    codeStates['setspecial_rules_group'] = setspecial_rules_group7ce9f,
    codeStates['special_rules_group7ce9f'] = special_rules_group7ce9fProps,
    codeStates['setspecial_rules_group7ce9f'] = setspecial_rules_group7ce9fProps,
    codeStates['special_rules'] = special_rules7f109,
    codeStates['setspecial_rules'] = setspecial_rules7f109,
    codeStates['special_rules7f109'] = special_rules7f109Props,
    codeStates['setspecial_rules7f109'] = setspecial_rules7f109Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setcase_information_group48f3cProps((pre:any)=>({...pre,validation:true}))
 },[dob29785?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (dob29785?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `25 / 37`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={case_information_group48f3c?.dob}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly={true}
      disabled= {dob29785?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="DOB"
      dateValidation=""
      validationState={validate?.viewAMRCasePgGraph_v1?.dob ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdob
