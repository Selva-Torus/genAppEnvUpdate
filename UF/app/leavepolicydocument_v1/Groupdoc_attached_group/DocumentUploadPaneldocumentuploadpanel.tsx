
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
        "d533a4c0379855f0c56a8cd9ffc1c693",
        "fab51e3bf009152e5d8cc6ae92cf0a9b"
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
  const {doc_attached_group1c693, setdoc_attached_group1c693}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group1c693Props, setdoc_attached_group1c693Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group973f0, settable_group973f0}= useContext(TotalContext) as TotalContextProps;
  const {table_group973f0Props, settable_group973f0Props}= useContext(TotalContext) as TotalContextProps;
  const {policy_doc_table06d23, setpolicy_doc_table06d23}= useContext(TotalContext) as TotalContextProps;
  const {policy_doc_table06d23Props, setpolicy_doc_table06d23Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanelf0a9b, setdocumentuploadpanelf0a9b}= useContext(TotalContext) as TotalContextProps;
  const {policy_id939d5, setpolicy_id939d5}= useContext(TotalContext) as TotalContextProps;
  const {button_canceldce7e, setbutton_canceldce7e}= useContext(TotalContext) as TotalContextProps;
  const {button_add_docc4540, setbutton_add_docc4540}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_group1c693,
        codeStates['setdoc_attached_group'] = setdoc_attached_group1c693,
        codeStates['doc_attached_group1c693'] = doc_attached_group1c693Props,
        codeStates['setdoc_attached_group1c693'] = setdoc_attached_group1c693Props,
        codeStates['table_group'] = table_group973f0,
        codeStates['settable_group'] = settable_group973f0,
        codeStates['table_group973f0'] = table_group973f0Props,
        codeStates['settable_group973f0'] = settable_group973f0Props,
        codeStates['policy_doc_table'] = policy_doc_table06d23,
        codeStates['setpolicy_doc_table'] = setpolicy_doc_table06d23,
        codeStates['policy_doc_table06d23'] = policy_doc_table06d23Props,
        codeStates['setpolicy_doc_table06d23'] = setpolicy_doc_table06d23Props,
        codeStates['documentuploadpanel'] = documentuploadpanelf0a9b,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanelf0a9b,
        codeStates['policy_id'] = policy_id939d5,
        codeStates['setpolicy_id'] = setpolicy_id939d5,
        codeStates['button_cancel'] = button_canceldce7e,
        codeStates['setbutton_cancel'] = setbutton_canceldce7e,
        codeStates['button_add_doc'] = button_add_docc4540,
        codeStates['setbutton_add_doc'] = setbutton_add_docc4540,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleDocumentSubmit = async (files:any) => {
    setdoc_attached_group1c693((prev: any) => ({ ...prev, documentuploadpanel: files }))
      handleCustomCode()
    }

  if (documentuploadpanelf0a9b?.isHidden) {
    return <></>
  }

  return (
    <div   
      style={{gridColumn: `1 / 25`,gridRow: `74 / 136`, gap:``, height: `100%`, overflow: 'auto'}} >
      <DocumentUploadPanel
        className="!hover:bg-[#ff7600]"
        // contentAlign={"center"}
        onChange={handleDocumentSubmit}
        singleSelect={singleSelect}
        //disabled= {documentuploadpanelf0a9b?.isDisabled ? true : false}
        documentfields={ [
  {
    "id": "asset_standard",
    "label": "Standard",
    "icon": "MdOutlineDocumentScanner",
    "accept": [
      "any"
    ],
    "multiple": true
  },
  {
    "id": "asset_evidence",
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
