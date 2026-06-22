
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
        "ab4de620bb1c73cb8d7a6b98836c3d26",
        "ef66476aa17fa2feac784b20779a3e1b"
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
  const {doc_attached_groupc3d26, setdoc_attached_groupc3d26}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupc3d26Props, setdoc_attached_groupc3d26Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group7bc52, settable_group7bc52}= useContext(TotalContext) as TotalContextProps;
  const {table_group7bc52Props, settable_group7bc52Props}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_doc_table265b6, setsoftware_licenses_doc_table265b6}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_doc_table265b6Props, setsoftware_licenses_doc_table265b6Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanela3e1b, setdocumentuploadpanela3e1b}= useContext(TotalContext) as TotalContextProps;
  const {button_add_doc7c1b7, setbutton_add_doc7c1b7}= useContext(TotalContext) as TotalContextProps;
  const {license_idbc5e1, setlicense_idbc5e1}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupc3d26,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupc3d26,
        codeStates['doc_attached_groupc3d26'] = doc_attached_groupc3d26Props,
        codeStates['setdoc_attached_groupc3d26'] = setdoc_attached_groupc3d26Props,
        codeStates['table_group'] = table_group7bc52,
        codeStates['settable_group'] = settable_group7bc52,
        codeStates['table_group7bc52'] = table_group7bc52Props,
        codeStates['settable_group7bc52'] = settable_group7bc52Props,
        codeStates['software_licenses_doc_table'] = software_licenses_doc_table265b6,
        codeStates['setsoftware_licenses_doc_table'] = setsoftware_licenses_doc_table265b6,
        codeStates['software_licenses_doc_table265b6'] = software_licenses_doc_table265b6Props,
        codeStates['setsoftware_licenses_doc_table265b6'] = setsoftware_licenses_doc_table265b6Props,
        codeStates['documentuploadpanel'] = documentuploadpanela3e1b,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanela3e1b,
        codeStates['button_add_doc'] = button_add_doc7c1b7,
        codeStates['setbutton_add_doc'] = setbutton_add_doc7c1b7,
        codeStates['license_id'] = license_idbc5e1,
        codeStates['setlicense_id'] = setlicense_idbc5e1,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleDocumentSubmit = async (files:any) => {
    setdoc_attached_groupc3d26((prev: any) => ({ ...prev, documentuploadpanel: files }))
      handleCustomCode()
    }

  if (documentuploadpanela3e1b?.isHidden) {
    return <></>
  }

  return (
    <div   
      style={{gridColumn: `1 / 25`,gridRow: `75 / 142`, gap:``, height: `100%`, overflow: 'auto'}} >
      <DocumentUploadPanel
        className=""
        // contentAlign={"center"}
        onChange={handleDocumentSubmit}
        singleSelect={singleSelect}
        //disabled= {documentuploadpanela3e1b?.isDisabled ? true : false}
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
