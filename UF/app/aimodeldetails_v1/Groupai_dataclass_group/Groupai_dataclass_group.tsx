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
import Groupai_registry_text_group  from "../Groupai_registry_text_group/Groupai_registry_text_group";
import Groupai_dataclass_table  from "../Groupai_dataclass_table/Groupai_dataclass_table";
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
import Buttonrefresh_button  from "./Buttonrefresh_button";
import Buttonsearch  from "./Buttonsearch";
import Buttonadd_model  from "./Buttonadd_model";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_dataclass_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const { token } = useGlobal();
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
  const {dfd_modeldetails_v1Props, setdfd_modeldetails_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "AI Product Owner": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_model"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_model"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_model"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_model"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_model"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_model"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "refresh_button",
      "search",
      "add_model"
    ],
    "allowedGroups": [
      "canvas",
      "overall_ai_data_class",
      "ai_dataclass_group",
      "ai_registry_text_group",
      "ai_dataclass_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const handleOnloadCalledRef = useRef(false);
  const securityCheckPromiseRef = useRef<Promise<any> | null>(null);
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
  const {overall_ai_data_class16ac0, setoverall_ai_data_class16ac0}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_data_class16ac0Props, setoverall_ai_data_class16ac0Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group790bb, setai_dataclass_group790bb}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group790bbProps, setai_dataclass_group790bbProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupd028b, setai_registry_text_groupd028b}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupd028bProps, setai_registry_text_groupd028bProps}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button22de6, setrefresh_button22de6}= useContext(TotalContext) as TotalContextProps;
  const {searchd7f79, setsearchd7f79}= useContext(TotalContext) as TotalContextProps;
  const {add_model23ec1, setadd_model23ec1}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabled37dd, setai_dataclass_tabled37dd}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabled37ddProps, setai_dataclass_tabled37ddProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {aimodeldetails_v1, setaimodeldetails_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIModelDetails:AFVK:v1',
    [user],
    'GroupAiDataclassGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "12ce806be8b5a7281a7ab6e40ff790bb");
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
    setai_dataclass_group790bbProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("ai_registry_text_group")){
        setai_registry_text_groupd028b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_registry_text_groupd028b?.isDisabled==null)
      {
        setai_registry_text_groupd028b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("refresh_button")){
        setrefresh_button22de6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(refresh_button22de6?.isDisabled==null)
      {
        setrefresh_button22de6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearchd7f79((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(searchd7f79?.isDisabled==null)
      {
        setsearchd7f79((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_model")){
        setadd_model23ec1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(add_model23ec1?.isDisabled==null)
      {
        setadd_model23ec1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_dataclass_table")){
        setai_dataclass_tabled37ddProps((pre:any)=>({...pre,...ai_dataclass_tabled37dd,isDisabled:true}));

    }else
    {
      if(ai_dataclass_tabled37dd?.isDisabled==null)
      {
        setai_dataclass_tabled37ddProps((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_data_class'] = overall_ai_data_class16ac0,
        codeStates['setoverall_ai_data_class'] = setoverall_ai_data_class16ac0,
        codeStates['overall_ai_data_class16ac0'] = overall_ai_data_class16ac0Props,
        codeStates['setoverall_ai_data_class16ac0'] = setoverall_ai_data_class16ac0Props,
        codeStates['ai_dataclass_group'] = ai_dataclass_group790bb,
        codeStates['setai_dataclass_group'] = setai_dataclass_group790bb,
        codeStates['ai_dataclass_group790bb'] = ai_dataclass_group790bbProps,
        codeStates['setai_dataclass_group790bb'] = setai_dataclass_group790bbProps,
        codeStates['ai_registry_text_group'] = ai_registry_text_groupd028b,
        codeStates['setai_registry_text_group'] = setai_registry_text_groupd028b,
        codeStates['ai_registry_text_groupd028b'] = ai_registry_text_groupd028bProps,
        codeStates['setai_registry_text_groupd028b'] = setai_registry_text_groupd028bProps,
        codeStates['refresh_button'] = refresh_button22de6,
        codeStates['setrefresh_button'] = setrefresh_button22de6,
        codeStates['search'] = searchd7f79,
        codeStates['setsearch'] = setsearchd7f79,
        codeStates['add_model'] = add_model23ec1,
        codeStates['setadd_model'] = setadd_model23ec1,
        codeStates['ai_dataclass_table'] = ai_dataclass_tabled37dd,
        codeStates['setai_dataclass_table'] = setai_dataclass_tabled37dd,
        codeStates['ai_dataclass_tabled37dd'] = ai_dataclass_tabled37ddProps,
        codeStates['setai_dataclass_tabled37dd'] = setai_dataclass_tabled37ddProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "12ce806be8b5a7281a7ab6e40ff790bb");
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
  }


    const handleOnload=()=>{
  }
  const handleOnChange=async ()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['overall_ai_data_class'] = overall_ai_data_class16ac0,
        codeStates['setoverall_ai_data_class'] = setoverall_ai_data_class16ac0,
        codeStates['overall_ai_data_class16ac0'] = overall_ai_data_class16ac0Props,
        codeStates['setoverall_ai_data_class16ac0'] = setoverall_ai_data_class16ac0Props,
        codeStates['ai_dataclass_group'] = ai_dataclass_group790bb,
        codeStates['setai_dataclass_group'] = setai_dataclass_group790bb,
        codeStates['ai_dataclass_group790bb'] = ai_dataclass_group790bbProps,
        codeStates['setai_dataclass_group790bb'] = setai_dataclass_group790bbProps,
        codeStates['ai_registry_text_group'] = ai_registry_text_groupd028b,
        codeStates['setai_registry_text_group'] = setai_registry_text_groupd028b,
        codeStates['ai_registry_text_groupd028b'] = ai_registry_text_groupd028bProps,
        codeStates['setai_registry_text_groupd028b'] = setai_registry_text_groupd028bProps,
        codeStates['refresh_button'] = refresh_button22de6,
        codeStates['setrefresh_button'] = setrefresh_button22de6,
        codeStates['search'] = searchd7f79,
        codeStates['setsearch'] = setsearchd7f79,
        codeStates['add_model'] = add_model23ec1,
        codeStates['setadd_model'] = setadd_model23ec1,
        codeStates['ai_dataclass_table'] = ai_dataclass_tabled37dd,
        codeStates['setai_dataclass_table'] = setai_dataclass_tabled37dd,
        codeStates['ai_dataclass_tabled37dd'] = ai_dataclass_tabled37ddProps,
        codeStates['setai_dataclass_tabled37dd'] = setai_dataclass_tabled37ddProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_dataclass_group790bbRef = useRef<any>(null);
  const handleClearSearch = () => {
    ai_dataclass_group790bbRef.current?.setSearchParams();
    ai_dataclass_group790bbRef.current?.handleSearch({});
  };

  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(ai_dataclass_group790bb) &&
        Object.keys(ai_dataclass_group790bb)?.length > 0
      ) {
        setai_dataclass_group790bb({})
      }
    } else prevRefreshRef.current = true
  }, [ai_dataclass_group790bbProps?.refresh])


  useEffect(() => {
    subscreenCheck()
  }, [])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 151',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaimodeldetails_v1((pre:any)=>({...pre,_selectedGroup_:"ai_dataclass_group"}))
        }}
    >
        {allowedComponent.includes("ai_registry_text_group")  &&<Groupai_registry_text_group  
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
        {allowedComponent.includes("ai_dataclass_table")  &&<Groupai_dataclass_table  
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
        {        ((ruleData?.length>0 && "refresh_button" in ButtonGoRuleData)?ButtonGoRuleData["refresh_button"]:true) && 
          allowedControls.includes("refresh_button")  ?            <Buttonrefresh_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search" in ButtonGoRuleData)?ButtonGoRuleData["search"]:true) && 
          allowedControls.includes("search")  ?            <Buttonsearch tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "add_model" in ButtonGoRuleData)?ButtonGoRuleData["add_model"]:true) && 
          allowedControls.includes("add_model")  ?            <Buttonadd_model tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupai_dataclass_group
