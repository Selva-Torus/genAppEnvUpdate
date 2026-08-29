
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
        "05177fac499640d4bf45a199a95494e0",
        "99cd16a6c78940e0b660561bbc34f1bf"
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
  const {grouparray494e0_0, setgrouparray494e0_0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_0Props, setgrouparray494e0_0Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_1, setgrouparray494e0_1}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_1Props, setgrouparray494e0_1Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_2, setgrouparray494e0_2}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_2Props, setgrouparray494e0_2Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_3, setgrouparray494e0_3}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_3Props, setgrouparray494e0_3Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_4, setgrouparray494e0_4}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_4Props, setgrouparray494e0_4Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_5, setgrouparray494e0_5}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_5Props, setgrouparray494e0_5Props}= useContext(TotalContext) as TotalContextProps;
  const {group84b9c, setgroup84b9c}= useContext(TotalContext) as TotalContextProps;
  const {group84b9cProps, setgroup84b9cProps}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0, setgrouparray494e0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0Props, setgrouparray494e0Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense3c178, setdaily_expense3c178}= useContext(TotalContext) as TotalContextProps;
  const {expense_namec83ee, setexpense_namec83ee}= useContext(TotalContext) as TotalContextProps;
  const {email0c3ca, setemail0c3ca}= useContext(TotalContext) as TotalContextProps;
  const {expense_datee6e16, setexpense_datee6e16}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryf03f1, setclaim_categoryf03f1}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount49375, setcategory_total_amount49375}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image4f1bf, setreceipt_image4f1bf}= useContext(TotalContext) as TotalContextProps;
  const {comments7171e, setcomments7171e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['grouparray49'] = grouparray494e0_0,
        codeStates['setgrouparray49'] = setgrouparray494e0_0,
        codeStates['grouparray494e0_0'] = grouparray494e0_0Props,
        codeStates['setgrouparray494e0_0'] = setgrouparray494e0_0Props,
        codeStates['grouparray49'] = grouparray494e0_1,
        codeStates['setgrouparray49'] = setgrouparray494e0_1,
        codeStates['grouparray494e0_1'] = grouparray494e0_1Props,
        codeStates['setgrouparray494e0_1'] = setgrouparray494e0_1Props,
        codeStates['grouparray49'] = grouparray494e0_2,
        codeStates['setgrouparray49'] = setgrouparray494e0_2,
        codeStates['grouparray494e0_2'] = grouparray494e0_2Props,
        codeStates['setgrouparray494e0_2'] = setgrouparray494e0_2Props,
        codeStates['grouparray49'] = grouparray494e0_3,
        codeStates['setgrouparray49'] = setgrouparray494e0_3,
        codeStates['grouparray494e0_3'] = grouparray494e0_3Props,
        codeStates['setgrouparray494e0_3'] = setgrouparray494e0_3Props,
        codeStates['grouparray49'] = grouparray494e0_4,
        codeStates['setgrouparray49'] = setgrouparray494e0_4,
        codeStates['grouparray494e0_4'] = grouparray494e0_4Props,
        codeStates['setgrouparray494e0_4'] = setgrouparray494e0_4Props,
        codeStates['grouparray49'] = grouparray494e0_5,
        codeStates['setgrouparray49'] = setgrouparray494e0_5,
        codeStates['grouparray494e0_5'] = grouparray494e0_5Props,
        codeStates['setgrouparray494e0_5'] = setgrouparray494e0_5Props,
        codeStates['group'] = group84b9c,
        codeStates['setgroup'] = setgroup84b9c,
        codeStates['group84b9c'] = group84b9cProps,
        codeStates['setgroup84b9c'] = setgroup84b9cProps,
        codeStates['grouparray'] = grouparray494e0,
        codeStates['setgrouparray'] = setgrouparray494e0,
        codeStates['grouparray494e0'] = grouparray494e0Props,
        codeStates['setgrouparray494e0'] = setgrouparray494e0Props,
        codeStates['daily_expense'] = daily_expense3c178,
        codeStates['setdaily_expense'] = setdaily_expense3c178,
        codeStates['expense_name'] = expense_namec83ee,
        codeStates['setexpense_name'] = setexpense_namec83ee,
        codeStates['email'] = email0c3ca,
        codeStates['setemail'] = setemail0c3ca,
        codeStates['expense_date'] = expense_datee6e16,
        codeStates['setexpense_date'] = setexpense_datee6e16,
        codeStates['claim_category'] = claim_categoryf03f1,
        codeStates['setclaim_category'] = setclaim_categoryf03f1,
        codeStates['category_total_amount'] = category_total_amount49375,
        codeStates['setcategory_total_amount'] = setcategory_total_amount49375,
        codeStates['receipt_image'] = receipt_image4f1bf,
        codeStates['setreceipt_image'] = setreceipt_image4f1bf,
        codeStates['comments'] = comments7171e,
        codeStates['setcomments'] = setcomments7171e,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleClick = async (file:any) => {
    setgrouparray494e0_5((prev: any) => ({ ...prev, receipt_image: file }))
      handleCustomCode()
    }

  if (receipt_image4f1bf?.isHidden) {
    return <></>
  }

  return (
    <div   
      style={{gridColumn: `10 / 17`,gridRow: `116 / 135`, gap:``, height: `100%`, overflow: 'auto'}} >
      <DocumentUploader
        className=""
        id="receipt_image4f1bf"
        value={grouparray494e0_5?.receipt_image}
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
        disabled= {receipt_image4f1bf?.isDisabled ? true : false}
        viewType="modal"
        DbType={"dfs"}
        enableEncryption={""}
        fileNamingPreference={"use_system_generated_name"}
      />
    </div>
  )
}

export default Documentuploaderreceipt_image





