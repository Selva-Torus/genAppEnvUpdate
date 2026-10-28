
'use client'
import React, { useContext, useEffect,useState } from 'react'  
import { useGlobal } from '@/context/GlobalContext'
import { AxiosService } from "@/app/components/axiosService";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import DocumentUploader from '@/components/DocumentUploader';
import { codeExecution } from '@/app/utils/codeExecution';
import i18n from '@/app/components/i18n';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { v4 as uuidv4 } from 'uuid';
import { Text } from '@/components/Text';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Documentuploaderreceipt_image = ({checkToAdd,setCheckToAdd,refetch,setRefetch,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [uploaderType,setUploaderType]=useState<string>("string");
  const [allCode,setAllCode]=useState<any>("");
  let customCode:any;
  

   const handleMapper=async () => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "483e1dce061b49cebe0c9e46b0844e40",
        "7ae3ed1faccc4c2e97b24d830886afe2"
      );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code);
      setUploaderType(orchestrationData?.data?.dataType)
    }catch(err){
        console.log(err);
    }
  }
  useEffect(()=>{
    handleMapper();
  },[])
  const keyset: any = i18n.keyset('language');
  const singleSelect = uploaderType === "string[]" || uploaderType === "array" ? false : true;
   /////////////
   //another screen
  const {request_daily_group44e40, setrequest_daily_group44e40}= useContext(TotalContext) as TotalContextProps;
  const {request_daily_group44e40Props, setrequest_daily_group44e40Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expensefb8cc, setdaily_expensefb8cc}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type22d67, setclaim_expense_type22d67}= useContext(TotalContext) as TotalContextProps;
  const {expense_name5f562, setexpense_name5f562}= useContext(TotalContext) as TotalContextProps;
  const {emailaf076, setemailaf076}= useContext(TotalContext) as TotalContextProps;
  const {expense_date92269, setexpense_date92269}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryf1fb6, setclaim_categoryf1fb6}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount9782f, setcategory_total_amount9782f}= useContext(TotalContext) as TotalContextProps;
  const {attachment04414, setattachment04414}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image6afe2, setreceipt_image6afe2}= useContext(TotalContext) as TotalContextProps;
  const {enabletextb4878, setenabletextb4878}= useContext(TotalContext) as TotalContextProps;
  const {commentsf2394, setcommentsf2394}= useContext(TotalContext) as TotalContextProps;
  const {iscommentenabled7244d, setiscommentenabled7244d}= useContext(TotalContext) as TotalContextProps;
  const {clear14ae7, setclear14ae7}= useContext(TotalContext) as TotalContextProps;
  const {saved507e, setsaved507e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['request_daily_group'] = request_daily_group44e40,
        codeStates['setrequest_daily_group'] = setrequest_daily_group44e40,
        codeStates['request_daily_group44e40'] = request_daily_group44e40Props,
        codeStates['setrequest_daily_group44e40'] = setrequest_daily_group44e40Props,
        codeStates['daily_expense'] = daily_expensefb8cc,
        codeStates['setdaily_expense'] = setdaily_expensefb8cc,
        codeStates['claim_expense_type'] = claim_expense_type22d67,
        codeStates['setclaim_expense_type'] = setclaim_expense_type22d67,
        codeStates['expense_name'] = expense_name5f562,
        codeStates['setexpense_name'] = setexpense_name5f562,
        codeStates['email'] = emailaf076,
        codeStates['setemail'] = setemailaf076,
        codeStates['expense_date'] = expense_date92269,
        codeStates['setexpense_date'] = setexpense_date92269,
        codeStates['claim_category'] = claim_categoryf1fb6,
        codeStates['setclaim_category'] = setclaim_categoryf1fb6,
        codeStates['category_total_amount'] = category_total_amount9782f,
        codeStates['setcategory_total_amount'] = setcategory_total_amount9782f,
        codeStates['attachment'] = attachment04414,
        codeStates['setattachment'] = setattachment04414,
        codeStates['receipt_image'] = receipt_image6afe2,
        codeStates['setreceipt_image'] = setreceipt_image6afe2,
        codeStates['enabletext'] = enabletextb4878,
        codeStates['setenabletext'] = setenabletextb4878,
        codeStates['comments'] = commentsf2394,
        codeStates['setcomments'] = setcommentsf2394,
        codeStates['iscommentenabled'] = iscommentenabled7244d,
        codeStates['setiscommentenabled'] = setiscommentenabled7244d,
        codeStates['clear'] = clear14ae7,
        codeStates['setclear'] = setclear14ae7,
        codeStates['save'] = saved507e,
        codeStates['setsave'] = setsaved507e,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleClick = async (file:any) => {
    setrequest_daily_group44e40((prev: any) => ({ ...prev, receipt_image: file }))
      handleCustomCode()
    }



  if (receipt_image6afe2?.isHidden) {
    return <></>
  }

  return (
    <div   
      style={{gridColumn: `10 / 14`,gridRow: `134 / 144`, gap:``, height: `100%`, overflow: 'auto'}} >
      <DocumentUploader
        className=""
        id="receipt_image6afe2"
        value={request_daily_group44e40?.receipt_image}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1 // 1MB
        }}
        contentAlign={"center"}
        onChange={handleClick}
        preview={true}
        draggable={true}
        singleSelect={singleSelect}
        disabled= {receipt_image6afe2?.isDisabled ? true : false}
        viewType="modal"
        DbType={"dfs"}
        enableEncryption={""}
        fileNamingPreference={"use_system_generated_name"}
      />
    </div>
  )
}

export default Documentuploaderreceipt_image





