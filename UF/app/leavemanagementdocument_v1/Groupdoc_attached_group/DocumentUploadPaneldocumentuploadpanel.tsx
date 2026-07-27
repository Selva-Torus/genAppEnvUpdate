
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
        "ffda8670f0fc192442a6d97bd4fe2bd6",
        "2e3175cc17f27646d082989ffbbbe83c"
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
  const {doc_attached_groupe2bd6, setdoc_attached_groupe2bd6}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupe2bd6Props, setdoc_attached_groupe2bd6Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupf34e5, settable_groupf34e5}= useContext(TotalContext) as TotalContextProps;
  const {table_groupf34e5Props, settable_groupf34e5Props}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tabled1189, setrequest_doc_tabled1189}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tabled1189Props, setrequest_doc_tabled1189Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanelbe83c, setdocumentuploadpanelbe83c}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_id072b8, setleave_req_id072b8}= useContext(TotalContext) as TotalContextProps;
  const {button_add_docdaa1e, setbutton_add_docdaa1e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupe2bd6,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupe2bd6,
        codeStates['doc_attached_groupe2bd6'] = doc_attached_groupe2bd6Props,
        codeStates['setdoc_attached_groupe2bd6'] = setdoc_attached_groupe2bd6Props,
        codeStates['table_group'] = table_groupf34e5,
        codeStates['settable_group'] = settable_groupf34e5,
        codeStates['table_groupf34e5'] = table_groupf34e5Props,
        codeStates['settable_groupf34e5'] = settable_groupf34e5Props,
        codeStates['request_doc_table'] = request_doc_tabled1189,
        codeStates['setrequest_doc_table'] = setrequest_doc_tabled1189,
        codeStates['request_doc_tabled1189'] = request_doc_tabled1189Props,
        codeStates['setrequest_doc_tabled1189'] = setrequest_doc_tabled1189Props,
        codeStates['documentuploadpanel'] = documentuploadpanelbe83c,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanelbe83c,
        codeStates['leave_req_id'] = leave_req_id072b8,
        codeStates['setleave_req_id'] = setleave_req_id072b8,
        codeStates['button_add_doc'] = button_add_docdaa1e,
        codeStates['setbutton_add_doc'] = setbutton_add_docdaa1e,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleDocumentSubmit = async (files:any) => {
    setdoc_attached_groupe2bd6((prev: any) => ({ ...prev, documentuploadpanel: files }))
      handleCustomCode()
    }

  if (documentuploadpanelbe83c?.isHidden) {
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
        //disabled= {documentuploadpanelbe83c?.isDisabled ? true : false}
        documentfields={ [
  {
    "id": "access_request_standard",
    "label": "Standard",
    "icon": "MdOutlineDocumentScanner",
    "accept": [
      "any"
    ],
    "multiple": true
  },
  {
    "id": "access_request_evidence",
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
