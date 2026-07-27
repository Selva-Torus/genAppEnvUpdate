
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
        "c877483ce67926f75e218c9de64b4f40",
        "2b3faa4990fe7ee50208ef0674450001"
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
  const {doc_attached_groupb4f40, setdoc_attached_groupb4f40}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupb4f40Props, setdoc_attached_groupb4f40Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupb0ef9, settable_groupb0ef9}= useContext(TotalContext) as TotalContextProps;
  const {table_groupb0ef9Props, settable_groupb0ef9Props}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_table78f2f, setemployee_doc_table78f2f}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_table78f2fProps, setemployee_doc_table78f2fProps}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel50001, setdocumentuploadpanel50001}= useContext(TotalContext) as TotalContextProps;
  const {check_id62086, setcheck_id62086}= useContext(TotalContext) as TotalContextProps;
  const {button_add_doc9fdc1, setbutton_add_doc9fdc1}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupb4f40,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupb4f40,
        codeStates['doc_attached_groupb4f40'] = doc_attached_groupb4f40Props,
        codeStates['setdoc_attached_groupb4f40'] = setdoc_attached_groupb4f40Props,
        codeStates['table_group'] = table_groupb0ef9,
        codeStates['settable_group'] = settable_groupb0ef9,
        codeStates['table_groupb0ef9'] = table_groupb0ef9Props,
        codeStates['settable_groupb0ef9'] = settable_groupb0ef9Props,
        codeStates['employee_doc_table'] = employee_doc_table78f2f,
        codeStates['setemployee_doc_table'] = setemployee_doc_table78f2f,
        codeStates['employee_doc_table78f2f'] = employee_doc_table78f2fProps,
        codeStates['setemployee_doc_table78f2f'] = setemployee_doc_table78f2fProps,
        codeStates['documentuploadpanel'] = documentuploadpanel50001,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanel50001,
        codeStates['check_id'] = check_id62086,
        codeStates['setcheck_id'] = setcheck_id62086,
        codeStates['button_add_doc'] = button_add_doc9fdc1,
        codeStates['setbutton_add_doc'] = setbutton_add_doc9fdc1,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleDocumentSubmit = async (files:any) => {
    setdoc_attached_groupb4f40((prev: any) => ({ ...prev, documentuploadpanel: files }))
      handleCustomCode()
    }

  if (documentuploadpanel50001?.isHidden) {
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
        //disabled= {documentuploadpanel50001?.isDisabled ? true : false}
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
