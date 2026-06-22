

'use client'
import React, { useState,useContext,useEffect } from 'react'
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


const DatePickeractual_return_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {assign_asset_groupdb5a7, setassign_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps  
  const {assign_asset_groupdb5a7Props, setassign_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps  
  const {assignment_information_group5d144, setassignment_information_group5d144}= useContext(TotalContext) as TotalContextProps  
  const {assignment_information_group5d144Props, setassignment_information_group5d144Props}= useContext(TotalContext) as TotalContextProps  
  const {assignment_details_group7f60d, setassignment_details_group7f60d}= useContext(TotalContext) as TotalContextProps  
  const {assignment_details_group7f60dProps, setassignment_details_group7f60dProps}= useContext(TotalContext) as TotalContextProps  
  const {assignment_details_textb98b6, setassignment_details_textb98b6}= useContext(TotalContext) as TotalContextProps  
  const {actual_return_date06574, setactual_return_date06574}= useContext(TotalContext) as TotalContextProps  
  const {returned_atb4ccc, setreturned_atb4ccc}= useContext(TotalContext) as TotalContextProps  
  const {condition_at_return40b7c, setcondition_at_return40b7c}= useContext(TotalContext) as TotalContextProps  
  const {approved_by8c220, setapproved_by8c220}= useContext(TotalContext) as TotalContextProps  
  const {approval_statuseb2b2, setapproval_statuseb2b2}= useContext(TotalContext) as TotalContextProps  
  const {assignment_notese758f, setassignment_notese758f}= useContext(TotalContext) as TotalContextProps  
  const {acknowledgement_signedfdaee, setacknowledgement_signedfdaee}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions956ba, setdynamicactions956ba}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions956baProps, setdynamicactions956baProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,actual_return_date:undefined}}));
  if (!date) {
    setassignment_details_group7f60d((prev: any) => ({ ...prev, actual_return_date: null }));
    return;
  }
  const selectedDate = new Date(date);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET);
  const isoDate = indiaTime.toISOString();
  setassignment_details_group7f60d((prev: any) => ({ ...prev, actual_return_date: isoDate }))
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
        "71dc0557a5ad48bd8bc18a025737f60d",
        "51220215962d466a93be7a418c006574"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['assign_asset_group'] = assign_asset_groupdb5a7,
    codeStates['setassign_asset_group'] = setassign_asset_groupdb5a7,
    codeStates['assign_asset_groupdb5a7'] = assign_asset_groupdb5a7Props,
    codeStates['setassign_asset_groupdb5a7'] = setassign_asset_groupdb5a7Props,
    codeStates['assignment_information_group'] = assignment_information_group5d144,
    codeStates['setassignment_information_group'] = setassignment_information_group5d144,
    codeStates['assignment_information_group5d144'] = assignment_information_group5d144Props,
    codeStates['setassignment_information_group5d144'] = setassignment_information_group5d144Props,
    codeStates['assignment_details_group'] = assignment_details_group7f60d,
    codeStates['setassignment_details_group'] = setassignment_details_group7f60d,
    codeStates['assignment_details_group7f60d'] = assignment_details_group7f60dProps,
    codeStates['setassignment_details_group7f60d'] = setassignment_details_group7f60dProps,
    codeStates['assignment_details_text'] = assignment_details_textb98b6,
    codeStates['setassignment_details_text'] = setassignment_details_textb98b6,
    codeStates['actual_return_date'] = actual_return_date06574,
    codeStates['setactual_return_date'] = setactual_return_date06574,
    codeStates['returned_at'] = returned_atb4ccc,
    codeStates['setreturned_at'] = setreturned_atb4ccc,
    codeStates['condition_at_return'] = condition_at_return40b7c,
    codeStates['setcondition_at_return'] = setcondition_at_return40b7c,
    codeStates['approved_by'] = approved_by8c220,
    codeStates['setapproved_by'] = setapproved_by8c220,
    codeStates['approval_status'] = approval_statuseb2b2,
    codeStates['setapproval_status'] = setapproval_statuseb2b2,
    codeStates['assignment_notes'] = assignment_notese758f,
    codeStates['setassignment_notes'] = setassignment_notese758f,
    codeStates['acknowledgement_signed'] = acknowledgement_signedfdaee,
    codeStates['setacknowledgement_signed'] = setacknowledgement_signedfdaee,
    codeStates['dynamicactions'] = dynamicactions956ba,
    codeStates['setdynamicactions'] = setdynamicactions956ba,
    codeStates['dynamicactions956ba'] = dynamicactions956baProps,
    codeStates['setdynamicactions956ba'] = setdynamicactions956baProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setassignment_details_group7f60dProps((pre:any)=>({...pre,validation:true}))
 },[actual_return_date06574?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])

if (actual_return_date06574?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 9`,gridRow: `9 / 23`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!rounded-md"
      //label={keyset("")}
      value={assignment_details_group7f60d?.actual_return_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {actual_return_date06574?.isDisabled ? true : false}
      disabled= {actual_return_date06574?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Actual Return Date"
      dateValidation=""
      validationState={validate?.assignAsset_v1?.actual_return_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickeractual_return_date
