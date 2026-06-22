
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
        "fd72de83de24cd5c26d4606276bb9604",
        "1f0203ccb19721aed28648d56e8643f7"
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
  const {doc_attached_groupb9604, setdoc_attached_groupb9604}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupb9604Props, setdoc_attached_groupb9604Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupefcb8, settable_groupefcb8}= useContext(TotalContext) as TotalContextProps;
  const {table_groupefcb8Props, settable_groupefcb8Props}= useContext(TotalContext) as TotalContextProps;
  const {category_doc_table9b042, setcategory_doc_table9b042}= useContext(TotalContext) as TotalContextProps;
  const {category_doc_table9b042Props, setcategory_doc_table9b042Props}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel643f7, setdocumentuploadpanel643f7}= useContext(TotalContext) as TotalContextProps;
  const {button_add_doc24b11, setbutton_add_doc24b11}= useContext(TotalContext) as TotalContextProps;
  const {acat_idf572e, setacat_idf572e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupb9604,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupb9604,
        codeStates['doc_attached_groupb9604'] = doc_attached_groupb9604Props,
        codeStates['setdoc_attached_groupb9604'] = setdoc_attached_groupb9604Props,
        codeStates['table_group'] = table_groupefcb8,
        codeStates['settable_group'] = settable_groupefcb8,
        codeStates['table_groupefcb8'] = table_groupefcb8Props,
        codeStates['settable_groupefcb8'] = settable_groupefcb8Props,
        codeStates['category_doc_table'] = category_doc_table9b042,
        codeStates['setcategory_doc_table'] = setcategory_doc_table9b042,
        codeStates['category_doc_table9b042'] = category_doc_table9b042Props,
        codeStates['setcategory_doc_table9b042'] = setcategory_doc_table9b042Props,
        codeStates['documentuploadpanel'] = documentuploadpanel643f7,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanel643f7,
        codeStates['button_add_doc'] = button_add_doc24b11,
        codeStates['setbutton_add_doc'] = setbutton_add_doc24b11,
        codeStates['acat_id'] = acat_idf572e,
        codeStates['setacat_id'] = setacat_idf572e,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleDocumentSubmit = async (files:any) => {
    setdoc_attached_groupb9604((prev: any) => ({ ...prev, documentuploadpanel: files }))
      handleCustomCode()
    }

  if (documentuploadpanel643f7?.isHidden) {
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
        //disabled= {documentuploadpanel643f7?.isDisabled ? true : false}
        documentfields={ [
  {
    "id": "acat_standard",
    "label": "Standard",
    "icon": "MdOutlineDocumentScanner",
    "accept": [
      "any"
    ],
    "multiple": true
  },
  {
    "id": "acat_evidence",
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
