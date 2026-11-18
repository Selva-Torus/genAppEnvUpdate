
'use client'
import React, { useContext, useEffect,useState } from 'react'  
import { useGlobal } from '@/context/GlobalContext'
import { AxiosService } from "@/app/components/axiosService";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import DocumentUploadPanel from '@/components/DocumentUploadPanel';
import { codeExecution } from '@/app/utils/codeExecution';
import i18n from '@/app/components/i18n';
import { Text } from '@/components/Text';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const DocumentUploadPaneldocumentuploadpanel = ({checkToAdd,setCheckToAdd,refetch,setRefetch,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [uploaderType,setUploaderType]=useState<string>("string");
  const [allCode,setAllCode]=useState<any>("");
  let customCode:any;
  

   const handleMapper=async () => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "3ed857a8e9774161899513951a4c014d",
        "5d57b81c36bf433aac6f38075ea611bd"
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
  const singleSelect = uploaderType === "string[]" || uploaderType === "array" ? false : true;
   /////////////
   //another screen
  const {overall_evidences_groupc014d, setoverall_evidences_groupc014d}= useContext(TotalContext) as TotalContextProps;
  const {overall_evidences_groupc014dProps, setoverall_evidences_groupc014dProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_group300d2, setasset_information_group300d2}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_group300d2Props, setasset_information_group300d2Props}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_groupfe37c, setevidence_table_groupfe37c}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_groupfe37cProps, setevidence_table_groupfe37cProps}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table88d5c, setevidence_table88d5c}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table88d5cProps, setevidence_table88d5cProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_head_text584e0, setdoc_head_text584e0}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel611bd, setdocumentuploadpanel611bd}= useContext(TotalContext) as TotalContextProps;
  const {button_add_doc7661f, setbutton_add_doc7661f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_evidences_group'] = overall_evidences_groupc014d,
        codeStates['setoverall_evidences_group'] = setoverall_evidences_groupc014d,
        codeStates['overall_evidences_groupc014d'] = overall_evidences_groupc014dProps,
        codeStates['setoverall_evidences_groupc014d'] = setoverall_evidences_groupc014dProps,
        codeStates['asset_information_group'] = asset_information_group300d2,
        codeStates['setasset_information_group'] = setasset_information_group300d2,
        codeStates['asset_information_group300d2'] = asset_information_group300d2Props,
        codeStates['setasset_information_group300d2'] = setasset_information_group300d2Props,
        codeStates['evidence_table_group'] = evidence_table_groupfe37c,
        codeStates['setevidence_table_group'] = setevidence_table_groupfe37c,
        codeStates['evidence_table_groupfe37c'] = evidence_table_groupfe37cProps,
        codeStates['setevidence_table_groupfe37c'] = setevidence_table_groupfe37cProps,
        codeStates['evidence_table'] = evidence_table88d5c,
        codeStates['setevidence_table'] = setevidence_table88d5c,
        codeStates['evidence_table88d5c'] = evidence_table88d5cProps,
        codeStates['setevidence_table88d5c'] = setevidence_table88d5cProps,
        codeStates['doc_head_text'] = doc_head_text584e0,
        codeStates['setdoc_head_text'] = setdoc_head_text584e0,
        codeStates['documentuploadpanel'] = documentuploadpanel611bd,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanel611bd,
        codeStates['button_add_doc'] = button_add_doc7661f,
        codeStates['setbutton_add_doc'] = setbutton_add_doc7661f,
      customCode = codeExecution(code,codeStates);
    }
  }
  const handleDocumentSubmit = async (files:any) => {
    setoverall_evidences_groupc014d((prev: any) => ({ ...prev, documentuploadpanel: files }))
      handleCustomCode()
    }

  if (documentuploadpanel611bd?.isHidden) {
    return <></>
  }

  return (
    <div   
      style={{gridColumn: `1 / 25`,gridRow: `78 / 264`, gap:``, height: `100%`, overflow: 'auto'}} >
      <DocumentUploadPanel
        className=""
        // contentAlign={"center"}
        onChange={handleDocumentSubmit}
        singleSelect={singleSelect}
        //disabled= {documentuploadpanel611bd?.isDisabled ? true : false}
        documentfields={ [
  {
    "id": "Attach Business Evidence",
    "label": "BUSINESS",
    "icon": "MdOutlineDocumentScanner",
    "accept": [
      "any"
    ],
    "multiple": true
  },
  {
    "id": "Attach Data Evidence",
    "label": "DATA",
    "icon": "",
    "accept": [],
    "multiple": false
  },
  {
    "id": "Attach Security Evidence",
    "label": "SECURITY",
    "icon": "",
    "accept": [],
    "multiple": false
  },
  {
    "id": "Attach Model Validation Evidence",
    "label": "MODEL_VALIDATION",
    "icon": "",
    "accept": [],
    "multiple": false
  },
  {
    "id": "Attach Risk Compliance Evidence",
    "label": "RISK_COMPLIANCE",
    "icon": "",
    "accept": [],
    "multiple": false
  },
  {
    "id": "Attach Legal Evidence",
    "label": "LEGAL",
    "icon": "",
    "accept": [],
    "multiple": false
  },
  {
    "id": "Attach Architecture Evidence",
    "label": "ARCHITECTURE",
    "icon": "",
    "accept": [],
    "multiple": false
  },
  {
    "id": "Attach Release Evidence",
    "label": "RELEASE",
    "icon": "",
    "accept": [],
    "multiple": false
  },
  {
    "id": "Attach Banking Regulatory Compliance",
    "label": "Banking Regulatory Compliance",
    "icon": "",
    "accept": [],
    "multiple": false
  },
  {
    "id": "Attach NCUA Compliance",
    "label": "NCUA Compliance",
    "icon": "",
    "accept": [],
    "multiple": false
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
