

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


const DatePickerlast_payment_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {add_case_group77747, setadd_case_group77747}= useContext(TotalContext) as TotalContextProps  
  const {add_case_group77747Props, setadd_case_group77747Props}= useContext(TotalContext) as TotalContextProps  
  const {header_groupbae8a, setheader_groupbae8a}= useContext(TotalContext) as TotalContextProps  
  const {header_groupbae8aProps, setheader_groupbae8aProps}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_main_group999a8, setrequired_dociument_main_group999a8}= useContext(TotalContext) as TotalContextProps  
  const {required_dociument_main_group999a8Props, setrequired_dociument_main_group999a8Props}= useContext(TotalContext) as TotalContextProps  
  const {doc_table45b8d, setdoc_table45b8d}= useContext(TotalContext) as TotalContextProps  
  const {doc_table45b8dProps, setdoc_table45b8dProps}= useContext(TotalContext) as TotalContextProps  
  const {case_information_group35ed3, setcase_information_group35ed3}= useContext(TotalContext) as TotalContextProps  
  const {case_information_group35ed3Props, setcase_information_group35ed3Props}= useContext(TotalContext) as TotalContextProps  
  const {case_info_text53524, setcase_info_text53524}= useContext(TotalContext) as TotalContextProps  
  const {debtor_namea603a, setdebtor_namea603a}= useContext(TotalContext) as TotalContextProps  
  const {case_display_id3ba0a, setcase_display_id3ba0a}= useContext(TotalContext) as TotalContextProps  
  const {ssn_masked36fce, setssn_masked36fce}= useContext(TotalContext) as TotalContextProps  
  const {dob19a93, setdob19a93}= useContext(TotalContext) as TotalContextProps  
  const {address0e39e, setaddress0e39e}= useContext(TotalContext) as TotalContextProps  
  const {creditor_name04ffa, setcreditor_name04ffa}= useContext(TotalContext) as TotalContextProps  
  const {charge_off_datef5bba, setcharge_off_datef5bba}= useContext(TotalContext) as TotalContextProps  
  const {last_payment_date37076, setlast_payment_date37076}= useContext(TotalContext) as TotalContextProps  
  const {divider9cfd3, setdivider9cfd3}= useContext(TotalContext) as TotalContextProps  
  const {card_groupe78fa, setcard_groupe78fa}= useContext(TotalContext) as TotalContextProps  
  const {card_groupe78faProps, setcard_groupe78faProps}= useContext(TotalContext) as TotalContextProps  
  const {principal_group9ae9f, setprincipal_group9ae9f}= useContext(TotalContext) as TotalContextProps  
  const {principal_group9ae9fProps, setprincipal_group9ae9fProps}= useContext(TotalContext) as TotalContextProps  
  const {intrest_group8df75, setintrest_group8df75}= useContext(TotalContext) as TotalContextProps  
  const {intrest_group8df75Props, setintrest_group8df75Props}= useContext(TotalContext) as TotalContextProps  
  const {fees_groupac23b, setfees_groupac23b}= useContext(TotalContext) as TotalContextProps  
  const {fees_groupac23bProps, setfees_groupac23bProps}= useContext(TotalContext) as TotalContextProps  
  const {total_groupe6175, settotal_groupe6175}= useContext(TotalContext) as TotalContextProps  
  const {total_groupe6175Props, settotal_groupe6175Props}= useContext(TotalContext) as TotalContextProps  
  const {sol_expiry_date3775f, setsol_expiry_date3775f}= useContext(TotalContext) as TotalContextProps  
  const {venue_details_group6904e, setvenue_details_group6904e}= useContext(TotalContext) as TotalContextProps  
  const {venue_details_group6904eProps, setvenue_details_group6904eProps}= useContext(TotalContext) as TotalContextProps  
  const {checklist_main_groupda0ff, setchecklist_main_groupda0ff}= useContext(TotalContext) as TotalContextProps  
  const {checklist_main_groupda0ffProps, setchecklist_main_groupda0ffProps}= useContext(TotalContext) as TotalContextProps  
  const {checklist_table0e25b, setchecklist_table0e25b}= useContext(TotalContext) as TotalContextProps  
  const {checklist_table0e25bProps, setchecklist_table0e25bProps}= useContext(TotalContext) as TotalContextProps  
  const {special_rules_groupc1585, setspecial_rules_groupc1585}= useContext(TotalContext) as TotalContextProps  
  const {special_rules_groupc1585Props, setspecial_rules_groupc1585Props}= useContext(TotalContext) as TotalContextProps  
  const {special_rules1fc30, setspecial_rules1fc30}= useContext(TotalContext) as TotalContextProps  
  const {special_rules1fc30Props, setspecial_rules1fc30Props}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions37e34, setdynamicactions37e34}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions37e34Props, setdynamicactions37e34Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,AMRCaseApproval_v1:{...pre?.AMRCaseApproval_v1,last_payment_date:undefined}}));
  if (!date) {
    setcase_information_group35ed3((prev: any) => ({ ...prev, last_payment_date: null }));
    return;
  }
  const now = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const combined = new Date(Date.UTC(year, month - 1, day, now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
  const isoDate = combined.toISOString();
  setcase_information_group35ed3((prev: any) => ({ ...prev, last_payment_date: isoDate }))
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
        "9b270458f4e722fe38d9cd7c50335ed3",
        "14c6c1ebf773ea5e7201dfb60f137076"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['add_case_group'] = add_case_group77747,
    codeStates['setadd_case_group'] = setadd_case_group77747,
    codeStates['add_case_group77747'] = add_case_group77747Props,
    codeStates['setadd_case_group77747'] = setadd_case_group77747Props,
    codeStates['header_group'] = header_groupbae8a,
    codeStates['setheader_group'] = setheader_groupbae8a,
    codeStates['header_groupbae8a'] = header_groupbae8aProps,
    codeStates['setheader_groupbae8a'] = setheader_groupbae8aProps,
    codeStates['required_dociument_main_group'] = required_dociument_main_group999a8,
    codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group999a8,
    codeStates['required_dociument_main_group999a8'] = required_dociument_main_group999a8Props,
    codeStates['setrequired_dociument_main_group999a8'] = setrequired_dociument_main_group999a8Props,
    codeStates['doc_table'] = doc_table45b8d,
    codeStates['setdoc_table'] = setdoc_table45b8d,
    codeStates['doc_table45b8d'] = doc_table45b8dProps,
    codeStates['setdoc_table45b8d'] = setdoc_table45b8dProps,
    codeStates['case_information_group'] = case_information_group35ed3,
    codeStates['setcase_information_group'] = setcase_information_group35ed3,
    codeStates['case_information_group35ed3'] = case_information_group35ed3Props,
    codeStates['setcase_information_group35ed3'] = setcase_information_group35ed3Props,
    codeStates['case_info_text'] = case_info_text53524,
    codeStates['setcase_info_text'] = setcase_info_text53524,
    codeStates['debtor_name'] = debtor_namea603a,
    codeStates['setdebtor_name'] = setdebtor_namea603a,
    codeStates['case_display_id'] = case_display_id3ba0a,
    codeStates['setcase_display_id'] = setcase_display_id3ba0a,
    codeStates['ssn_masked'] = ssn_masked36fce,
    codeStates['setssn_masked'] = setssn_masked36fce,
    codeStates['dob'] = dob19a93,
    codeStates['setdob'] = setdob19a93,
    codeStates['address'] = address0e39e,
    codeStates['setaddress'] = setaddress0e39e,
    codeStates['creditor_name'] = creditor_name04ffa,
    codeStates['setcreditor_name'] = setcreditor_name04ffa,
    codeStates['charge_off_date'] = charge_off_datef5bba,
    codeStates['setcharge_off_date'] = setcharge_off_datef5bba,
    codeStates['last_payment_date'] = last_payment_date37076,
    codeStates['setlast_payment_date'] = setlast_payment_date37076,
    codeStates['divider'] = divider9cfd3,
    codeStates['setdivider'] = setdivider9cfd3,
    codeStates['card_group'] = card_groupe78fa,
    codeStates['setcard_group'] = setcard_groupe78fa,
    codeStates['card_groupe78fa'] = card_groupe78faProps,
    codeStates['setcard_groupe78fa'] = setcard_groupe78faProps,
    codeStates['principal_group'] = principal_group9ae9f,
    codeStates['setprincipal_group'] = setprincipal_group9ae9f,
    codeStates['principal_group9ae9f'] = principal_group9ae9fProps,
    codeStates['setprincipal_group9ae9f'] = setprincipal_group9ae9fProps,
    codeStates['intrest_group'] = intrest_group8df75,
    codeStates['setintrest_group'] = setintrest_group8df75,
    codeStates['intrest_group8df75'] = intrest_group8df75Props,
    codeStates['setintrest_group8df75'] = setintrest_group8df75Props,
    codeStates['fees_group'] = fees_groupac23b,
    codeStates['setfees_group'] = setfees_groupac23b,
    codeStates['fees_groupac23b'] = fees_groupac23bProps,
    codeStates['setfees_groupac23b'] = setfees_groupac23bProps,
    codeStates['total_group'] = total_groupe6175,
    codeStates['settotal_group'] = settotal_groupe6175,
    codeStates['total_groupe6175'] = total_groupe6175Props,
    codeStates['settotal_groupe6175'] = settotal_groupe6175Props,
    codeStates['sol_expiry_date'] = sol_expiry_date3775f,
    codeStates['setsol_expiry_date'] = setsol_expiry_date3775f,
    codeStates['venue_details_group'] = venue_details_group6904e,
    codeStates['setvenue_details_group'] = setvenue_details_group6904e,
    codeStates['venue_details_group6904e'] = venue_details_group6904eProps,
    codeStates['setvenue_details_group6904e'] = setvenue_details_group6904eProps,
    codeStates['checklist_main_group'] = checklist_main_groupda0ff,
    codeStates['setchecklist_main_group'] = setchecklist_main_groupda0ff,
    codeStates['checklist_main_groupda0ff'] = checklist_main_groupda0ffProps,
    codeStates['setchecklist_main_groupda0ff'] = setchecklist_main_groupda0ffProps,
    codeStates['checklist_table'] = checklist_table0e25b,
    codeStates['setchecklist_table'] = setchecklist_table0e25b,
    codeStates['checklist_table0e25b'] = checklist_table0e25bProps,
    codeStates['setchecklist_table0e25b'] = setchecklist_table0e25bProps,
    codeStates['special_rules_group'] = special_rules_groupc1585,
    codeStates['setspecial_rules_group'] = setspecial_rules_groupc1585,
    codeStates['special_rules_groupc1585'] = special_rules_groupc1585Props,
    codeStates['setspecial_rules_groupc1585'] = setspecial_rules_groupc1585Props,
    codeStates['special_rules'] = special_rules1fc30,
    codeStates['setspecial_rules'] = setspecial_rules1fc30,
    codeStates['special_rules1fc30'] = special_rules1fc30Props,
    codeStates['setspecial_rules1fc30'] = setspecial_rules1fc30Props,
    codeStates['dynamicactions'] = dynamicactions37e34,
    codeStates['setdynamicactions'] = setdynamicactions37e34,
    codeStates['dynamicactions37e34'] = dynamicactions37e34Props,
    codeStates['setdynamicactions37e34'] = setdynamicactions37e34Props,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setcase_information_group35ed3Props((pre:any)=>({...pre,validation:true}))
 },[last_payment_date37076?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])


if (last_payment_date37076?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 25`,gridRow: `52 / 64`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={case_information_group35ed3?.last_payment_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly={true}
      disabled= {last_payment_date37076?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Last Payment"
      dateValidation=""
      validationState={validate?.AMRCaseApproval_v1?.last_payment_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerlast_payment_date
