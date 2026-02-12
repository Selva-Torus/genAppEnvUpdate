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


  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps;
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense4be82, setoffsite_expense4be82}= useContext(TotalContext) as TotalContextProps;
  const {expense_name084c7, setexpense_name084c7}= useContext(TotalContext) as TotalContextProps;
  const {from_dated8c1b, setfrom_dated8c1b}= useContext(TotalContext) as TotalContextProps;
  const {to_date0c15a, setto_date0c15a}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryac401, setclaim_categoryac401}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amountdd7c0, setcategory_total_amountdd7c0}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image3968d, setreceipt_image3968d}= useContext(TotalContext) as TotalContextProps;
  const {commentse0ef7, setcommentse0ef7}= useContext(TotalContext) as TotalContextProps;
  const {manager_comments4bec2, setmanager_comments4bec2}= useContext(TotalContext) as TotalContextProps;
  const {enabled5c19, setenabled5c19}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabledf9731, setis_comment_enabledf9731}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835f, setclaim_detail_table1835f}= useContext(TotalContext) as TotalContextProps;
  const {claim_detail_table1835fProps, setclaim_detail_table1835fProps}= useContext(TotalContext) as TotalContextProps;
  const {reject74228, setreject74228}= useContext(TotalContext) as TotalContextProps;
  const {approve098ea, setapprove098ea}= useContext(TotalContext) as TotalContextProps;
  //////////////

  useEffect(() => {
    setoffsite_approval_group8d6cc((pre:any)=>({...pre,is_comment_enabled:null}));
  },[is_comment_enabledf9731?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_claims_v1Props) && dfd_claims_v1Props?.length == 1){
      setoffsite_approval_group8d6cc((pre:any)=>({...pre,is_comment_enabled:dfd_claims_v1Props[0]?.is_comment_enabled}));
    }
  },[dfd_claims_v1Props])

  const handleChange = async (checked: boolean) => {
    setoffsite_approval_group8d6cc((prev: any) => ({ ...prev, is_comment_enabled: checked }));
    let code:string= ``;
    if (code != '') {
      let codeStates: any = {}
            codeStates['offsite_approval_group']  = offsite_approval_group8d6cc,
            codeStates['setoffsite_approval_group'] = setoffsite_approval_group8d6cc,
            codeStates['claim_detail_table']  = claim_detail_table1835f,
            codeStates['setclaim_detail_table'] = setclaim_detail_table1835f,
    codeExecution(code,codeStates)
    }
      setmanager_comments4bec2((prev: any) => ({ ...prev, isDisabled: checked ? false:true }))
  }

  async function handleConfirmOnChange(){
  } 
  if (is_comment_enabledf9731?.isHidden) {
    return <></>
  }
  return (
    <div 
      className=""
      style={{gridColumn: `19 / 22`,gridRow: `211 / 220`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        disabled= {is_comment_enabledf9731?.isDisabled ? true : false}
        checked={offsite_approval_group8d6cc?.is_comment_enabled || false} 
        onChange={handleChange}
      />
  </div>
  )
}
export default Switchis_comment_enabled
