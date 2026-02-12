
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


const TextAreacomments = ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'comments',type:"text"});
  const [allCode,setAllCode]=useState<string>("");
  const toast : Function =useInfoMsg();
  const routes : AppRouterInstance = useRouter();
 /////////////
   //another screen
  const {request_daily_group44e40, setrequest_daily_group44e40}= useContext(TotalContext) as TotalContextProps;
  const {request_daily_group44e40Props, setrequest_daily_group44e40Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expensefb8cc, setdaily_expensefb8cc}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type22d67, setclaim_expense_type22d67}= useContext(TotalContext) as TotalContextProps;
  const {expense_name5f562, setexpense_name5f562}= useContext(TotalContext) as TotalContextProps;
  const {expense_date5f45e, setexpense_date5f45e}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryc7c5e, setclaim_categoryc7c5e}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount9782f, setcategory_total_amount9782f}= useContext(TotalContext) as TotalContextProps;
  const {attachment04414, setattachment04414}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image6afe2, setreceipt_image6afe2}= useContext(TotalContext) as TotalContextProps;
  const {commentsf2394, setcommentsf2394}= useContext(TotalContext) as TotalContextProps;
  const {enabletextb4878, setenabletextb4878}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabled7244d, setis_comment_enabled7244d}= useContext(TotalContext) as TotalContextProps;
  const {clear14ae7, setclear14ae7}= useContext(TotalContext) as TotalContextProps;
  const {saved507e, setsaved507e}= useContext(TotalContext) as TotalContextProps;
  //////////////

  useEffect(()=>{
    if (prevRefreshRef.current) {
      setrequest_daily_group44e40((pre:any)=>({...pre,comments:""}))
    }else 
      prevRefreshRef.current= true
  },[commentsf2394?.refresh])

  const handleBlur=async(e:any)=>{
    if (code != '') {
      let codeStates: any = {};
      codeStates['request_daily_group']  = request_daily_group44e40,
      codeStates['setrequest_daily_group'] = setrequest_daily_group44e40,
    codeExecution(code,codeStates);
    }
  }
  const handleChange = async(e: any) => {
    if(dynamicStateandType.type=="number"){
      setrequest_daily_group44e40((prev: any) => ({ ...prev, comments: +e?.target?.value }));
    }
    else{
      setrequest_daily_group44e40((prev: any) => ({ ...prev, comments: e?.target?.value }));
    }
  }
  const handleFocus=async(e:any)=>{
  }
  if (commentsf2394?.isHidden) {
    return <></>
  }
return (
  <div 
    className="top " 
  style={{gridColumn: `5 / 17`,gridRow: `124 / 142`, gap:``, height: `100%`}} >
    <TextArea
      className=""
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {commentsf2394?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Claims Description"
      pin = {'brick-brick'}
      value = { request_daily_group44e40?.comments != null && typeof request_daily_group44e40?.comments =='object' ? Object.keys(request_daily_group44e40?.comments)?.length ?  JSON.stringify(request_daily_group44e40?.comments,null ,2):"" : request_daily_group44e40?.comments||""}
    />
  </div>
  )
}

export default TextAreacomments
