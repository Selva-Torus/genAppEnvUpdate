
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

const Switchis_comment_enabled = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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


  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps;
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense4be82, setoffsite_expense4be82}= useContext(TotalContext) as TotalContextProps;
  const {expense_name084c7, setexpense_name084c7}= useContext(TotalContext) as TotalContextProps;
  const {email070ac, setemail070ac}= useContext(TotalContext) as TotalContextProps;
  const {from_dateb920f, setfrom_dateb920f}= useContext(TotalContext) as TotalContextProps;
  const {to_date5ca82, setto_date5ca82}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryac401, setclaim_categoryac401}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amountdd7c0, setcategory_total_amountdd7c0}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image3a832, setreceipt_image3a832}= useContext(TotalContext) as TotalContextProps;
  const {commentse0ef7, setcommentse0ef7}= useContext(TotalContext) as TotalContextProps;
  const {manager_comments4bec2, setmanager_comments4bec2}= useContext(TotalContext) as TotalContextProps;
  const {enabled5c19, setenabled5c19}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabledf9731, setis_comment_enabledf9731}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835f, setclaim_detail_table1835f}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835fProps, setclaim_detail_table1835fProps}= useContext(TotalContext) as TotalContextProps;
  const {reject74228, setreject74228}= useContext(TotalContext) as TotalContextProps;
  const {approve098ea, setapprove098ea}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "279c2b7585c947c9abdc712d6a18d6cc",
      "880ad7348ce24e438f34199772af9731"
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
      setoffsite_approval_group8d6cc((pre:any)=>({...pre,is_comment_enabled:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[is_comment_enabledf9731?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_claims_v1Props) && dfd_claims_v1Props?.length == 1){
      setoffsite_approval_group8d6cc((pre:any)=>({...pre,is_comment_enabled:dfd_claims_v1Props[0]?.is_comment_enabled}))
    }
  },[dfd_claims_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setoffsite_approval_group8d6cc((prev: any) => ({ ...prev, is_comment_enabled: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['offsite_approval_group'] = offsite_approval_group8d6cc,
        codeStates['setoffsite_approval_group'] = setoffsite_approval_group8d6cc,
        codeStates['offsite_approval_group8d6cc'] = offsite_approval_group8d6ccProps,
        codeStates['setoffsite_approval_group8d6cc'] = setoffsite_approval_group8d6ccProps,
        codeStates['offsite_expense'] = offsite_expense4be82,
        codeStates['setoffsite_expense'] = setoffsite_expense4be82,
        codeStates['expense_name'] = expense_name084c7,
        codeStates['setexpense_name'] = setexpense_name084c7,
        codeStates['email'] = email070ac,
        codeStates['setemail'] = setemail070ac,
        codeStates['from_date'] = from_dateb920f,
        codeStates['setfrom_date'] = setfrom_dateb920f,
        codeStates['to_date'] = to_date5ca82,
        codeStates['setto_date'] = setto_date5ca82,
        codeStates['claim_category'] = claim_categoryac401,
        codeStates['setclaim_category'] = setclaim_categoryac401,
        codeStates['category_total_amount'] = category_total_amountdd7c0,
        codeStates['setcategory_total_amount'] = setcategory_total_amountdd7c0,
        codeStates['receipt_image'] = receipt_image3a832,
        codeStates['setreceipt_image'] = setreceipt_image3a832,
        codeStates['comments'] = commentse0ef7,
        codeStates['setcomments'] = setcommentse0ef7,
        codeStates['manager_comments'] = manager_comments4bec2,
        codeStates['setmanager_comments'] = setmanager_comments4bec2,
        codeStates['enable'] = enabled5c19,
        codeStates['setenable'] = setenabled5c19,
        codeStates['is_comment_enabled'] = is_comment_enabledf9731,
        codeStates['setis_comment_enabled'] = setis_comment_enabledf9731,
        codeStates['claim_detail_table'] = claim_detail_table1835f,
        codeStates['setclaim_detail_table'] = setclaim_detail_table1835f,
        codeStates['claim_detail_table1835f'] = claim_detail_table1835fProps,
        codeStates['setclaim_detail_table1835f'] = setclaim_detail_table1835fProps,
        codeStates['reject'] = reject74228,
        codeStates['setreject'] = setreject74228,
        codeStates['approve'] = approve098ea,
        codeStates['setapprove'] = setapprove098ea,
    codeExecution(code,codeStates)
    }
    let presentRule:any=ruleCode?.nodes || comingRule
      //enableElement
      setmanager_comments4bec2((prev: any) => ({ ...prev, isDisabled: false }))
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
  if (is_comment_enabledf9731?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `20 / 22`,gridRow: `247 / 256`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        contentAlign={"left"}
        disabled= {is_comment_enabledf9731?.isDisabled ? true : false}
        checked={offsite_approval_group8d6cc?.is_comment_enabled || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchis_comment_enabled



