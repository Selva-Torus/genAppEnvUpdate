

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react';
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


const Checkboxself_review_required_checkbox = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, string>>({name:'self_review_required',type:"text"});
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  let code:string='';
  const [allCode,setAllCode]=useState<any>("");
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {new_access_groupe9bce, setnew_access_groupe9bce}= useContext(TotalContext) as TotalContextProps;  
  const {new_access_groupe9bceProps, setnew_access_groupe9bceProps}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__groupbdb89, setaccess_req__groupbdb89}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__groupbdb89Props, setaccess_req__groupbdb89Props}= useContext(TotalContext) as TotalContextProps;  
  const {valid_group071c1, setvalid_group071c1}= useContext(TotalContext) as TotalContextProps;  
  const {valid_group071c1Props, setvalid_group071c1Props}= useContext(TotalContext) as TotalContextProps;  
  const {business_just__group04cc1, setbusiness_just__group04cc1}= useContext(TotalContext) as TotalContextProps;  
  const {business_just__group04cc1Props, setbusiness_just__group04cc1Props}= useContext(TotalContext) as TotalContextProps;  
  const {review_participantse8f41, setreview_participantse8f41}= useContext(TotalContext) as TotalContextProps;  
  const {self_review_required_checkboxb0905, setself_review_required_checkboxb0905}= useContext(TotalContext) as TotalContextProps;  
  const {manager_review_required_checkbox2a721, setmanager_review_required_checkbox2a721}= useContext(TotalContext) as TotalContextProps;  
  const {addt__group284f6, setaddt__group284f6}= useContext(TotalContext) as TotalContextProps;  
  const {addt__group284f6Props, setaddt__group284f6Props}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactionsd94d3, setdynamicactionsd94d3}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactionsd94d3Props, setdynamicactionsd94d3Props}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "4a5eedd44a2568e5f28d16fec7d04cc1",
        "32b608574b854b8b9b96864b3eeb0905"
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
  },[self_review_required_checkboxb0905?.refresh])

  useEffect(()=>{
    if (business_just__group04cc1?.self_review_required === undefined) {
      setbusiness_just__group04cc1((prev: any) => ({ ...prev, self_review_required: true }));
    }
  },[])


  const handleChange=async(checked:boolean)=>{
    try{
    setIsProcessing(true);
    setbusiness_just__group04cc1((prev: any) => ({ ...prev, self_review_required: checked}));
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
            codeStates['new_access_group']  = new_access_groupe9bce;
            codeStates['setnew_access_group'] = setnew_access_groupe9bce;
            codeStates['access_req__group']  = access_req__groupbdb89;
            codeStates['setaccess_req__group'] = setaccess_req__groupbdb89;
            codeStates['valid_group']  = valid_group071c1;
            codeStates['setvalid_group'] = setvalid_group071c1;
            codeStates['business_just__group']  = business_just__group04cc1;
            codeStates['setbusiness_just__group'] = setbusiness_just__group04cc1;
            codeStates['addt__group']  = addt__group284f6;
            codeStates['setaddt__group'] = setaddt__group284f6;
            codeStates['dynamicactions']  = dynamicactionsd94d3;
            codeStates['setdynamicactions'] = setdynamicactionsd94d3;
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

  if (self_review_required_checkboxb0905?.isHidden) {
    return <></>;
  }
  return (
    <div 
       style={{gridColumn: `1 / 11`,gridRow: `11 / 17`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Checkbox 
      className=""
      value={business_just__group04cc1?.self_review_required||false}
      checked={business_just__group04cc1?.self_review_required||true}
      disabled= {self_review_required_checkboxb0905?.isDisabled ? true : false}
      content = {'Self Review Required'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    </div>
  )
}

export default Checkboxself_review_required_checkbox;
