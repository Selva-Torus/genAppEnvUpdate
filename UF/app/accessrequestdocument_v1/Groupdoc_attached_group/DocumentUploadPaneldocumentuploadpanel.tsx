
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
        "1c6549bc3314b67fea47ba0463cd9ca3",
        "b3bf1d59a8e68cb1b39449c99c6febb3"
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
  const {doc_attached_groupd9ca3, setdoc_attached_groupd9ca3}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupd9ca3Props, setdoc_attached_groupd9ca3Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupbcd33, settable_groupbcd33}= useContext(TotalContext) as TotalContextProps;
  const {table_groupbcd33Props, settable_groupbcd33Props}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tablea9098, setrequest_doc_tablea9098}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tablea9098Props, setrequest_doc_tablea9098Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanelfebb3, setdocumentuploadpanelfebb3}= useContext(TotalContext) as TotalContextProps;
  const {access_req_idaf179, setaccess_req_idaf179}= useContext(TotalContext) as TotalContextProps;
  const {button_add_doc1ee80, setbutton_add_doc1ee80}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupd9ca3,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupd9ca3,
        codeStates['doc_attached_groupd9ca3'] = doc_attached_groupd9ca3Props,
        codeStates['setdoc_attached_groupd9ca3'] = setdoc_attached_groupd9ca3Props,
        codeStates['table_group'] = table_groupbcd33,
        codeStates['settable_group'] = settable_groupbcd33,
        codeStates['table_groupbcd33'] = table_groupbcd33Props,
        codeStates['settable_groupbcd33'] = settable_groupbcd33Props,
        codeStates['request_doc_table'] = request_doc_tablea9098,
        codeStates['setrequest_doc_table'] = setrequest_doc_tablea9098,
        codeStates['request_doc_tablea9098'] = request_doc_tablea9098Props,
        codeStates['setrequest_doc_tablea9098'] = setrequest_doc_tablea9098Props,
        codeStates['documentuploadpanel'] = documentuploadpanelfebb3,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanelfebb3,
        codeStates['access_req_id'] = access_req_idaf179,
        codeStates['setaccess_req_id'] = setaccess_req_idaf179,
        codeStates['button_add_doc'] = button_add_doc1ee80,
        codeStates['setbutton_add_doc'] = setbutton_add_doc1ee80,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleDocumentSubmit = async (files:any) => {
    setdoc_attached_groupd9ca3((prev: any) => ({ ...prev, documentuploadpanel: files }))
      handleCustomCode()
    }

  if (documentuploadpanelfebb3?.isHidden) {
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
        //disabled= {documentuploadpanelfebb3?.isDisabled ? true : false}
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
