'use client'

import React, { useState, useContext, useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'
import { Switch } from '@/components/Switch'
import { Text } from '@/components/Text'
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { eventBus } from '@/app/eventBus';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import {Modal} from '@/components/Modal';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";

const Switchis_comment_enabled = ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  let customecode:string="";
  let ruleCode:any={};
  const {dfd_claims_v1Props, setdfd_claims_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [allCode,setAllCode]=useState<string>("");
  const toast : Function =useInfoMsg();
  const routes : AppRouterInstance = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const prevRefreshRef = useRef<any>(false);
 /////////////
   //another screen


  const {daily_approval_group69531, setdaily_approval_group69531}= useContext(TotalContext) as TotalContextProps;
  const {daily_approval_group69531Props, setdaily_approval_group69531Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expenses89868, setdaily_expenses89868}= useContext(TotalContext) as TotalContextProps;
  const {expense_name88ccc, setexpense_name88ccc}= useContext(TotalContext) as TotalContextProps;
  const {expense_datee8c94, setexpense_datee8c94}= useContext(TotalContext) as TotalContextProps;
  const {claim_category46dd0, setclaim_category46dd0}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amountcf2e2, setcategory_total_amountcf2e2}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image33fd1, setreceipt_image33fd1}= useContext(TotalContext) as TotalContextProps;
  const {comments9336d, setcomments9336d}= useContext(TotalContext) as TotalContextProps;
  const {manager_commentsd309a, setmanager_commentsd309a}= useContext(TotalContext) as TotalContextProps;
  const {enable666c8, setenable666c8}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enablede20a4, setis_comment_enablede20a4}= useContext(TotalContext) as TotalContextProps;
  const {reject28a4c, setreject28a4c}= useContext(TotalContext) as TotalContextProps;
  const {approve28765, setapprove28765}= useContext(TotalContext) as TotalContextProps;
  //////////////

  useEffect(() => {
    setdaily_approval_group69531((pre:any)=>({...pre,is_comment_enabled:null}));
  },[is_comment_enablede20a4?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_claims_v1Props) && dfd_claims_v1Props?.length == 1){
      setdaily_approval_group69531((pre:any)=>({...pre,is_comment_enabled:dfd_claims_v1Props[0]?.is_comment_enabled}));
    }
  },[dfd_claims_v1Props])

  const handleChange = async (checked: boolean) => {
    setdaily_approval_group69531((prev: any) => ({ ...prev, is_comment_enabled: checked }));
    let code:string= ``;
    if (code != '') {
      let codeStates: any = {}
            codeStates['Daily_Approval_Group']  = daily_approval_group69531,
            codeStates['setDaily_Approval_Group'] = setdaily_approval_group69531,
    codeExecution(code,codeStates)
    }
      setmanager_commentsd309a((prev: any) => ({ ...prev, isDisabled: checked ? false:true }))
  }

  async function handleConfirmOnChange(){
  } 
  if (is_comment_enablede20a4?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `20 / 24`,gridRow: `188 / 197`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        disabled= {is_comment_enablede20a4?.isDisabled ? true : false}
        checked={daily_approval_group69531?.is_comment_enabled || false} 
        onChange={handleChange}
      />
  </div>
  )
}
export default Switchis_comment_enabled
