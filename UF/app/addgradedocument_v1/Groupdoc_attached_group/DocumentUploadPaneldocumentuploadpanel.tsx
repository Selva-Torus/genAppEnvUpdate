
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
        "61581f694de0606adbbbaf00322e6469",
        "2cee77af8a0ecd8ecff05852e51a5371"
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
  const {doc_attached_groupe6469, setdoc_attached_groupe6469}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupe6469Props, setdoc_attached_groupe6469Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group16d33, settable_group16d33}= useContext(TotalContext) as TotalContextProps;
  const {table_group16d33Props, settable_group16d33Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_doc_tablea652a, setgrade_doc_tablea652a}= useContext(TotalContext) as TotalContextProps;
  const {grade_doc_tablea652aProps, setgrade_doc_tablea652aProps}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanela5371, setdocumentuploadpanela5371}= useContext(TotalContext) as TotalContextProps;
  const {grade_id91bb0, setgrade_id91bb0}= useContext(TotalContext) as TotalContextProps;
  const {button_add_docc82a5, setbutton_add_docc82a5}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupe6469,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupe6469,
        codeStates['doc_attached_groupe6469'] = doc_attached_groupe6469Props,
        codeStates['setdoc_attached_groupe6469'] = setdoc_attached_groupe6469Props,
        codeStates['table_group'] = table_group16d33,
        codeStates['settable_group'] = settable_group16d33,
        codeStates['table_group16d33'] = table_group16d33Props,
        codeStates['settable_group16d33'] = settable_group16d33Props,
        codeStates['grade_doc_table'] = grade_doc_tablea652a,
        codeStates['setgrade_doc_table'] = setgrade_doc_tablea652a,
        codeStates['grade_doc_tablea652a'] = grade_doc_tablea652aProps,
        codeStates['setgrade_doc_tablea652a'] = setgrade_doc_tablea652aProps,
        codeStates['documentuploadpanel'] = documentuploadpanela5371,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanela5371,
        codeStates['grade_id'] = grade_id91bb0,
        codeStates['setgrade_id'] = setgrade_id91bb0,
        codeStates['button_add_doc'] = button_add_docc82a5,
        codeStates['setbutton_add_doc'] = setbutton_add_docc82a5,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleDocumentSubmit = async (files:any) => {
    setdoc_attached_groupe6469((prev: any) => ({ ...prev, documentuploadpanel: files }))
      handleCustomCode()
    }

  if (documentuploadpanela5371?.isHidden) {
    return <></>
  }

  return (
    <div   
      style={{gridColumn: `1 / 25`,gridRow: `74 / 141`, gap:``, height: `100%`, overflow: 'auto'}} >
      <DocumentUploadPanel
        className=""
        // contentAlign={"center"}
        onChange={handleDocumentSubmit}
        singleSelect={singleSelect}
        //disabled= {documentuploadpanela5371?.isDisabled ? true : false}
        documentfields={ [
  {
    "id": "grade_standard",
    "label": "Standard",
    "icon": "MdOutlineDocumentScanner",
    "accept": [
      "any"
    ],
    "multiple": true
  },
  {
    "id": "grade_evidence",
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
