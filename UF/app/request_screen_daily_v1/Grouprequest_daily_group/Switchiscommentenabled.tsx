
'use client'
import React, { useState, useContext, useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies } from '@/app/components/cookieMgment'
import { useGlobal } from '@/context/GlobalContext'
import { Switch } from '@/components/Switch'
import { Text } from '@/components/Text'
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { eventBus } from '@/app/eventBus';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import {Modal} from '@/components/Modal';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import UOmapperData from '@/context/dfdmapperContolnames.json';

const Switchiscommentenabled = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const {dfd_claims_v1Props, setdfd_claims_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [allCode,setAllCode] = useState<string>("");
  const [ruleCode,setRuleCode] = useState<any>("");
  const toast : Function = useInfoMsg();
  const routes : AppRouterInstance = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const prevRefreshRef = useRef<any>(false);
 /////////////
   //another screen




  const {request_daily_group44e40, setrequest_daily_group44e40}= useContext(TotalContext) as TotalContextProps;
  const {request_daily_group44e40Props, setrequest_daily_group44e40Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expensefb8cc, setdaily_expensefb8cc}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type22d67, setclaim_expense_type22d67}= useContext(TotalContext) as TotalContextProps;
  const {expense_name5f562, setexpense_name5f562}= useContext(TotalContext) as TotalContextProps;
  const {emailaf076, setemailaf076}= useContext(TotalContext) as TotalContextProps;
  const {expense_date92269, setexpense_date92269}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryf1fb6, setclaim_categoryf1fb6}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount9782f, setcategory_total_amount9782f}= useContext(TotalContext) as TotalContextProps;
  const {attachment04414, setattachment04414}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image6afe2, setreceipt_image6afe2}= useContext(TotalContext) as TotalContextProps;
  const {enabletextb4878, setenabletextb4878}= useContext(TotalContext) as TotalContextProps;
  const {commentsf2394, setcommentsf2394}= useContext(TotalContext) as TotalContextProps;
  const {iscommentenabled7244d, setiscommentenabled7244d}= useContext(TotalContext) as TotalContextProps;
  const {clear14ae7, setclear14ae7}= useContext(TotalContext) as TotalContextProps;
  const {saved507e, setsaved507e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "483e1dce061b49cebe0c9e46b0844e40",
      "62b96816535b41e18678c08e44e7244d"
    );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code)
      setRuleCode(orchestrationData?.data?.rule)
    }catch(err)
    {
      console.log(err)
    }
  }

  useEffect(() => {
    if(prevRefreshRef.current)
      setrequest_daily_group44e40((pre:any)=>({...pre,is_comment_enabled:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[iscommentenabled7244d?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_claims_v1Props) && dfd_claims_v1Props?.length == 1){
      setrequest_daily_group44e40((pre:any)=>({...pre,is_comment_enabled:dfd_claims_v1Props[0]?.is_comment_enabled}))
    }
  },[dfd_claims_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setrequest_daily_group44e40((prev: any) => ({ ...prev, is_comment_enabled: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['request_daily_group'] = request_daily_group44e40,
        codeStates['setrequest_daily_group'] = setrequest_daily_group44e40,
        codeStates['request_daily_group44e40'] = request_daily_group44e40Props,
        codeStates['setrequest_daily_group44e40'] = setrequest_daily_group44e40Props,
        codeStates['daily_expense'] = daily_expensefb8cc,
        codeStates['setdaily_expense'] = setdaily_expensefb8cc,
        codeStates['claim_expense_type'] = claim_expense_type22d67,
        codeStates['setclaim_expense_type'] = setclaim_expense_type22d67,
        codeStates['expense_name'] = expense_name5f562,
        codeStates['setexpense_name'] = setexpense_name5f562,
        codeStates['email'] = emailaf076,
        codeStates['setemail'] = setemailaf076,
        codeStates['expense_date'] = expense_date92269,
        codeStates['setexpense_date'] = setexpense_date92269,
        codeStates['claim_category'] = claim_categoryf1fb6,
        codeStates['setclaim_category'] = setclaim_categoryf1fb6,
        codeStates['category_total_amount'] = category_total_amount9782f,
        codeStates['setcategory_total_amount'] = setcategory_total_amount9782f,
        codeStates['attachment'] = attachment04414,
        codeStates['setattachment'] = setattachment04414,
        codeStates['receipt_image'] = receipt_image6afe2,
        codeStates['setreceipt_image'] = setreceipt_image6afe2,
        codeStates['enabletext'] = enabletextb4878,
        codeStates['setenabletext'] = setenabletextb4878,
        codeStates['comments'] = commentsf2394,
        codeStates['setcomments'] = setcommentsf2394,
        codeStates['iscommentenabled'] = iscommentenabled7244d,
        codeStates['setiscommentenabled'] = setiscommentenabled7244d,
        codeStates['clear'] = clear14ae7,
        codeStates['setclear'] = setclear14ae7,
        codeStates['save'] = saved507e,
        codeStates['setsave'] = setsaved507e,
    codeExecution(code,codeStates)
    }
    let presentRule:any=ruleCode?.nodes || comingRule
      //enableElement
    if (String(checked) === "true") {
      setcommentsf2394((prev: any) => ({ ...prev, isDisabled: false }))
    }
      //disableElement
    if (String(checked) === "false") {
      setcommentsf2394((prev: any) => ({ ...prev, isDisabled: true }))
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

  async function handleConfirmOnChange(){
  } 
  if (iscommentenabled7244d?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `18 / 20`,gridRow: `159 / 166`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        disabled= {iscommentenabled7244d?.isDisabled ? true : false}
        checked={request_daily_group44e40?.is_comment_enabled || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchiscommentenabled



