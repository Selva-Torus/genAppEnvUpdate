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
import Textai_asset_id  from "./Textai_asset_id";
import TextInputasset_code  from "./TextInputasset_code";
import TextInputasset_name  from "./TextInputasset_name";
import TextInputcert_code  from "./TextInputcert_code";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_listallshowstages_v1Props, setdfd_listallshowstages_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "text",
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "text",
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "text",
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "text",
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "text",
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "text",
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "cert_code"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "ai_asset_version_table_group",
      "group",
      "stages_table"
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
  const {overall_groupd5c13, setoverall_groupd5c13}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupd5c13Props, setoverall_groupd5c13Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group5cbf6, setai_asset_version_table_group5cbf6}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group5cbf6Props, setai_asset_version_table_group5cbf6Props}= useContext(TotalContext) as TotalContextProps;
  const {group32bca, setgroup32bca}= useContext(TotalContext) as TotalContextProps;
  const {group32bcaProps, setgroup32bcaProps}= useContext(TotalContext) as TotalContextProps;
  const {textc163f, settextc163f}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id57a19, setai_asset_id57a19}= useContext(TotalContext) as TotalContextProps;
  const {asset_code51e40, setasset_code51e40}= useContext(TotalContext) as TotalContextProps;
  const {asset_name86039, setasset_name86039}= useContext(TotalContext) as TotalContextProps;
  const {cert_code4b493, setcert_code4b493}= useContext(TotalContext) as TotalContextProps;
  const {stages_table01d82, setstages_table01d82}= useContext(TotalContext) as TotalContextProps;
  const {stages_table01d82Props, setstages_table01d82Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {liststagesbyloginid_v1, setliststagesbyloginid_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ListStagesByLoginId:AFVK:v1',
    [user],
    'GroupGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8bfab37decba304b3419fb1925232bca");
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
    setgroup32bcaProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextc163f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textc163f?.isDisabled==null)
      {
        settextc163f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_id57a19((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_id57a19?.isDisabled==null)
      {
        setai_asset_id57a19((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_code")){
        setasset_code51e40((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_code51e40?.isDisabled==null)
      {
        setasset_code51e40((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("asset_name")){
        setasset_name86039((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(asset_name86039?.isDisabled==null)
      {
        setasset_name86039((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_code")){
        setcert_code4b493((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_code4b493?.isDisabled==null)
      {
        setcert_code4b493((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupd5c13,
        codeStates['setoverall_group'] = setoverall_groupd5c13,
        codeStates['overall_groupd5c13'] = overall_groupd5c13Props,
        codeStates['setoverall_groupd5c13'] = setoverall_groupd5c13Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group5cbf6,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group5cbf6,
        codeStates['ai_asset_version_table_group5cbf6'] = ai_asset_version_table_group5cbf6Props,
        codeStates['setai_asset_version_table_group5cbf6'] = setai_asset_version_table_group5cbf6Props,
        codeStates['group'] = group32bca,
        codeStates['setgroup'] = setgroup32bca,
        codeStates['group32bca'] = group32bcaProps,
        codeStates['setgroup32bca'] = setgroup32bcaProps,
        codeStates['text'] = textc163f,
        codeStates['settext'] = settextc163f,
        codeStates['ai_asset_id'] = ai_asset_id57a19,
        codeStates['setai_asset_id'] = setai_asset_id57a19,
        codeStates['asset_code'] = asset_code51e40,
        codeStates['setasset_code'] = setasset_code51e40,
        codeStates['asset_name'] = asset_name86039,
        codeStates['setasset_name'] = setasset_name86039,
        codeStates['cert_code'] = cert_code4b493,
        codeStates['setcert_code'] = setcert_code4b493,
        codeStates['stages_table'] = stages_table01d82,
        codeStates['setstages_table'] = setstages_table01d82,
        codeStates['stages_table01d82'] = stages_table01d82Props,
        codeStates['setstages_table01d82'] = setstages_table01d82Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8bfab37decba304b3419fb1925232bca");
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
        codeStates['overall_group'] = overall_groupd5c13,
        codeStates['setoverall_group'] = setoverall_groupd5c13,
        codeStates['overall_groupd5c13'] = overall_groupd5c13Props,
        codeStates['setoverall_groupd5c13'] = setoverall_groupd5c13Props,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group5cbf6,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group5cbf6,
        codeStates['ai_asset_version_table_group5cbf6'] = ai_asset_version_table_group5cbf6Props,
        codeStates['setai_asset_version_table_group5cbf6'] = setai_asset_version_table_group5cbf6Props,
        codeStates['group'] = group32bca,
        codeStates['setgroup'] = setgroup32bca,
        codeStates['group32bca'] = group32bcaProps,
        codeStates['setgroup32bca'] = setgroup32bcaProps,
        codeStates['text'] = textc163f,
        codeStates['settext'] = settextc163f,
        codeStates['ai_asset_id'] = ai_asset_id57a19,
        codeStates['setai_asset_id'] = setai_asset_id57a19,
        codeStates['asset_code'] = asset_code51e40,
        codeStates['setasset_code'] = setasset_code51e40,
        codeStates['asset_name'] = asset_name86039,
        codeStates['setasset_name'] = setasset_name86039,
        codeStates['cert_code'] = cert_code4b493,
        codeStates['setcert_code'] = setcert_code4b493,
        codeStates['stages_table'] = stages_table01d82,
        codeStates['setstages_table'] = setstages_table01d82,
        codeStates['stages_table01d82'] = stages_table01d82Props,
        codeStates['setstages_table01d82'] = setstages_table01d82Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const group32bcaRef = useRef<any>(null);
  const handleClearSearch = () => {
    group32bcaRef.current?.setSearchParams();
    group32bcaRef.current?.handleSearch({});
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
        !Array.isArray(group32bca) &&
        Object.keys(group32bca)?.length > 0
      ) {
        setgroup32bca({})
        setgroup32bcaProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [group32bcaProps?.refresh])


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
        gridRow: '1 / 27',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '8px',
        backgroundColor:'#f5f5f7',
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
          setliststagesbyloginid_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
          {allowedControls.includes("text") ?<Texttext   /* c163f */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("ai_asset_id") ?<Textai_asset_id   /* 57a19 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_code") ?<TextInputasset_code   /* 51e40 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("asset_name") ?<TextInputasset_name   /* 86039 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cert_code") ?<TextInputcert_code   /* 4b493 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
