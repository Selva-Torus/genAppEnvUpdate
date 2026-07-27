

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
  const {new_access_groupc1763, setnew_access_groupc1763}= useContext(TotalContext) as TotalContextProps;  
  const {new_access_groupc1763Props, setnew_access_groupc1763Props}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__group70ea9, setaccess_req__group70ea9}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__group70ea9Props, setaccess_req__group70ea9Props}= useContext(TotalContext) as TotalContextProps;  
  const {valid_group35ad5, setvalid_group35ad5}= useContext(TotalContext) as TotalContextProps;  
  const {valid_group35ad5Props, setvalid_group35ad5Props}= useContext(TotalContext) as TotalContextProps;  
  const {business_just__group2db99, setbusiness_just__group2db99}= useContext(TotalContext) as TotalContextProps;  
  const {business_just__group2db99Props, setbusiness_just__group2db99Props}= useContext(TotalContext) as TotalContextProps;  
  const {review_participantsb83fd, setreview_participantsb83fd}= useContext(TotalContext) as TotalContextProps;  
  const {self_review_required_checkbox5a969, setself_review_required_checkbox5a969}= useContext(TotalContext) as TotalContextProps;  
  const {manager_review_required_checkbox1f25f, setmanager_review_required_checkbox1f25f}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "2a9eff2e2bb204892ef74af8c6d2db99",
        "fe54019e1751e9c577c61fe09545a969"
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
  },[self_review_required_checkbox5a969?.refresh])

  useEffect(()=>{
    if (business_just__group2db99?.self_review_required === undefined) {
      setbusiness_just__group2db99((prev: any) => ({ ...prev, self_review_required: true }));
    }
  },[])


  const handleChange=async(checked:boolean)=>{
    try{
    setIsProcessing(true);
    setbusiness_just__group2db99((prev: any) => ({ ...prev, self_review_required: checked}));
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
            codeStates['new_access_group']  = new_access_groupc1763;
            codeStates['setnew_access_group'] = setnew_access_groupc1763;
            codeStates['access_req__group']  = access_req__group70ea9;
            codeStates['setaccess_req__group'] = setaccess_req__group70ea9;
            codeStates['valid_group']  = valid_group35ad5;
            codeStates['setvalid_group'] = setvalid_group35ad5;
            codeStates['business_just__group']  = business_just__group2db99;
            codeStates['setbusiness_just__group'] = setbusiness_just__group2db99;
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

  if (self_review_required_checkbox5a969?.isHidden) {
    return <></>;
  }
  return (
    <div 
       style={{gridColumn: `1 / 11`,gridRow: `10 / 16`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Checkbox 
      className=""
      value={business_just__group2db99?.self_review_required||false}
      checked={business_just__group2db99?.self_review_required||true}
      disabled= {self_review_required_checkbox5a969?.isDisabled ? true : false}
      content = {'Self Review Required'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    </div>
  )
}

export default Checkboxself_review_required_checkbox;
