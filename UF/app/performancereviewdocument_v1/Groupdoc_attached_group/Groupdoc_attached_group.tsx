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
import Textreview_id  from "./Textreview_id";
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
  const {dfd_performancereviewdoctable_v1Props, setdfd_performancereviewdoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "review_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "documentuploadpanel",
      "review_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "documentuploadpanel",
      "review_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "documentuploadpanel",
      "review_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "documentuploadpanel",
      "review_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "documentuploadpanel",
      "review_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "documentuploadpanel",
      "review_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "documentuploadpanel",
      "review_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "employee_doc_table"
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
  const {doc_attached_group8ed8b, setdoc_attached_group8ed8b}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group8ed8bProps, setdoc_attached_group8ed8bProps}= useContext(TotalContext) as TotalContextProps;
  const {table_group106c4, settable_group106c4}= useContext(TotalContext) as TotalContextProps;
  const {table_group106c4Props, settable_group106c4Props}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tabled849d, setemployee_doc_tabled849d}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tabled849dProps, setemployee_doc_tabled849dProps}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanel9d802, setdocumentuploadpanel9d802}= useContext(TotalContext) as TotalContextProps;
  const {review_idea959, setreview_idea959}= useContext(TotalContext) as TotalContextProps;
  const {button_add_docb64ae, setbutton_add_docb64ae}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {performancereviewdocument_v1, setperformancereviewdocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceReviewDocument:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "46d22986c7d2f89a42104d7f2b68ed8b");
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
    setdoc_attached_group8ed8bProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("table_group")){
        settable_group106c4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(table_group106c4?.isDisabled==null)
      {
        settable_group106c4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("documentuploadpanel")){
        setdocumentuploadpanel9d802((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(documentuploadpanel9d802?.isDisabled==null)
      {
        setdocumentuploadpanel9d802((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("review_id")){
        setreview_idea959((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(review_idea959?.isDisabled==null)
      {
        setreview_idea959((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("button_add_doc")){
        setbutton_add_docb64ae((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(button_add_docb64ae?.isDisabled==null)
      {
        setbutton_add_docb64ae((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_group8ed8b,
        codeStates['setdoc_attached_group'] = setdoc_attached_group8ed8b,
        codeStates['doc_attached_group8ed8b'] = doc_attached_group8ed8bProps,
        codeStates['setdoc_attached_group8ed8b'] = setdoc_attached_group8ed8bProps,
        codeStates['table_group'] = table_group106c4,
        codeStates['settable_group'] = settable_group106c4,
        codeStates['table_group106c4'] = table_group106c4Props,
        codeStates['settable_group106c4'] = settable_group106c4Props,
        codeStates['employee_doc_table'] = employee_doc_tabled849d,
        codeStates['setemployee_doc_table'] = setemployee_doc_tabled849d,
        codeStates['employee_doc_tabled849d'] = employee_doc_tabled849dProps,
        codeStates['setemployee_doc_tabled849d'] = setemployee_doc_tabled849dProps,
        codeStates['documentuploadpanel'] = documentuploadpanel9d802,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanel9d802,
        codeStates['review_id'] = review_idea959,
        codeStates['setreview_id'] = setreview_idea959,
        codeStates['button_add_doc'] = button_add_docb64ae,
        codeStates['setbutton_add_doc'] = setbutton_add_docb64ae,

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
        codeStates['doc_attached_group'] = doc_attached_group8ed8b,
        codeStates['setdoc_attached_group'] = setdoc_attached_group8ed8b,
        codeStates['doc_attached_group8ed8b'] = doc_attached_group8ed8bProps,
        codeStates['setdoc_attached_group8ed8b'] = setdoc_attached_group8ed8bProps,
        codeStates['table_group'] = table_group106c4,
        codeStates['settable_group'] = settable_group106c4,
        codeStates['table_group106c4'] = table_group106c4Props,
        codeStates['settable_group106c4'] = settable_group106c4Props,
        codeStates['employee_doc_table'] = employee_doc_tabled849d,
        codeStates['setemployee_doc_table'] = setemployee_doc_tabled849d,
        codeStates['employee_doc_tabled849d'] = employee_doc_tabled849dProps,
        codeStates['setemployee_doc_tabled849d'] = setemployee_doc_tabled849dProps,
        codeStates['documentuploadpanel'] = documentuploadpanel9d802,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanel9d802,
        codeStates['review_id'] = review_idea959,
        codeStates['setreview_id'] = setreview_idea959,
        codeStates['button_add_doc'] = button_add_docb64ae,
        codeStates['setbutton_add_doc'] = setbutton_add_docb64ae,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const doc_attached_group8ed8bRef = useRef<any>(null);
  const handleClearSearch = () => {
    doc_attached_group8ed8bRef.current?.setSearchParams();
    doc_attached_group8ed8bRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(doc_attached_group8ed8b) && Object.keys(doc_attached_group8ed8b)?.length>0)
      {
        setdoc_attached_group8ed8b({})
      }
    }else 
      prevRefreshRef.current= true
  }, [doc_attached_group8ed8bProps?.refresh,token])


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
          setperformancereviewdocument_v1((pre:any)=>({...pre,_selectedGroup_:"doc_attached_group"}))
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
        {allowedControls.includes("documentuploadpanel") ?<DocumentUploadPaneldocumentuploadpanel   /* 9d802 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("review_id") ?<Textreview_id   /* ea959 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "button_add_doc" in ButtonGoRuleData)?ButtonGoRuleData["button_add_doc"]:true) && 
          allowedControls.includes("button_add_doc")  ?            <Buttonbutton_add_doc tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdoc_attached_group
