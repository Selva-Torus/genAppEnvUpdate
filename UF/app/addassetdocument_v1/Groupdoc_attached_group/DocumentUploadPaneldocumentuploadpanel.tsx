
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
        "8aeeb409fd5e47b8bbca47579b536b0d",
        "cb3bf17bc4234aca9f4229c4e0814fde"
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
  const {doc_attached_group36b0d, setdoc_attached_group36b0d}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group36b0dProps, setdoc_attached_group36b0dProps}= useContext(TotalContext) as TotalContextProps;
  const {table_groupdaaaa, settable_groupdaaaa}= useContext(TotalContext) as TotalContextProps;
  const {table_groupdaaaaProps, settable_groupdaaaaProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_doc_table49f40, setasset_doc_table49f40}= useContext(TotalContext) as TotalContextProps;
  const {asset_doc_table49f40Props, setasset_doc_table49f40Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel14fde, setdocumentuploadpanel14fde}= useContext(TotalContext) as TotalContextProps;
  const {asset_id358d1, setasset_id358d1}= useContext(TotalContext) as TotalContextProps;
  const {button_add_docfde68, setbutton_add_docfde68}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_group36b0d,
        codeStates['setdoc_attached_group'] = setdoc_attached_group36b0d,
        codeStates['doc_attached_group36b0d'] = doc_attached_group36b0dProps,
        codeStates['setdoc_attached_group36b0d'] = setdoc_attached_group36b0dProps,
        codeStates['table_group'] = table_groupdaaaa,
        codeStates['settable_group'] = settable_groupdaaaa,
        codeStates['table_groupdaaaa'] = table_groupdaaaaProps,
        codeStates['settable_groupdaaaa'] = settable_groupdaaaaProps,
        codeStates['asset_doc_table'] = asset_doc_table49f40,
        codeStates['setasset_doc_table'] = setasset_doc_table49f40,
        codeStates['asset_doc_table49f40'] = asset_doc_table49f40Props,
        codeStates['setasset_doc_table49f40'] = setasset_doc_table49f40Props,
        codeStates['documentuploadpanel'] = documentuploadpanel14fde,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanel14fde,
        codeStates['asset_id'] = asset_id358d1,
        codeStates['setasset_id'] = setasset_id358d1,
        codeStates['button_add_doc'] = button_add_docfde68,
        codeStates['setbutton_add_doc'] = setbutton_add_docfde68,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleDocumentSubmit = async (files:any) => {
    setdoc_attached_group36b0d((prev: any) => ({ ...prev, documentuploadpanel: files }))
      handleCustomCode()
    }

  if (documentuploadpanel14fde?.isHidden) {
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
        //disabled= {documentuploadpanel14fde?.isDisabled ? true : false}
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
