
'use client'
import React, { useContext, useEffect,useState } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import DocumentUploader from '@/components/DocumentUploader';
import { codeExecution } from '@/app/utils/codeExecution';
import { Text } from '@/components/Text';

const Documentuploaderreceipt_image = ({checkToAdd,setCheckToAdd,refetch,setRefetch}:any) => {
  let code:any = "";
  let customCode:any;
  const handleCustomCode=async () => {
    if (code != '') {
      let codeStates: any = {};
      codeStates['request_offsite_group']  = request_offsite_group429cb,
      codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb,
      codeStates['claims_detail_table']  = claims_detail_tablef8143,
      codeStates['setclaims_detail_table'] = setclaims_detail_tablef8143,
      customCode = codeExecution(code,codeStates);
    }
  }
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
  const handleClick = async (file:any) => {
    setrequest_offsite_group429cb((prev: any) => ({ ...prev, receipt_image: file }))
  handleCustomCode()
  }

  if (receipt_imageafe30?.isHidden) {
    return <></>
  }

  return (
    <div    
      style={{gridColumn: `10 / 14`,gridRow: `118 / 129`, gap:``, height: `100%`, overflow: 'auto'}} >
      <DocumentUploader
        className=""
        id="receipt_imageafe30"
        value={request_offsite_group429cb.receipt_image}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1 // 1MB
        }}
        contentAlign={"center"}
        disabled= {receipt_imageafe30?.isDisabled ? true : false}
        onChange={handleClick}
        preview={true}
        draggable={true}
        singleSelect={false}
        viewType="modal"
        DbType={"mongodb"}
        enableEncryption={""}
        fileNamingPreference={"use_system_generated_name"}
      />
    </div>
  )
}

export default Documentuploaderreceipt_image





