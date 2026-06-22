

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


const DatePickerwarranty_expiry = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const {purchase_details_textf2780, setpurchase_details_textf2780}= useContext(TotalContext) as TotalContextProps  
  const {vendor_name4190d, setvendor_name4190d}= useContext(TotalContext) as TotalContextProps  
  const {purchase_costff91e, setpurchase_costff91e}= useContext(TotalContext) as TotalContextProps  
  const {currency823ac, setcurrency823ac}= useContext(TotalContext) as TotalContextProps  
  const {purchase_datec1162, setpurchase_datec1162}= useContext(TotalContext) as TotalContextProps  
  const {warranty_expiry1fdec, setwarranty_expiry1fdec}= useContext(TotalContext) as TotalContextProps  
  const {current_value8f6cd, setcurrent_value8f6cd}= useContext(TotalContext) as TotalContextProps  
  const {depreciation_rate8d4a6, setdepreciation_rate8d4a6}= useContext(TotalContext) as TotalContextProps  
  const {salvage_valuef1995, setsalvage_valuef1995}= useContext(TotalContext) as TotalContextProps  
  const {disposal_details_groupaffa1, setdisposal_details_groupaffa1}= useContext(TotalContext) as TotalContextProps  
  const {disposal_details_groupaffa1Props, setdisposal_details_groupaffa1Props}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions1077f, setdynamicactions1077f}= useContext(TotalContext) as TotalContextProps  
  const {dynamicactions1077fProps, setdynamicactions1077fProps}= useContext(TotalContext) as TotalContextProps  
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
    setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,warranty_expiry: "invalid"}}))
    setpyrchase_details_group76407((prev: any) => ({ ...prev, warranty_expiry: "" }))
    return;
  }
  setError('')
  setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,warranty_expiry:undefined}}));
  if (!date) {
    setpyrchase_details_group76407((prev: any) => ({ ...prev, warranty_expiry: null }));
    return;
  }
  const selectedDate = new Date(date);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET);
  const isoDate = indiaTime.toISOString();
  setpyrchase_details_group76407((prev: any) => ({ ...prev, warranty_expiry: isoDate }))
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
      if(pyrchase_details_group76407?.warranty_expiry == "" || pyrchase_details_group76407?.warranty_expiry == undefined){
        const result = v.safeParse(schema, pyrchase_details_group76407?.warranty_expiry || '');
      if (!result.success) {
        const errorMsg = result.issues[0]?.message || 'Date is required';
        setError(errorMsg);
            setValidate((pre:any)=>({...pre,newAsset_v1:{...pre?.newAsset_v1,warranty_expiry: "invalid"}}));
        return;
      }
      }
    let code:any;
    const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "ee1d91659fbf473bb30f690c00976407",
        "a284d72d5bd1450884da73f62541fdec"
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
    codeStates['purchase_details_text'] = purchase_details_textf2780,
    codeStates['setpurchase_details_text'] = setpurchase_details_textf2780,
    codeStates['vendor_name'] = vendor_name4190d,
    codeStates['setvendor_name'] = setvendor_name4190d,
    codeStates['purchase_cost'] = purchase_costff91e,
    codeStates['setpurchase_cost'] = setpurchase_costff91e,
    codeStates['currency'] = currency823ac,
    codeStates['setcurrency'] = setcurrency823ac,
    codeStates['purchase_date'] = purchase_datec1162,
    codeStates['setpurchase_date'] = setpurchase_datec1162,
    codeStates['warranty_expiry'] = warranty_expiry1fdec,
    codeStates['setwarranty_expiry'] = setwarranty_expiry1fdec,
    codeStates['current_value'] = current_value8f6cd,
    codeStates['setcurrent_value'] = setcurrent_value8f6cd,
    codeStates['depreciation_rate'] = depreciation_rate8d4a6,
    codeStates['setdepreciation_rate'] = setdepreciation_rate8d4a6,
    codeStates['salvage_value'] = salvage_valuef1995,
    codeStates['setsalvage_value'] = setsalvage_valuef1995,
    codeStates['disposal_details_group'] = disposal_details_groupaffa1,
    codeStates['setdisposal_details_group'] = setdisposal_details_groupaffa1,
    codeStates['disposal_details_groupaffa1'] = disposal_details_groupaffa1Props,
    codeStates['setdisposal_details_groupaffa1'] = setdisposal_details_groupaffa1Props,
    codeStates['dynamicactions'] = dynamicactions1077f,
    codeStates['setdynamicactions'] = setdynamicactions1077f,
    codeStates['dynamicactions1077f'] = dynamicactions1077fProps,
    codeStates['setdynamicactions1077f'] = setdynamicactions1077fProps,
    codeStates['toast'] = toast;
    codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setpyrchase_details_group76407Props((pre:any)=>({...pre,validation:true,required:true}))
 },[warranty_expiry1fdec?.refresh])

useEffect(()=>{
  if(!pyrchase_details_group76407?.warranty_expiry){ 
    setpyrchase_details_group76407Props((pre:any)=>({...pre,required:true}));
    setIsRequiredData(true);
  }
  if(validateRefetch.init!=0)
    handleBlur();
},[validateRefetch.value])

if (warranty_expiry1fdec?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `9 / 17`,gridRow: `21 / 33`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className="!rounded-md"
      //label={keyset("")}
      value={pyrchase_details_group76407?.warranty_expiry}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      required={ true }
      readOnly=  {warranty_expiry1fdec?.isDisabled ? true : false}
      disabled= {warranty_expiry1fdec?.isDisabled ? true : false}
      contentAlign={"center"}
      headerPosition='top'
      headerText="Warranty Expiry"
      dateValidation=""
      validationState={validate?.newAsset_v1?.warranty_expiry ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerwarranty_expiry
