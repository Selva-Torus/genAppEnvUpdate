
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
        "b85d8171ed243969ddd5e6b996fbc2cf",
        "824794736de05898183592ca14a96f16"
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
  const {doc_attached_groupbc2cf, setdoc_attached_groupbc2cf}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupbc2cfProps, setdoc_attached_groupbc2cfProps}= useContext(TotalContext) as TotalContextProps;
  const {table_group75a5e, settable_group75a5e}= useContext(TotalContext) as TotalContextProps;
  const {table_group75a5eProps, settable_group75a5eProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_table392d0, setdoc_table392d0}= useContext(TotalContext) as TotalContextProps;
  const {doc_table392d0Props, setdoc_table392d0Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel96f16, setdocumentuploadpanel96f16}= useContext(TotalContext) as TotalContextProps;
  const {button_add_doc8e522, setbutton_add_doc8e522}= useContext(TotalContext) as TotalContextProps;
  const {assign_id67308, setassign_id67308}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupbc2cf,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupbc2cf,
        codeStates['doc_attached_groupbc2cf'] = doc_attached_groupbc2cfProps,
        codeStates['setdoc_attached_groupbc2cf'] = setdoc_attached_groupbc2cfProps,
        codeStates['table_group'] = table_group75a5e,
        codeStates['settable_group'] = settable_group75a5e,
        codeStates['table_group75a5e'] = table_group75a5eProps,
        codeStates['settable_group75a5e'] = settable_group75a5eProps,
        codeStates['doc_table'] = doc_table392d0,
        codeStates['setdoc_table'] = setdoc_table392d0,
        codeStates['doc_table392d0'] = doc_table392d0Props,
        codeStates['setdoc_table392d0'] = setdoc_table392d0Props,
        codeStates['documentuploadpanel'] = documentuploadpanel96f16,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanel96f16,
        codeStates['button_add_doc'] = button_add_doc8e522,
        codeStates['setbutton_add_doc'] = setbutton_add_doc8e522,
        codeStates['assign_id'] = assign_id67308,
        codeStates['setassign_id'] = setassign_id67308,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleDocumentSubmit = async (files:any) => {
    setdoc_attached_groupbc2cf((prev: any) => ({ ...prev, documentuploadpanel: files }))
      handleCustomCode()
    }

  if (documentuploadpanel96f16?.isHidden) {
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
        //disabled= {documentuploadpanel96f16?.isDisabled ? true : false}
        documentfields={ [
  {
    "id": "assign_standard",
    "label": "Standard",
    "icon": "MdOutlineDocumentScanner",
    "accept": [
      "any"
    ],
    "multiple": true
  },
  {
    "id": "assign_evidence",
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
