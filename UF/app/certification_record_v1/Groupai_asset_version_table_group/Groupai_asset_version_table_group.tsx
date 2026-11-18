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
import Groupcertificate_table  from "../Groupcertificate_table/Groupcertificate_table";
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
import Texttext  from "./Texttext";
import Buttonrefresh_button  from "./Buttonrefresh_button";
import Buttonsearch_btn  from "./Buttonsearch_btn";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupai_asset_version_table_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetlist_v1Props, setdfd_assetlist_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "text",
      "refresh_button",
      "search_btn"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "text",
      "refresh_button",
      "search_btn"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "text",
      "refresh_button",
      "search_btn"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "text",
      "refresh_button",
      "search_btn"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "text",
      "refresh_button",
      "search_btn"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "text",
      "refresh_button",
      "search_btn"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "text",
      "refresh_button",
      "search_btn"
    ],
    "allowedGroups": [
      "search_btn",
      "overall_group",
      "ai_asset_version_table_group",
      "certificate_table"
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
  const {overall_groupedc31, setoverall_groupedc31}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupedc31Props, setoverall_groupedc31Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupc80e0, setai_asset_version_table_groupc80e0}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupc80e0Props, setai_asset_version_table_groupc80e0Props}= useContext(TotalContext) as TotalContextProps;
  const {text1d11f, settext1d11f}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button83c8a, setrefresh_button83c8a}= useContext(TotalContext) as TotalContextProps;
  const {search_btn6778f, setsearch_btn6778f}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tableaa941, setcertificate_tableaa941}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tableaa941Props, setcertificate_tableaa941Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {certification_v1, setcertification_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certification:AFVK:v1',
    [user],
    'GroupAiAssetVersionTableGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5bf6ed390cfa9c859b765723667c80e0");
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
    setai_asset_version_table_groupc80e0Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext1d11f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text1d11f?.isDisabled==null)
      {
        settext1d11f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("refresh_button")){
        setrefresh_button83c8a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(refresh_button83c8a?.isDisabled==null)
      {
        setrefresh_button83c8a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_btn")){
        setsearch_btn6778f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(search_btn6778f?.isDisabled==null)
      {
        setsearch_btn6778f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("certificate_table")){
        setcertificate_tableaa941Props((pre:any)=>({...pre,...certificate_tableaa941,isDisabled:true}));

    }else
    {
      if(certificate_tableaa941?.isDisabled==null)
      {
        setcertificate_tableaa941Props((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupedc31,
        codeStates['setoverall_group'] = setoverall_groupedc31,
        codeStates['overall_groupedc31'] = overall_groupedc31Props,
        codeStates['setoverall_groupedc31'] = setoverall_groupedc31Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_groupc80e0,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_groupc80e0,
        codeStates['ai_asset_version_table_groupc80e0'] = ai_asset_version_table_groupc80e0Props,
        codeStates['setai_asset_version_table_groupc80e0'] = setai_asset_version_table_groupc80e0Props,
        codeStates['text'] = text1d11f,
        codeStates['settext'] = settext1d11f,
        codeStates['refresh_button'] = refresh_button83c8a,
        codeStates['setrefresh_button'] = setrefresh_button83c8a,
        codeStates['search_btn'] = search_btn6778f,
        codeStates['setsearch_btn'] = setsearch_btn6778f,
        codeStates['certificate_table'] = certificate_tableaa941,
        codeStates['setcertificate_table'] = setcertificate_tableaa941,
        codeStates['certificate_tableaa941'] = certificate_tableaa941Props,
        codeStates['setcertificate_tableaa941'] = setcertificate_tableaa941Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5bf6ed390cfa9c859b765723667c80e0");
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
        codeStates['overall_group'] = overall_groupedc31,
        codeStates['setoverall_group'] = setoverall_groupedc31,
        codeStates['overall_groupedc31'] = overall_groupedc31Props,
        codeStates['setoverall_groupedc31'] = setoverall_groupedc31Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_groupc80e0,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_groupc80e0,
        codeStates['ai_asset_version_table_groupc80e0'] = ai_asset_version_table_groupc80e0Props,
        codeStates['setai_asset_version_table_groupc80e0'] = setai_asset_version_table_groupc80e0Props,
        codeStates['text'] = text1d11f,
        codeStates['settext'] = settext1d11f,
        codeStates['refresh_button'] = refresh_button83c8a,
        codeStates['setrefresh_button'] = setrefresh_button83c8a,
        codeStates['search_btn'] = search_btn6778f,
        codeStates['setsearch_btn'] = setsearch_btn6778f,
        codeStates['certificate_table'] = certificate_tableaa941,
        codeStates['setcertificate_table'] = setcertificate_tableaa941,
        codeStates['certificate_tableaa941'] = certificate_tableaa941Props,
        codeStates['setcertificate_tableaa941'] = setcertificate_tableaa941Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const ai_asset_version_table_groupc80e0Ref = useRef<any>(null);
  const handleClearSearch = () => {
    ai_asset_version_table_groupc80e0Ref.current?.setSearchParams();
    ai_asset_version_table_groupc80e0Ref.current?.handleSearch({});
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
        !Array.isArray(ai_asset_version_table_groupc80e0) &&
        Object.keys(ai_asset_version_table_groupc80e0)?.length > 0
      ) {
        setai_asset_version_table_groupc80e0({})
        setai_asset_version_table_groupc80e0Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [ai_asset_version_table_groupc80e0Props?.refresh])


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
        gridRow: '1 / 147',
      
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
      className={`flex flex-col overflow-auto rounded-md p-2  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setcertification_v1((pre:any)=>({...pre,_selectedGroup_:"ai_asset_version_table_group"}))
        }}
    >
        {allowedComponent.includes("certificate_table")  &&<Groupcertificate_table  
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
          {allowedControls.includes("text") ?<Texttext   /* 1d11f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {        ((ruleData?.length>0 && "refresh_button" in ButtonGoRuleData)?ButtonGoRuleData["refresh_button"]:true) && 
          allowedControls.includes("refresh_button")  ?            <Buttonrefresh_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "search_btn" in ButtonGoRuleData)?ButtonGoRuleData["search_btn"]:true) && 
          allowedControls.includes("search_btn")  ?            <Buttonsearch_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupai_asset_version_table_group
