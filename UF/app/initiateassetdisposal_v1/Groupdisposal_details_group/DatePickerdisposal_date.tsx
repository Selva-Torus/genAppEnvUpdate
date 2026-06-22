

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


const DatePickerdisposal_date = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {initiate_asset_disposal_groupdb5a7, setinitiate_asset_disposal_groupdb5a7}= useContext(TotalContext) as TotalContextProps  
  const {initiate_asset_disposal_groupdb5a7Props, setinitiate_asset_disposal_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps  
  const {disposal_details_groupe1b0c, setdisposal_details_groupe1b0c}= useContext(TotalContext) as TotalContextProps  
  const {disposal_details_groupe1b0cProps, setdisposal_details_groupe1b0cProps}= useContext(TotalContext) as TotalContextProps  
  const {disposal_details0c71e, setdisposal_details0c71e}= useContext(TotalContext) as TotalContextProps  
  const {vendor_nameabdbb, setvendor_nameabdbb}= useContext(TotalContext) as TotalContextProps  
  const {asset_name819e8, setasset_name819e8}= useContext(TotalContext) as TotalContextProps  
  const {disposal_methoddeb30, setdisposal_methoddeb30}= useContext(TotalContext) as TotalContextProps  
  const {disposal_date12263, setdisposal_date12263}= useContext(TotalContext) as TotalContextProps  
  const {reasonadb68, setreasonadb68}= useContext(TotalContext) as TotalContextProps  
  const {compliance_financial_group1f9bc, setcompliance_financial_group1f9bc}= useContext(TotalContext) as TotalContextProps  
  const {compliance_financial_group1f9bcProps, setcompliance_financial_group1f9bcProps}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions9a7ff, setdynamicactions9a7ff}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions9a7ffProps, setdynamicactions9a7ffProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,initiateAssetDisposal_v1:{...pre?.initiateAssetDisposal_v1,disposal_date:undefined}}));
  if (!date) {
    setdisposal_details_groupe1b0c((prev: any) => ({ ...prev, disposal_date: null }));
    return;
  }
  const selectedDate = new Date(date);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET);
  const isoDate = indiaTime.toISOString();
  setdisposal_details_groupe1b0c((prev: any) => ({ ...prev, disposal_date: isoDate }))
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
        "2693374bb2d64ed88d121dd7c5ee1b0c",
        "4fb06f411c4549aa95123aa699012263"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['initiate_asset_disposal_group'] = initiate_asset_disposal_groupdb5a7,
    codeStates['setinitiate_asset_disposal_group'] = setinitiate_asset_disposal_groupdb5a7,
    codeStates['initiate_asset_disposal_groupdb5a7'] = initiate_asset_disposal_groupdb5a7Props,
    codeStates['setinitiate_asset_disposal_groupdb5a7'] = setinitiate_asset_disposal_groupdb5a7Props,
    codeStates['disposal_details_group'] = disposal_details_groupe1b0c,
    codeStates['setdisposal_details_group'] = setdisposal_details_groupe1b0c,
    codeStates['disposal_details_groupe1b0c'] = disposal_details_groupe1b0cProps,
    codeStates['setdisposal_details_groupe1b0c'] = setdisposal_details_groupe1b0cProps,
    codeStates['disposal_details'] = disposal_details0c71e,
    codeStates['setdisposal_details'] = setdisposal_details0c71e,
    codeStates['vendor_name'] = vendor_nameabdbb,
    codeStates['setvendor_name'] = setvendor_nameabdbb,
    codeStates['asset_name'] = asset_name819e8,
    codeStates['setasset_name'] = setasset_name819e8,
    codeStates['disposal_method'] = disposal_methoddeb30,
    codeStates['setdisposal_method'] = setdisposal_methoddeb30,
    codeStates['disposal_date'] = disposal_date12263,
    codeStates['setdisposal_date'] = setdisposal_date12263,
    codeStates['reason'] = reasonadb68,
    codeStates['setreason'] = setreasonadb68,
    codeStates['compliance_financial_group'] = compliance_financial_group1f9bc,
    codeStates['setcompliance_financial_group'] = setcompliance_financial_group1f9bc,
    codeStates['compliance_financial_group1f9bc'] = compliance_financial_group1f9bcProps,
    codeStates['setcompliance_financial_group1f9bc'] = setcompliance_financial_group1f9bcProps,
    codeStates['dynamicactions'] = dynamicactions9a7ff,
    codeStates['setdynamicactions'] = setdynamicactions9a7ff,
    codeStates['dynamicactions9a7ff'] = dynamicactions9a7ffProps,
    codeStates['setdynamicactions9a7ff'] = setdynamicactions9a7ffProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setdisposal_details_groupe1b0cProps((pre:any)=>({...pre,validation:true}))
 },[disposal_date12263?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])

if (disposal_date12263?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 9`,gridRow: `21 / 33`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("")}
      value={disposal_details_groupe1b0c?.disposal_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {disposal_date12263?.isDisabled ? true : false}
      disabled= {disposal_date12263?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Disposal Date"
      dateValidation=""
      validationState={validate?.initiateAssetDisposal_v1?.disposal_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdisposal_date
