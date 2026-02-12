
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

  useEffect(()=>{
    if (prevRefreshRef.current) {
      setdaily_approval_group69531((pre:any)=>({...pre,manager_comments:""}))
    }else 
      prevRefreshRef.current= true
  },[manager_commentsd309a?.refresh])

  const handleBlur=async(e:any)=>{
    if (code != '') {
      let codeStates: any = {};
      codeStates['daily_approval_group']  = daily_approval_group69531,
      codeStates['setdaily_approval_group'] = setdaily_approval_group69531,
    codeExecution(code,codeStates);
    }
  }
  const handleChange = async(e: any) => {
    if(dynamicStateandType.type=="number"){
      setdaily_approval_group69531((prev: any) => ({ ...prev, manager_comments: +e?.target?.value }));
    }
    else{
      setdaily_approval_group69531((prev: any) => ({ ...prev, manager_comments: e?.target?.value }));
    }
  }
  const handleFocus=async(e:any)=>{
  }
  if (manager_commentsd309a?.isHidden) {
    return <></>
  }
return (
  <div 
    className="top " 
  style={{gridColumn: `3 / 20`,gridRow: `178 / 197`, gap:``, height: `100%`}} >
    <TextArea
      className=""
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {manager_commentsd309a?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Manager Response"
      pin = {'brick-brick'}
      value = { daily_approval_group69531?.manager_comments != null && typeof daily_approval_group69531?.manager_comments =='object' ? Object.keys(daily_approval_group69531?.manager_comments)?.length ?  JSON.stringify(daily_approval_group69531?.manager_comments,null ,2):"" : daily_approval_group69531?.manager_comments||""}
    />
  </div>
  )
}

export default TextAreamanager_comments
