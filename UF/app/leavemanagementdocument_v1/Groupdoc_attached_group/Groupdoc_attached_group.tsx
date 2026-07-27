'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { getGroupOrchestrationData, getControlOrchestrationData, fetchBatchData } from '@/app/utils/Orchestration';
import { AxiosService } from '@/app/components/axiosService';
import { api_paginationDto, uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleGroupArrayCopyFormData } from '@/app/utils/commonfunctions'; 
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import Grouptable_group  from "../Grouptable_group/Grouptable_group";
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable,{ evaluateDecisionForDynamicActions,eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import uoMapperData from '@/context/dfdmapperContolnames.json';
import DocumentUploadPaneldocumentuploadpanel  from "./DocumentUploadPaneldocumentuploadpanel";
import Textleave_req_id  from "./Textleave_req_id";
import Buttonbutton_add_doc  from "./Buttonbutton_add_doc";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdoc_attached_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const token:string = getCookie('token'); 
  const decodedTokenObj:any = decodeToken(token);
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const copyFormData=useHandleGroupArrayCopyFormData()
  const [groupData, setGroupData] = useState<any>(groupDataProp);
  const [controlData, setControlData] = useState<any>(controlDataProp);
  let code:any = ``;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_leavemanagedoctable_v1Props, setdfd_leavemanagedoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagComp: boolean = encryptionFlagPageData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagPageData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagPageData?.method;
  let encryptionFlagCompData :any ={
    "flag":encryptionFlagComp,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  };
  const [showFlag, setShowFlag] = React.useState<string>("");
  const securityData:any={
  "CXO": {
    "allowedControls": [
      "documentuploadpanel",
      "leave_req_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "documentuploadpanel",
      "leave_req_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "documentuploadpanel",
      "leave_req_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "documentuploadpanel",
      "leave_req_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "documentuploadpanel",
      "leave_req_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "documentuploadpanel",
      "leave_req_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "documentuploadpanel",
      "leave_req_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "documentuploadpanel",
      "leave_req_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "request_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({});
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
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
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {leavemanagementdocument_v1, setleavemanagementdocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leaveManagementDocument:AFVK:v1',
    [user],
    'GroupDocAttachedGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ffda8670f0fc192442a6d97bd4fe2bd6");
  code = orchestrationData?.data?.code;
  setAllCode(code)
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    setRuleData(orchestrationData?.data?.rule?.nodes)
    setdoc_attached_groupe2bd6Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("table_group")){
        settable_groupf34e5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(table_groupf34e5?.isDisabled==null)
      {
        settable_groupf34e5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("documentuploadpanel")){
        setdocumentuploadpanelbe83c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(documentuploadpanelbe83c?.isDisabled==null)
      {
        setdocumentuploadpanelbe83c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("leave_req_id")){
        setleave_req_id072b8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(leave_req_id072b8?.isDisabled==null)
      {
        setleave_req_id072b8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("button_add_doc")){
        setbutton_add_docdaa1e((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(button_add_docdaa1e?.isDisabled==null)
      {
        setbutton_add_docdaa1e((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
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

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
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
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const doc_attached_groupe2bd6Ref = useRef<any>(null);
  const handleClearSearch = () => {
    doc_attached_groupe2bd6Ref.current?.setSearchParams();
    doc_attached_groupe2bd6Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(doc_attached_groupe2bd6) && Object.keys(doc_attached_groupe2bd6)?.length>0)
      {
        setdoc_attached_groupe2bd6({})
      }
    }else 
      prevRefreshRef.current= true
  }, [doc_attached_groupe2bd6Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 162',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setleavemanagementdocument_v1((pre:any)=>({...pre,_selectedGroup_:"doc_attached_group"}))
        }}
    >
        {allowedComponent.includes("table_group")  &&<Grouptable_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedControls.includes("documentuploadpanel") ?<DocumentUploadPaneldocumentuploadpanel   /* be83c */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("leave_req_id") ?<Textleave_req_id   /* 072b8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "button_add_doc" in ButtonGoRuleData)?ButtonGoRuleData["button_add_doc"]:true) && 
          allowedControls.includes("button_add_doc")  ?            <Buttonbutton_add_doc tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdoc_attached_group
