
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

const Switchswitch = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const {dfd_claims_dfd_v1Props, setdfd_claims_dfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(  
      controlData,
      "5a69b1d62572431ab2933ca7cf0571d2",
      "f38b4d31dec14814aad1b71e6907e8ff"
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
      setgroup571d2((pre:any)=>({...pre,is_comment_enabled:null}))
    else
      prevRefreshRef.current=true
    handleMapperValue()
  },[switch7e8ff?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_claims_dfd_v1Props) && dfd_claims_dfd_v1Props?.length == 1){
      setgroup571d2((pre:any)=>({...pre,is_comment_enabled:dfd_claims_dfd_v1Props[0]?.is_comment_enabled}))
    }
  },[dfd_claims_dfd_v1Props])
  const handleChange = async (checked: boolean,comingRule:any={}) => {
    try{
    setIsProcessing(true);
    setgroup571d2((prev: any) => ({ ...prev, is_comment_enabled: checked }));
    let code:string= allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group571d2,
        codeStates['setgroup'] = setgroup571d2,
        codeStates['group571d2'] = group571d2Props,
        codeStates['setgroup571d2'] = setgroup571d2Props,
        codeStates['dailyexpense'] = dailyexpense64a4c,
        codeStates['setdailyexpense'] = setdailyexpense64a4c,
        codeStates['expense_name'] = expense_name136a1,
        codeStates['setexpense_name'] = setexpense_name136a1,
        codeStates['expense_date'] = expense_date7e93b,
        codeStates['setexpense_date'] = setexpense_date7e93b,
        codeStates['claim_category'] = claim_categoryf1c64,
        codeStates['setclaim_category'] = setclaim_categoryf1c64,
        codeStates['category_total_amount'] = category_total_amount395dd,
        codeStates['setcategory_total_amount'] = setcategory_total_amount395dd,
        codeStates['receipt_image'] = receipt_imageb2aec,
        codeStates['setreceipt_image'] = setreceipt_imageb2aec,
        codeStates['comments'] = commentse3b5b,
        codeStates['setcomments'] = setcommentse3b5b,
        codeStates['group_two'] = group_two6135c,
        codeStates['setgroup_two'] = setgroup_two6135c,
        codeStates['group_two6135c'] = group_two6135cProps,
        codeStates['setgroup_two6135c'] = setgroup_two6135cProps,
        codeStates['switch'] = switch7e8ff,
        codeStates['setswitch'] = setswitch7e8ff,
        codeStates['checkbox'] = checkbox53e8f,
        codeStates['setcheckbox'] = setcheckbox53e8f,
    codeExecution(code,codeStates)
    }
    let presentRule:any=ruleCode?.nodes || comingRule
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

  if (switch7e8ff?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `17 / 21`,gridRow: `142 / 154`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        disabled= {switch7e8ff?.isDisabled ? true : false}
        content="switch"
        checked={group571d2?.is_comment_enabled || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchswitch



