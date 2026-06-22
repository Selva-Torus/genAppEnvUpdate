

'use client'
import React, { useState,useContext,useEffect } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Text } from '@/components/Text';
import { Checkbox } from '@/components/Checkbox';
import {Modal} from '@/components/Modal';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';


const Checkboxis_critical = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, string>>({name:'is_critical',type:"text"});
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  let code:string='';
  const [allCode,setAllCode]=useState<any>("");
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {new_asset_groupdb5a7, setnew_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;  
  const {new_asset_groupdb5a7Props, setnew_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;  
  const {asset_info_groupdeeeb, setasset_info_groupdeeeb}= useContext(TotalContext) as TotalContextProps;  
  const {asset_info_groupdeeebProps, setasset_info_groupdeeebProps}= useContext(TotalContext) as TotalContextProps;  
  const {classification_group3c6b3, setclassification_group3c6b3}= useContext(TotalContext) as TotalContextProps;  
  const {classification_group3c6b3Props, setclassification_group3c6b3Props}= useContext(TotalContext) as TotalContextProps;  
  const {classification_text9bbdf, setclassification_text9bbdf}= useContext(TotalContext) as TotalContextProps;  
  const {classification8722b, setclassification8722b}= useContext(TotalContext) as TotalContextProps;  
  const {data_classification45708, setdata_classification45708}= useContext(TotalContext) as TotalContextProps;  
  const {ownership_type1a506, setownership_type1a506}= useContext(TotalContext) as TotalContextProps;  
  const {lifecycle_stage1446e, setlifecycle_stage1446e}= useContext(TotalContext) as TotalContextProps;  
  const {asset_condition414c5, setasset_condition414c5}= useContext(TotalContext) as TotalContextProps;  
  const {risk_levelf1e8c, setrisk_levelf1e8c}= useContext(TotalContext) as TotalContextProps;  
  const {is_critical0f006, setis_critical0f006}= useContext(TotalContext) as TotalContextProps;  
  const {additional_details_group8c616, setadditional_details_group8c616}= useContext(TotalContext) as TotalContextProps;  
  const {additional_details_group8c616Props, setadditional_details_group8c616Props}= useContext(TotalContext) as TotalContextProps;  
  const {pyrchase_details_group76407, setpyrchase_details_group76407}= useContext(TotalContext) as TotalContextProps;  
  const {pyrchase_details_group76407Props, setpyrchase_details_group76407Props}= useContext(TotalContext) as TotalContextProps;  
  const {disposal_details_groupaffa1, setdisposal_details_groupaffa1}= useContext(TotalContext) as TotalContextProps;  
  const {disposal_details_groupaffa1Props, setdisposal_details_groupaffa1Props}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactions1077f, setdynamicactions1077f}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactions1077fProps, setdynamicactions1077fProps}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "43f361b4c0a74138ba1001e580d3c6b3",
        "9a222c2d9d6c49228cf931ed5d70f006"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code);
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[is_critical0f006?.refresh])

  const handleChange=async(checked:boolean)=>{
    try{
    setIsProcessing(true);
    setclassification_group3c6b3((prev: any) => ({ ...prev, is_critical: checked}));
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }
  
  const handleBlur=async(e:any)=>{
    try{
    setIsProcessing(true);
    code = allCode;
    if (code != '') {
      let codeStates: any = {};
            codeStates['new_asset_group']  = new_asset_groupdb5a7;
            codeStates['setnew_asset_group'] = setnew_asset_groupdb5a7;
            codeStates['asset_info_group']  = asset_info_groupdeeeb;
            codeStates['setasset_info_group'] = setasset_info_groupdeeeb;
            codeStates['classification_group']  = classification_group3c6b3;
            codeStates['setclassification_group'] = setclassification_group3c6b3;
            codeStates['additional_details_group']  = additional_details_group8c616;
            codeStates['setadditional_details_group'] = setadditional_details_group8c616;
            codeStates['pyrchase_details_group']  = pyrchase_details_group76407;
            codeStates['setpyrchase_details_group'] = setpyrchase_details_group76407;
            codeStates['disposal_details_group']  = disposal_details_groupaffa1;
            codeStates['setdisposal_details_group'] = setdisposal_details_groupaffa1;
            codeStates['dynamicactions']  = dynamicactions1077f;
            codeStates['setdynamicactions'] = setdynamicactions1077f;
    codeExecution(code,codeStates);
    }
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }

  if (is_critical0f006?.isHidden) {
    return <></>;
  }
  return (
    <div 
       style={{gridColumn: `1 / 3`,gridRow: `34 / 40`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Checkbox 
      className=""
      value={classification_group3c6b3?.is_critical||false}
      checked={classification_group3c6b3?.is_critical||false}
      disabled= {is_critical0f006?.isDisabled ? true : false}
      content = {'IsCritical'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    </div>
  )
}

export default Checkboxis_critical;
