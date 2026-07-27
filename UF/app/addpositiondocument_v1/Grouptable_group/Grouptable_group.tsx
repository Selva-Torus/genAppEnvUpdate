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
import Groupposition_doc_table  from "../Groupposition_doc_table/Groupposition_doc_table";
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
import Textposition_id_text  from "./Textposition_id_text";
import Textposition_id  from "./Textposition_id";
import Textposition_name_text  from "./Textposition_name_text";
import Textposition_name  from "./Textposition_name";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptable_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_positiondoctable_v1Props, setdfd_positiondoctable_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "position_id_text",
      "position_id",
      "position_name_text",
      "position_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "position_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "position_id_text",
      "position_id",
      "position_name_text",
      "position_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "position_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "position_id_text",
      "position_id",
      "position_name_text",
      "position_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "position_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "position_id_text",
      "position_id",
      "position_name_text",
      "position_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "position_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "position_id_text",
      "position_id",
      "position_name_text",
      "position_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "position_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "position_id_text",
      "position_id",
      "position_name_text",
      "position_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "position_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "position_id_text",
      "position_id",
      "position_name_text",
      "position_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "position_doc_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "position_id_text",
      "position_id",
      "position_name_text",
      "position_name"
    ],
    "allowedGroups": [
      "canvas",
      "doc_attached_group",
      "table_group",
      "position_doc_table"
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
  const {doc_attached_groupedd83, setdoc_attached_groupedd83}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupedd83Props, setdoc_attached_groupedd83Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group5e697, settable_group5e697}= useContext(TotalContext) as TotalContextProps;
  const {table_group5e697Props, settable_group5e697Props}= useContext(TotalContext) as TotalContextProps;
  const {position_id_text19613, setposition_id_text19613}= useContext(TotalContext) as TotalContextProps;
  const {position_id7990c, setposition_id7990c}= useContext(TotalContext) as TotalContextProps;
  const {position_name_text4bbbe, setposition_name_text4bbbe}= useContext(TotalContext) as TotalContextProps;
  const {position_namee3147, setposition_namee3147}= useContext(TotalContext) as TotalContextProps;
  const {position_doc_tableb28d5, setposition_doc_tableb28d5}= useContext(TotalContext) as TotalContextProps;
  const {position_doc_tableb28d5Props, setposition_doc_tableb28d5Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addpositiondocument_v1, setaddpositiondocument_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:addPositionDocument:AFVK:v1',
    [user],
    'GroupTableGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "cc6c6d651ae1ba27a187f55ecd05e697");
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
    settable_group5e697Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("position_id_text")){
        setposition_id_text19613((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_id_text19613?.isDisabled==null)
      {
        setposition_id_text19613((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_id")){
        setposition_id7990c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_id7990c?.isDisabled==null)
      {
        setposition_id7990c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_name_text")){
        setposition_name_text4bbbe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_name_text4bbbe?.isDisabled==null)
      {
        setposition_name_text4bbbe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_name")){
        setposition_namee3147((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_namee3147?.isDisabled==null)
      {
        setposition_namee3147((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("position_doc_table")){
        setposition_doc_tableb28d5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(position_doc_tableb28d5?.isDisabled==null)
      {
        setposition_doc_tableb28d5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
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
        codeStates['position_id_text'] = position_id_text19613,
        codeStates['setposition_id_text'] = setposition_id_text19613,
        codeStates['position_id'] = position_id7990c,
        codeStates['setposition_id'] = setposition_id7990c,
        codeStates['position_name_text'] = position_name_text4bbbe,
        codeStates['setposition_name_text'] = setposition_name_text4bbbe,
        codeStates['position_name'] = position_namee3147,
        codeStates['setposition_name'] = setposition_namee3147,
        codeStates['position_doc_table'] = position_doc_tableb28d5,
        codeStates['setposition_doc_table'] = setposition_doc_tableb28d5,
        codeStates['position_doc_tableb28d5'] = position_doc_tableb28d5Props,
        codeStates['setposition_doc_tableb28d5'] = setposition_doc_tableb28d5Props,

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
        codeStates['doc_attached_group'] = doc_attached_groupedd83,
        codeStates['setdoc_attached_group'] = setdoc_attached_groupedd83,
        codeStates['doc_attached_groupedd83'] = doc_attached_groupedd83Props,
        codeStates['setdoc_attached_groupedd83'] = setdoc_attached_groupedd83Props,
        codeStates['table_group'] = table_group5e697,
        codeStates['settable_group'] = settable_group5e697,
        codeStates['table_group5e697'] = table_group5e697Props,
        codeStates['settable_group5e697'] = settable_group5e697Props,
        codeStates['position_id_text'] = position_id_text19613,
        codeStates['setposition_id_text'] = setposition_id_text19613,
        codeStates['position_id'] = position_id7990c,
        codeStates['setposition_id'] = setposition_id7990c,
        codeStates['position_name_text'] = position_name_text4bbbe,
        codeStates['setposition_name_text'] = setposition_name_text4bbbe,
        codeStates['position_name'] = position_namee3147,
        codeStates['setposition_name'] = setposition_namee3147,
        codeStates['position_doc_table'] = position_doc_tableb28d5,
        codeStates['setposition_doc_table'] = setposition_doc_tableb28d5,
        codeStates['position_doc_tableb28d5'] = position_doc_tableb28d5Props,
        codeStates['setposition_doc_tableb28d5'] = setposition_doc_tableb28d5Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const table_group5e697Ref = useRef<any>(null);
  const handleClearSearch = () => {
    table_group5e697Ref.current?.setSearchParams();
    table_group5e697Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(table_group5e697) && Object.keys(table_group5e697)?.length>0)
      {
        settable_group5e697({})
      }
    }else 
      prevRefreshRef.current= true
  }, [table_group5e697Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 74',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '3px',
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
          setaddpositiondocument_v1((pre:any)=>({...pre,_selectedGroup_:"table_group"}))
        }}
    >
        {allowedComponent.includes("position_doc_table")  &&<Groupposition_doc_table  
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
          {allowedControls.includes("position_id_text") ?<Textposition_id_text   /* 19613 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("position_id") ?<Textposition_id   /* 7990c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("position_name_text") ?<Textposition_name_text   /* 4bbbe */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("position_name") ?<Textposition_name   /* e3147 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptable_group
