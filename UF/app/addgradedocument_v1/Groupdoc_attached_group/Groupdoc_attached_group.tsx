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
import Textgrade_id  from "./Textgrade_id";
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
  const {dfd_gradedoctable_v1Props, setdfd_gradedoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "grade_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "grade_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "documentuploadpanel",
      "grade_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "grade_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "documentuploadpanel",
      "grade_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "grade_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "documentuploadpanel",
      "grade_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "grade_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "documentuploadpanel",
      "grade_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "grade_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "documentuploadpanel",
      "grade_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "grade_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "documentuploadpanel",
      "grade_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "grade_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "documentuploadpanel",
      "grade_id",
      "button_add_doc"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "grade_doc_table"
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
  const {doc_attached_groupe6469, setdoc_attached_groupe6469}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupe6469Props, setdoc_attached_groupe6469Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group16d33, settable_group16d33}= useContext(TotalContext) as TotalContextProps;
  const {table_group16d33Props, settable_group16d33Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_doc_tablea652a, setgrade_doc_tablea652a}= useContext(TotalContext) as TotalContextProps;
  const {grade_doc_tablea652aProps, setgrade_doc_tablea652aProps}= useContext(TotalContext) as TotalContextProps;
  const {documentuploadpanela5371, setdocumentuploadpanela5371}= useContext(TotalContext) as TotalContextProps;
  const {grade_id91bb0, setgrade_id91bb0}= useContext(TotalContext) as TotalContextProps;
  const {button_add_docc82a5, setbutton_add_docc82a5}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addgradedocument_v1, setaddgradedocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addGradeDocument:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "61581f694de0606adbbbaf00322e6469");
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
    setdoc_attached_groupe6469Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("table_group")){
        settable_group16d33((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(table_group16d33?.isDisabled==null)
      {
        settable_group16d33((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("documentuploadpanel")){
        setdocumentuploadpanela5371((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(documentuploadpanela5371?.isDisabled==null)
      {
        setdocumentuploadpanela5371((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("grade_id")){
        setgrade_id91bb0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(grade_id91bb0?.isDisabled==null)
      {
        setgrade_id91bb0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("button_add_doc")){
        setbutton_add_docc82a5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(button_add_docc82a5?.isDisabled==null)
      {
        setbutton_add_docc82a5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['doc_attached_group'] = doc_attached_groupe6469,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupe6469,
        codeStates['doc_attached_groupe6469'] = doc_attached_groupe6469Props,
        codeStates['setdoc_attached_groupe6469'] = setdoc_attached_groupe6469Props,
        codeStates['table_group'] = table_group16d33,
        codeStates['settable_group'] = settable_group16d33,
        codeStates['table_group16d33'] = table_group16d33Props,
        codeStates['settable_group16d33'] = settable_group16d33Props,
        codeStates['grade_doc_table'] = grade_doc_tablea652a,
        codeStates['setgrade_doc_table'] = setgrade_doc_tablea652a,
        codeStates['grade_doc_tablea652a'] = grade_doc_tablea652aProps,
        codeStates['setgrade_doc_tablea652a'] = setgrade_doc_tablea652aProps,
        codeStates['documentuploadpanel'] = documentuploadpanela5371,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanela5371,
        codeStates['grade_id'] = grade_id91bb0,
        codeStates['setgrade_id'] = setgrade_id91bb0,
        codeStates['button_add_doc'] = button_add_docc82a5,
        codeStates['setbutton_add_doc'] = setbutton_add_docc82a5,

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
        codeStates['doc_attached_group'] = doc_attached_groupe6469,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupe6469,
        codeStates['doc_attached_groupe6469'] = doc_attached_groupe6469Props,
        codeStates['setdoc_attached_groupe6469'] = setdoc_attached_groupe6469Props,
        codeStates['table_group'] = table_group16d33,
        codeStates['settable_group'] = settable_group16d33,
        codeStates['table_group16d33'] = table_group16d33Props,
        codeStates['settable_group16d33'] = settable_group16d33Props,
        codeStates['grade_doc_table'] = grade_doc_tablea652a,
        codeStates['setgrade_doc_table'] = setgrade_doc_tablea652a,
        codeStates['grade_doc_tablea652a'] = grade_doc_tablea652aProps,
        codeStates['setgrade_doc_tablea652a'] = setgrade_doc_tablea652aProps,
        codeStates['documentuploadpanel'] = documentuploadpanela5371,
        codeStates['setdocumentuploadpanel'] = setdocumentuploadpanela5371,
        codeStates['grade_id'] = grade_id91bb0,
        codeStates['setgrade_id'] = setgrade_id91bb0,
        codeStates['button_add_doc'] = button_add_docc82a5,
        codeStates['setbutton_add_doc'] = setbutton_add_docc82a5,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const doc_attached_groupe6469Ref = useRef<any>(null);
  const handleClearSearch = () => {
    doc_attached_groupe6469Ref.current?.setSearchParams();
    doc_attached_groupe6469Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(doc_attached_groupe6469) && Object.keys(doc_attached_groupe6469)?.length>0)
      {
        setdoc_attached_groupe6469({})
      }
    }else 
      prevRefreshRef.current= true
  }, [doc_attached_groupe6469Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 152',
      
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
          setaddgradedocument_v1((pre:any)=>({...pre,_selectedGroup_:"doc_attached_group"}))
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
        {allowedControls.includes("documentuploadpanel") ?<DocumentUploadPaneldocumentuploadpanel   /* a5371 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("grade_id") ?<Textgrade_id   /* 91bb0 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "button_add_doc" in ButtonGoRuleData)?ButtonGoRuleData["button_add_doc"]:true) && 
          allowedControls.includes("button_add_doc")  ?            <Buttonbutton_add_doc tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdoc_attached_group
