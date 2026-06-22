

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
  const {new_asset_groupdb5a7, setnew_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps  
  const {new_asset_groupdb5a7Props, setnew_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps  
  const {asset_info_groupdeeeb, setasset_info_groupdeeeb}= useContext(TotalContext) as TotalContextProps  
  const {asset_info_groupdeeebProps, setasset_info_groupdeeebProps}= useContext(TotalContext) as TotalContextProps  
  const {classification_group3c6b3, setclassification_group3c6b3}= useContext(TotalContext) as TotalContextProps  
  const {classification_group3c6b3Props, setclassification_group3c6b3Props}= useContext(TotalContext) as TotalContextProps  
  const {additional_details_group8c616, setadditional_details_group8c616}= useContext(TotalContext) as TotalContextProps  
  const {additional_details_group8c616Props, setadditional_details_group8c616Props}= useContext(TotalContext) as TotalContextProps  
  const {pyrchase_details_group76407, setpyrchase_details_group76407}= useContext(TotalContext) as TotalContextProps  
  const {pyrchase_details_group76407Props, setpyrchase_details_group76407Props}= useContext(TotalContext) as TotalContextProps  
  const {disposal_details_groupaffa1, setdisposal_details_groupaffa1}= useContext(TotalContext) as TotalContextProps  
  const {disposal_details_groupaffa1Props, setdisposal_details_groupaffa1Props}= useContext(TotalContext) as TotalContextProps  
  const {disposal_details_text65909, setdisposal_details_text65909}= useContext(TotalContext) as TotalContextProps  
  const {disposal_methodd33dc, setdisposal_methodd33dc}= useContext(TotalContext) as TotalContextProps  
  const {disposal_date920f2, setdisposal_date920f2}= useContext(TotalContext) as TotalContextProps  
  const {disposal_ref075d5, setdisposal_ref075d5}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions1077f, setdynamicactions1077f}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions1077fProps, setdynamicactions1077fProps}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];


const handleUpdate = async(date: any) => {
  try{
  //setIsProcessing(true);
  setError('')
  setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,disposal_date:undefined}}));
  if (!date) {
    setdisposal_details_groupaffa1((prev: any) => ({ ...prev, disposal_date: null }));
    return;
  }
  const selectedDate = new Date(date);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET);
  const isoDate = indiaTime.toISOString();
  setdisposal_details_groupaffa1((prev: any) => ({ ...prev, disposal_date: isoDate }))
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
        "2cc91251b32d441abfbad386965affa1",
        "fe2d761ecfd7414598f31a6f132920f2"
      );
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
    codeStates['new_asset_group'] = new_asset_groupdb5a7,
    codeStates['setnew_asset_group'] = setnew_asset_groupdb5a7,
    codeStates['new_asset_groupdb5a7'] = new_asset_groupdb5a7Props,
    codeStates['setnew_asset_groupdb5a7'] = setnew_asset_groupdb5a7Props,
    codeStates['asset_info_group'] = asset_info_groupdeeeb,
    codeStates['setasset_info_group'] = setasset_info_groupdeeeb,
    codeStates['asset_info_groupdeeeb'] = asset_info_groupdeeebProps,
    codeStates['setasset_info_groupdeeeb'] = setasset_info_groupdeeebProps,
    codeStates['classification_group'] = classification_group3c6b3,
    codeStates['setclassification_group'] = setclassification_group3c6b3,
    codeStates['classification_group3c6b3'] = classification_group3c6b3Props,
    codeStates['setclassification_group3c6b3'] = setclassification_group3c6b3Props,
    codeStates['additional_details_group'] = additional_details_group8c616,
    codeStates['setadditional_details_group'] = setadditional_details_group8c616,
    codeStates['additional_details_group8c616'] = additional_details_group8c616Props,
    codeStates['setadditional_details_group8c616'] = setadditional_details_group8c616Props,
    codeStates['pyrchase_details_group'] = pyrchase_details_group76407,
    codeStates['setpyrchase_details_group'] = setpyrchase_details_group76407,
    codeStates['pyrchase_details_group76407'] = pyrchase_details_group76407Props,
    codeStates['setpyrchase_details_group76407'] = setpyrchase_details_group76407Props,
    codeStates['disposal_details_group'] = disposal_details_groupaffa1,
    codeStates['setdisposal_details_group'] = setdisposal_details_groupaffa1,
    codeStates['disposal_details_groupaffa1'] = disposal_details_groupaffa1Props,
    codeStates['setdisposal_details_groupaffa1'] = setdisposal_details_groupaffa1Props,
    codeStates['disposal_details_text'] = disposal_details_text65909,
    codeStates['setdisposal_details_text'] = setdisposal_details_text65909,
    codeStates['disposal_method'] = disposal_methodd33dc,
    codeStates['setdisposal_method'] = setdisposal_methodd33dc,
    codeStates['disposal_date'] = disposal_date920f2,
    codeStates['setdisposal_date'] = setdisposal_date920f2,
    codeStates['disposal_ref'] = disposal_ref075d5,
    codeStates['setdisposal_ref'] = setdisposal_ref075d5,
    codeStates['dynamicactions'] = dynamicactions1077f,
    codeStates['setdynamicactions'] = setdynamicactions1077f,
    codeStates['dynamicactions1077f'] = dynamicactions1077fProps,
    codeStates['setdynamicactions1077f'] = setdynamicactions1077fProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setdisposal_details_groupaffa1Props((pre:any)=>({...pre,validation:true}))
 },[disposal_date920f2?.refresh])

useEffect(()=>{
  handleBlur();
},[validateRefetch.value])

if (disposal_date920f2?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `9 / 17`,gridRow: `8 / 20`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!rounded-md"
      //label={keyset("")}
      value={disposal_details_groupaffa1?.disposal_date}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ false }
      readOnly=  {disposal_date920f2?.isDisabled ? true : false}
      disabled= {disposal_date920f2?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Disposal Date"
      dateValidation=""
      validationState={validate?.newAsset_v1?.disposal_date ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdisposal_date
