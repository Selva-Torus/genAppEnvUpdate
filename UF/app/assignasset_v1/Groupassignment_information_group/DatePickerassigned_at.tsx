

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


const DatePickerassigned_at = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {assignment_information_text8af67, setassignment_information_text8af67}= useContext(TotalContext) as TotalContextProps  
  const {asset_name56fec, setasset_name56fec}= useContext(TotalContext) as TotalContextProps  
  const {assigned_tof8f17, setassigned_tof8f17}= useContext(TotalContext) as TotalContextProps  
  const {assigned_byc4563, setassigned_byc4563}= useContext(TotalContext) as TotalContextProps  
  const {assigned_at45db5, setassigned_at45db5}= useContext(TotalContext) as TotalContextProps  
  const {assignment_statusa6f80, setassignment_statusa6f80}= useContext(TotalContext) as TotalContextProps  
  const {condition_at_assign27aff, setcondition_at_assign27aff}= useContext(TotalContext) as TotalContextProps  
  const {expected_return_date15cfe, setexpected_return_date15cfe}= useContext(TotalContext) as TotalContextProps  
  const {assignment_details_group7f60d, setassignment_details_group7f60d}= useContext(TotalContext) as TotalContextProps  
  const {assignment_details_group7f60dProps, setassignment_details_group7f60dProps}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions956ba, setdynamicactions956ba}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions956baProps, setdynamicactions956baProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


          const schema = v.pipe(v.string(),v.minLength(1, 'Date is required'))

const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  if(date == "" || date == null || date == undefined) {
    setError('Date is required')
    setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,assigned_date: "invalid"}}))
    setassignment_information_group5d144((prev: any) => ({ ...prev, assigned_date: "" }))
    return;
  }
  setError('')
  setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,assigned_date:undefined}}));
  if (!date) {
    setassignment_information_group5d144((prev: any) => ({ ...prev, assigned_date: null }));
    return;
  }
  const selectedDate = new Date(date);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET);
  const isoDate = indiaTime.toISOString();
  setassignment_information_group5d144((prev: any) => ({ ...prev, assigned_date: isoDate }))
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
      if(assignment_information_group5d144?.assigned_date == "" || assignment_information_group5d144?.assigned_date == undefined){
        const result = v.safeParse(schema, assignment_information_group5d144?.assigned_date || '');
      if (!result.success) {
        const errorMsg = result.issues[0]?.message || 'Date is required';
        setError(errorMsg);
            setValidate((pre:any)=>({...pre,assignAsset_v1:{...pre?.assignAsset_v1,assigned_date: "invalid"}}));
        return;
      }
      }
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "913d50f029c84864b01c8a333a75d144",
        "4ab2b30dbab644f6b39e714329545db5"
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
    codeStates['assignment_information_text'] = assignment_information_text8af67,
    codeStates['setassignment_information_text'] = setassignment_information_text8af67,
    codeStates['asset_name'] = asset_name56fec,
    codeStates['setasset_name'] = setasset_name56fec,
    codeStates['assigned_to'] = assigned_tof8f17,
    codeStates['setassigned_to'] = setassigned_tof8f17,
    codeStates['assigned_by'] = assigned_byc4563,
    codeStates['setassigned_by'] = setassigned_byc4563,
    codeStates['assigned_at'] = assigned_at45db5,
    codeStates['setassigned_at'] = setassigned_at45db5,
    codeStates['assignment_status'] = assignment_statusa6f80,
    codeStates['setassignment_status'] = setassignment_statusa6f80,
    codeStates['condition_at_assign'] = condition_at_assign27aff,
    codeStates['setcondition_at_assign'] = setcondition_at_assign27aff,
    codeStates['expected_return_date'] = expected_return_date15cfe,
    codeStates['setexpected_return_date'] = setexpected_return_date15cfe,
    codeStates['assignment_details_group'] = assignment_details_group7f60d,
    codeStates['setassignment_details_group'] = setassignment_details_group7f60d,
    codeStates['assignment_details_group7f60d'] = assignment_details_group7f60dProps,
    codeStates['setassignment_details_group7f60d'] = setassignment_details_group7f60dProps,
    codeStates['dynamicactions'] = dynamicactions956ba,
    codeStates['setdynamicactions'] = setdynamicactions956ba,
    codeStates['dynamicactions956ba'] = dynamicactions956baProps,
    codeStates['setdynamicactions956ba'] = setdynamicactions956baProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setassignment_information_group5d144Props((pre:any)=>({...pre,validation:true,required:true}))
 },[assigned_at45db5?.refresh])

useEffect(()=>{
  if(!assignment_information_group5d144?.assigned_date){ 
    setassignment_information_group5d144Props((pre:any)=>({...pre,required:true}));
    setIsRequiredData(true);
  }
  if(validateRefetch.init!=0)
    handleBlur();
},[validateRefetch.value])

if (assigned_at45db5?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 9`,gridRow: `24 / 38`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!rounded-md"
      //label={keyset("")}
      value={assignment_information_group5d144?.assigned_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ true }
      readOnly=  {assigned_at45db5?.isDisabled ? true : false}
      disabled= {assigned_at45db5?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Assigned At"
      dateValidation=""
      validationState={validate?.assignAsset_v1?.assigned_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerassigned_at
