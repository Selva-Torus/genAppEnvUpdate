
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
        "62ceddbc8f37df4ce0ec31864baedd83",
        "6eec4190dbcf7eff8f42667a114edfa4"
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
  const {doc_attached_groupedd83, setdoc_attached_groupedd83}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupedd83Props, setdoc_attached_groupedd83Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group5e697, settable_group5e697}= useContext(TotalContext) as TotalContextProps;
  const {table_group5e697Props, settable_group5e697Props}= useContext(TotalContext) as TotalContextProps;
  const {position_doc_tableb28d5, setposition_doc_tableb28d5}= useContext(TotalContext) as TotalContextProps;
  const {position_doc_tableb28d5Props, setposition_doc_tableb28d5Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpaneledfa4, setdocumentuploadpaneledfa4}= useContext(TotalContext) as TotalContextProps;
  const {position_id0bc39, setposition_id0bc39}= useContext(TotalContext) as TotalContextProps;
  const {button_add_doc90946, setbutton_add_doc90946}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupedd83,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupedd83,
        codeStates['doc_attached_groupedd83'] = doc_attached_groupedd83Props,
        codeStates['setdoc_attached_groupedd83'] = setdoc_attached_groupedd83Props,
        codeStates['table_group'] = table_group5e697,
        codeStates['settable_group'] = settable_group5e697,
        codeStates['table_group5e697'] = table_group5e697Props,
        codeStates['settable_group5e697'] = settable_group5e697Props,
        codeStates['position_doc_table'] = position_doc_tableb28d5,
        codeStates['setposition_doc_table'] = setposition_doc_tableb28d5,
        codeStates['position_doc_tableb28d5'] = position_doc_tableb28d5Props,
        codeStates['setposition_doc_tableb28d5'] = setposition_doc_tableb28d5Props,
        codeStates['documentuploadpanel'] = documentuploadpaneledfa4,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpaneledfa4,
        codeStates['position_id'] = position_id0bc39,
        codeStates['setposition_id'] = setposition_id0bc39,
        codeStates['button_add_doc'] = button_add_doc90946,
        codeStates['setbutton_add_doc'] = setbutton_add_doc90946,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleDocumentSubmit = async (files:any) => {
    setdoc_attached_groupedd83((prev: any) => ({ ...prev, documentuploadpanel: files }))
      handleCustomCode()
    }

  if (documentuploadpaneledfa4?.isHidden) {
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
        //disabled= {documentuploadpaneledfa4?.isDisabled ? true : false}
        documentfields={ [
  {
    "id": "position_standard",
    "label": "Standard",
    "icon": "MdOutlineDocumentScanner",
    "accept": [
      "any"
    ],
    "multiple": true
  },
  {
    "id": "position_evidence",
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
