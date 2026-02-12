
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
  const {request_offsite_group429cb, setrequest_offsite_group429cb}= useContext(TotalContext) as TotalContextProps;
  const {request_offsite_group429cbProps, setrequest_offsite_group429cbProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense39c39, setoffsite_expense39c39}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type51f6e, setclaim_expense_type51f6e}= useContext(TotalContext) as TotalContextProps;
  const {expense_namebf755, setexpense_namebf755}= useContext(TotalContext) as TotalContextProps;
  const {from_date6f9c3, setfrom_date6f9c3}= useContext(TotalContext) as TotalContextProps;
  const {to_date6db82, setto_date6db82}= useContext(TotalContext) as TotalContextProps;
  const {claim_categorya4a14, setclaim_categorya4a14}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amounte603b, setcategory_total_amounte603b}= useContext(TotalContext) as TotalContextProps;
  const {attachmentc9c51, setattachmentc9c51}= useContext(TotalContext) as TotalContextProps;
  const {receipt_imageafe30, setreceipt_imageafe30}= useContext(TotalContext) as TotalContextProps;
  const {comments65b18, setcomments65b18}= useContext(TotalContext) as TotalContextProps;
  const {enableeff29, setenableeff29}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabled5ca5f, setis_comment_enabled5ca5f}= useContext(TotalContext) as TotalContextProps;
  const {clear2b3e6, setclear2b3e6}= useContext(TotalContext) as TotalContextProps;
  const {add5cae4, setadd5cae4}= useContext(TotalContext) as TotalContextProps;
  const {claims_detail_tablef8143, setclaims_detail_tablef8143}= useContext(TotalContext) as TotalContextProps;
  const {claims_detail_tablef8143Props, setclaims_detail_tablef8143Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  useEffect(()=>{
    if (prevRefreshRef.current) {
      setrequest_offsite_group429cb((pre:any)=>({...pre,comments:""}))
    }else 
      prevRefreshRef.current= true
  },[comments65b18?.refresh])

  const handleBlur=async(e:any)=>{
    if (code != '') {
      let codeStates: any = {};
      codeStates['request_offsite_group']  = request_offsite_group429cb,
      codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb,
      codeStates['claims_detail_table']  = claims_detail_tablef8143,
      codeStates['setclaims_detail_table'] = setclaims_detail_tablef8143,
    codeExecution(code,codeStates);
    }
  }
  const handleChange = async(e: any) => {
    if(dynamicStateandType.type=="number"){
      setrequest_offsite_group429cb((prev: any) => ({ ...prev, comments: +e?.target?.value }));
    }
    else{
      setrequest_offsite_group429cb((prev: any) => ({ ...prev, comments: e?.target?.value }));
    }
  }
  const handleFocus=async(e:any)=>{
  }
  if (comments65b18?.isHidden) {
    return <></>
  }
return (
  <div 
    className="top " 
  style={{gridColumn: `5 / 17`,gridRow: `132 / 153`, gap:``, height: `100%`}} >
    <TextArea
      className=""
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {comments65b18?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Claims Description"
      pin = {'brick-brick'}
      value = { request_offsite_group429cb?.comments != null && typeof request_offsite_group429cb?.comments =='object' ? Object.keys(request_offsite_group429cb?.comments)?.length ?  JSON.stringify(request_offsite_group429cb?.comments,null ,2):"" : request_offsite_group429cb?.comments||""}
    />
  </div>
  )
}

export default TextAreacomments
