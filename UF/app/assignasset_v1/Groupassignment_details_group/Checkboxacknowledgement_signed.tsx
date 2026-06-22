

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


const Checkboxacknowledgement_signed = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, string>>({name:'acknowledgement_signed',type:"text"});
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  let code:string='';
  const [allCode,setAllCode]=useState<any>("");
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {assign_asset_groupdb5a7, setassign_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;  
  const {assign_asset_groupdb5a7Props, setassign_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;  
  const {assignment_information_group5d144, setassignment_information_group5d144}= useContext(TotalContext) as TotalContextProps;  
  const {assignment_information_group5d144Props, setassignment_information_group5d144Props}= useContext(TotalContext) as TotalContextProps;  
  const {assignment_details_group7f60d, setassignment_details_group7f60d}= useContext(TotalContext) as TotalContextProps;  
  const {assignment_details_group7f60dProps, setassignment_details_group7f60dProps}= useContext(TotalContext) as TotalContextProps;  
  const {assignment_details_textb98b6, setassignment_details_textb98b6}= useContext(TotalContext) as TotalContextProps;  
  const {actual_return_date06574, setactual_return_date06574}= useContext(TotalContext) as TotalContextProps;  
  const {returned_atb4ccc, setreturned_atb4ccc}= useContext(TotalContext) as TotalContextProps;  
  const {condition_at_return40b7c, setcondition_at_return40b7c}= useContext(TotalContext) as TotalContextProps;  
  const {approved_by8c220, setapproved_by8c220}= useContext(TotalContext) as TotalContextProps;  
  const {approval_statuseb2b2, setapproval_statuseb2b2}= useContext(TotalContext) as TotalContextProps;  
  const {assignment_notese758f, setassignment_notese758f}= useContext(TotalContext) as TotalContextProps;  
  const {acknowledgement_signedfdaee, setacknowledgement_signedfdaee}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactions956ba, setdynamicactions956ba}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactions956baProps, setdynamicactions956baProps}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "71dc0557a5ad48bd8bc18a025737f60d",
        "f38bc8b3cb134522afeea1038f1fdaee"
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
  },[acknowledgement_signedfdaee?.refresh])

  const handleChange=async(checked:boolean)=>{
    try{
    setIsProcessing(true);
    setassignment_details_group7f60d((prev: any) => ({ ...prev, acknowledgement_signed: checked}));
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
            codeStates['assign_asset_group']  = assign_asset_groupdb5a7;
            codeStates['setassign_asset_group'] = setassign_asset_groupdb5a7;
            codeStates['assignment_information_group']  = assignment_information_group5d144;
            codeStates['setassignment_information_group'] = setassignment_information_group5d144;
            codeStates['assignment_details_group']  = assignment_details_group7f60d;
            codeStates['setassignment_details_group'] = setassignment_details_group7f60d;
            codeStates['dynamicactions']  = dynamicactions956ba;
            codeStates['setdynamicactions'] = setdynamicactions956ba;
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

  if (acknowledgement_signedfdaee?.isHidden) {
    return <></>;
  }
  return (
    <div 
       style={{gridColumn: `1 / 6`,gridRow: `39 / 46`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Checkbox 
      className=""
      value={assignment_details_group7f60d?.acknowledgement_signed||false}
      checked={assignment_details_group7f60d?.acknowledgement_signed||false}
      disabled= {acknowledgement_signedfdaee?.isDisabled ? true : false}
      content = {'Acknowledgement Signed'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    </div>
  )
}

export default Checkboxacknowledgement_signed;
