
'use client'
import React, { useContext, useEffect,useState } from 'react'  
import { getCookie } from '@/app/components/cookieMgment';
import { AxiosService } from "@/app/components/axiosService";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import DocumentUploadPanel from '@/components/DocumentUploadPanel';
import { codeExecution } from '@/app/utils/codeExecution';
import i18n from '@/app/components/i18n';
import { Text } from '@/components/Text';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const DocumentUploadPaneldocumentuploadpanel = ({checkToAdd,setCheckToAdd,refetch,setRefetch,setIsProcessing,controlData}:any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [uploaderType,setUploaderType]=useState<string>("string");
  const [allCode,setAllCode]=useState<any>("");
  let customCode:any;
  

   const handleMapper=async () => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "46d22986c7d2f89a42104d7f2b68ed8b",
        "8191625c9daa4c86d6b3c30fcf99d802"
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
  const {doc_attached_group8ed8b, setdoc_attached_group8ed8b}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group8ed8bProps, setdoc_attached_group8ed8bProps}= useContext(TotalContext) as TotalContextProps;
  const {table_group106c4, settable_group106c4}= useContext(TotalContext) as TotalContextProps;
  const {table_group106c4Props, settable_group106c4Props}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tabled849d, setemployee_doc_tabled849d}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tabled849dProps, setemployee_doc_tabled849dProps}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel9d802, setdocumentuploadpanel9d802}= useContext(TotalContext) as TotalContextProps;
  const {review_idea959, setreview_idea959}= useContext(TotalContext) as TotalContextProps;
  const {button_add_docb64ae, setbutton_add_docb64ae}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_group8ed8b,
        codeStates['setdoc_attached_group'] = setdoc_attached_group8ed8b,
        codeStates['doc_attached_group8ed8b'] = doc_attached_group8ed8bProps,
        codeStates['setdoc_attached_group8ed8b'] = setdoc_attached_group8ed8bProps,
        codeStates['table_group'] = table_group106c4,
        codeStates['settable_group'] = settable_group106c4,
        codeStates['table_group106c4'] = table_group106c4Props,
        codeStates['settable_group106c4'] = settable_group106c4Props,
        codeStates['employee_doc_table'] = employee_doc_tabled849d,
        codeStates['setemployee_doc_table'] = setemployee_doc_tabled849d,
        codeStates['employee_doc_tabled849d'] = employee_doc_tabled849dProps,
        codeStates['setemployee_doc_tabled849d'] = setemployee_doc_tabled849dProps,
        codeStates['documentuploadpanel'] = documentuploadpanel9d802,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanel9d802,
        codeStates['review_id'] = review_idea959,
        codeStates['setreview_id'] = setreview_idea959,
        codeStates['button_add_doc'] = button_add_docb64ae,
        codeStates['setbutton_add_doc'] = setbutton_add_docb64ae,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleDocumentSubmit = async (files:any) => {
    setdoc_attached_group8ed8b((prev: any) => ({ ...prev, documentuploadpanel: files }))
      handleCustomCode()
    }

  if (documentuploadpanel9d802?.isHidden) {
    return <></>
  }

  return (
    <div   
      style={{gridColumn: `1 / 25`,gridRow: `83 / 150`, gap:``, height: `100%`, overflow: 'auto'}} >
      <DocumentUploadPanel
        className=""
        // contentAlign={"center"}
        onChange={handleDocumentSubmit}
        singleSelect={singleSelect}
        //disabled= {documentuploadpanel9d802?.isDisabled ? true : false}
        documentfields={ [
  {
    "id": "employee_standard",
    "label": "Standard",
    "icon": "MdOutlineDocumentScanner",
    "accept": [
      "any"
    ],
    "multiple": true
  },
  {
    "id": "employee_evidence",
    "label": "Evidence",
    "icon": "MdOutlineDocumentScanner",
    "accept": [
      "any"
    ],
    "multiple": true
  }
] }
        DbType={"dfs"}
        enableEncryption={""}
        fileNamingPreference={"use_system_generated_name"}
      />
    </div>
  )
}

export default DocumentUploadPaneldocumentuploadpanel
