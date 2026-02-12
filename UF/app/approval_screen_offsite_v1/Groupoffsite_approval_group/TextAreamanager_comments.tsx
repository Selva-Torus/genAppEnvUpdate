
'use client'
import React, { useState,useContext,useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Text } from "@/components/Text";
import { TextArea } from '@/components/TextArea';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";


const TextAreamanager_comments = ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any) => {
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  let code:string="";
  const prevRefreshRef = useRef<any>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'manager_comments',type:"text"});
  const [allCode,setAllCode]=useState<string>("");
  const toast : Function =useInfoMsg();
  const routes : AppRouterInstance = useRouter();
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

  useEffect(()=>{
    if (prevRefreshRef.current) {
      setoffsite_approval_group8d6cc((pre:any)=>({...pre,manager_comments:""}))
    }else 
      prevRefreshRef.current= true
  },[manager_comments4bec2?.refresh])

  const handleBlur=async(e:any)=>{
    if (code != '') {
      let codeStates: any = {};
      codeStates['offsite_approval_group']  = offsite_approval_group8d6cc,
      codeStates['setoffsite_approval_group'] = setoffsite_approval_group8d6cc,
      codeStates['claim_detail_table']  = claim_detail_table1835f,
      codeStates['setclaim_detail_table'] = setclaim_detail_table1835f,
    codeExecution(code,codeStates);
    }
  }
  const handleChange = async(e: any) => {
    if(dynamicStateandType.type=="number"){
      setoffsite_approval_group8d6cc((prev: any) => ({ ...prev, manager_comments: +e?.target?.value }));
    }
    else{
      setoffsite_approval_group8d6cc((prev: any) => ({ ...prev, manager_comments: e?.target?.value }));
    }
  }
  const handleFocus=async(e:any)=>{
  }
  if (manager_comments4bec2?.isHidden) {
    return <></>
  }
return (
  <div 
    className="top " 
  style={{gridColumn: `2 / 19`,gridRow: `201 / 220`, gap:``, height: `100%`}} >
    <TextArea
      className=""
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {manager_comments4bec2?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Manager Response"
      pin = {'brick-brick'}
      value = { offsite_approval_group8d6cc?.manager_comments != null && typeof offsite_approval_group8d6cc?.manager_comments =='object' ? Object.keys(offsite_approval_group8d6cc?.manager_comments)?.length ?  JSON.stringify(offsite_approval_group8d6cc?.manager_comments,null ,2):"" : offsite_approval_group8d6cc?.manager_comments||""}
    />
  </div>
  )
}

export default TextAreamanager_comments
