
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
        "b2c5c38225d609b45f9969648a2ac2a0",
        "1fa5fd1bdeafc39a56d02371430c5e72"
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
  const {doc_attached_groupac2a0, setdoc_attached_groupac2a0}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupac2a0Props, setdoc_attached_groupac2a0Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group034b1, settable_group034b1}= useContext(TotalContext) as TotalContextProps;
  const {table_group034b1Props, settable_group034b1Props}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tableb42f3, setemployee_doc_tableb42f3}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tableb42f3Props, setemployee_doc_tableb42f3Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanelc5e72, setdocumentuploadpanelc5e72}= useContext(TotalContext) as TotalContextProps;
  const {employee_id2366a, setemployee_id2366a}= useContext(TotalContext) as TotalContextProps;
  const {button_add_doc7c20b, setbutton_add_doc7c20b}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupac2a0,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupac2a0,
        codeStates['doc_attached_groupac2a0'] = doc_attached_groupac2a0Props,
        codeStates['setdoc_attached_groupac2a0'] = setdoc_attached_groupac2a0Props,
        codeStates['table_group'] = table_group034b1,
        codeStates['settable_group'] = settable_group034b1,
        codeStates['table_group034b1'] = table_group034b1Props,
        codeStates['settable_group034b1'] = settable_group034b1Props,
        codeStates['employee_doc_table'] = employee_doc_tableb42f3,
        codeStates['setemployee_doc_table'] = setemployee_doc_tableb42f3,
        codeStates['employee_doc_tableb42f3'] = employee_doc_tableb42f3Props,
        codeStates['setemployee_doc_tableb42f3'] = setemployee_doc_tableb42f3Props,
        codeStates['documentuploadpanel'] = documentuploadpanelc5e72,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanelc5e72,
        codeStates['employee_id'] = employee_id2366a,
        codeStates['setemployee_id'] = setemployee_id2366a,
        codeStates['button_add_doc'] = button_add_doc7c20b,
        codeStates['setbutton_add_doc'] = setbutton_add_doc7c20b,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleDocumentSubmit = async (files:any) => {
    setdoc_attached_groupac2a0((prev: any) => ({ ...prev, documentuploadpanel: files }))
      handleCustomCode()
    }

  if (documentuploadpanelc5e72?.isHidden) {
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
        //disabled= {documentuploadpanelc5e72?.isDisabled ? true : false}
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
