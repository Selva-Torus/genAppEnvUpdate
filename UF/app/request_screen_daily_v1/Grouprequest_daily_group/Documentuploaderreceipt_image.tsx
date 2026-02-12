
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
      codeStates['request_daily_group']  = request_daily_group44e40,
      codeStates['setrequest_daily_group'] = setrequest_daily_group44e40,
      customCode = codeExecution(code,codeStates);
    }
  }
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
  const handleClick = async (file:any) => {
    setrequest_daily_group44e40((prev: any) => ({ ...prev, receipt_image: file }))
  handleCustomCode()
  }

  if (receipt_image6afe2?.isHidden) {
    return <></>
  }

  return (
    <div    
      style={{gridColumn: `10 / 14`,gridRow: `110 / 120`, gap:``, height: `100%`, overflow: 'auto'}} >
      <DocumentUploader
        className=""
        id="receipt_image6afe2"
        value={request_daily_group44e40.receipt_image}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1 // 1MB
        }}
        contentAlign={"center"}
        disabled= {receipt_image6afe2?.isDisabled ? true : false}
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





