
'use client'
import React, { useContext, useEffect,useState } from 'react'  
import { useGlobal } from '@/context/GlobalContext'
import { AxiosService } from "@/app/components/axiosService";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import DocumentUploader from '@/components/DocumentUploader';
import { codeExecution } from '@/app/utils/codeExecution';
import i18n from '@/app/components/i18n';
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
        "5a69b1d62572431ab2933ca7cf0571d2",
        "3fb6d6928dc44258974f28707c4b2aec"
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
  const singleSelect = uploaderType === "string[]" ? false : true;
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
  const handleCustomCode=async () => {
    let code:any=allCode||''
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
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleClick = async (file:any) => {
    setgroup571d2((prev: any) => ({ ...prev, receipt_image: file }))
      handleCustomCode()
    }

  if (receipt_imageb2aec?.isHidden) {
    return <></>
  }

  return (
    <div   
      style={{gridColumn: `10 / 14`,gridRow: `94 / 112`, gap:``, height: `100%`, overflow: 'auto'}} >
      <DocumentUploader
        className=""
        id="receipt_imageb2aec"
        value={group571d2?.receipt_image}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1 // 1MB
        }}
        contentAlign={"center"}
        headerPosition='top'
        headerText="Attachment"
        onChange={handleClick}
        preview={true}
        draggable={true}
        singleSelect={singleSelect}
        disabled= {receipt_imageb2aec?.isDisabled ? true : false}
        viewType="modal"
        DbType={"dfs"}
        enableEncryption={""}
        fileNamingPreference={"use_system_generated_name"}
      />
    </div>
  )
}

export default Documentuploaderreceipt_image





