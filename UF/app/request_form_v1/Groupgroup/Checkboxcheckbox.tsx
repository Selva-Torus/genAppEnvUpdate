

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment';
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
import { useGlobal } from '@/context/GlobalContext'


const Checkboxcheckbox = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, string>>({name:'manager_comments',type:"text"});
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  let code:string='';
  const [allCode,setAllCode]=useState<any>("");
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {group571d2, setgroup571d2}= useContext(TotalContext) as TotalContextProps;  
  const {group571d2Props, setgroup571d2Props}= useContext(TotalContext) as TotalContextProps;  
  const {dailyexpense64a4c, setdailyexpense64a4c}= useContext(TotalContext) as TotalContextProps;  
  const {expense_name136a1, setexpense_name136a1}= useContext(TotalContext) as TotalContextProps;  
  const {expense_date7e93b, setexpense_date7e93b}= useContext(TotalContext) as TotalContextProps;  
  const {claim_categoryf1c64, setclaim_categoryf1c64}= useContext(TotalContext) as TotalContextProps;  
  const {category_total_amount395dd, setcategory_total_amount395dd}= useContext(TotalContext) as TotalContextProps;  
  const {receipt_imageb2aec, setreceipt_imageb2aec}= useContext(TotalContext) as TotalContextProps;  
  const {commentse3b5b, setcommentse3b5b}= useContext(TotalContext) as TotalContextProps;  
  const {group_two6135c, setgroup_two6135c}= useContext(TotalContext) as TotalContextProps;  
  const {group_two6135cProps, setgroup_two6135cProps}= useContext(TotalContext) as TotalContextProps;  
  const {switch7e8ff, setswitch7e8ff}= useContext(TotalContext) as TotalContextProps;  
  const {checkbox53e8f, setcheckbox53e8f}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "5a69b1d62572431ab2933ca7cf0571d2",
        "d5af046577914a0bbb51c9b79b653e8f"
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
  },[checkbox53e8f?.refresh])

  useEffect(()=>{
    if (group571d2?.manager_comments === undefined) {
      setgroup571d2((prev: any) => ({ ...prev, manager_comments: false }));
    }
  },[])


  const handleChange=async(checked:boolean)=>{
    try{
    setIsProcessing(true);
    setgroup571d2((prev: any) => ({ ...prev, manager_comments: checked}));
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
            codeStates['group']  = group571d2;
            codeStates['setgroup'] = setgroup571d2;
            codeStates['group_two']  = group_two6135c;
            codeStates['setgroup_two'] = setgroup_two6135c;
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

  if (checkbox53e8f?.isHidden) {
    return <></>;
  }
  return (
    <div 
       style={{gridColumn: `5 / 9`,gridRow: `143 / 162`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Checkbox 
      className=""
      value={group571d2?.manager_comments||false}
      contentAlign={"center"}
      checked={group571d2?.manager_comments||false}
      disabled= {checkbox53e8f?.isDisabled ? true : false}
      content = {'checkbox'}
      headerPosition='top'
      headerText="checkbox"
      onChange={handleChange}
      onBlur={handleBlur}
    />
    </div>
  )
}

export default Checkboxcheckbox;
