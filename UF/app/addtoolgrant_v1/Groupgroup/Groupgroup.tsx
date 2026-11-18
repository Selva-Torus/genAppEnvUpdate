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
import Grouptemplate_detail_group  from "../Grouptemplate_detail_group/Grouptemplate_detail_group";
import Groupdynamicaction  from "../Groupdynamicaction/Groupdynamicaction";
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
import Textai_asset_id  from "./Textai_asset_id";
import Texttool_grant_id  from "./Texttool_grant_id";
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
  const {dfd_toolgrant_v1Props, setdfd_toolgrant_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_toolgrantagentname_v1Props, setdfd_toolgrantagentname_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_toolgrantassetcombo_v1Props, setdfd_toolgrantassetcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "ai_asset_id",
      "tool_grant_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "ai_asset_id",
      "tool_grant_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "ai_asset_id",
      "tool_grant_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "ai_asset_id",
      "tool_grant_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "ai_asset_id",
      "tool_grant_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "ai_asset_id",
      "tool_grant_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "ai_asset_id",
      "tool_grant_id"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "dynamicaction"
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
  const {groupc4c71, setgroupc4c71}= useContext(TotalContext) as TotalContextProps;
  const {groupc4c71Props, setgroupc4c71Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupe14a2, settemplate_detail_groupe14a2}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupe14a2Props, settemplate_detail_groupe14a2Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_iddbac8, setai_asset_iddbac8}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionce43b, setdynamicactionce43b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionce43bProps, setdynamicactionce43bProps}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_id91c18, settool_grant_id91c18}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addtoolgrant_v1, setaddtoolgrant_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addToolGrant:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d9ba546f4c7a89cfd54d1892e30c4c71");
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
    setgroupc4c71Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("template_detail_group")){
        settemplate_detail_groupe14a2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_detail_groupe14a2?.isDisabled==null)
      {
        settemplate_detail_groupe14a2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_iddbac8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_iddbac8?.isDisabled==null)
      {
        setai_asset_iddbac8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dynamicaction")){
        setdynamicactionce43b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dynamicactionce43b?.isDisabled==null)
      {
        setdynamicactionce43b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tool_grant_id")){
        settool_grant_id91c18((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tool_grant_id91c18?.isDisabled==null)
      {
        settool_grant_id91c18((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupc4c71,
        codeStates['setgroup'] = setgroupc4c71,
        codeStates['groupc4c71'] = groupc4c71Props,
        codeStates['setgroupc4c71'] = setgroupc4c71Props,
        codeStates['template_detail_group'] = template_detail_groupe14a2,
        codeStates['settemplate_detail_group'] = settemplate_detail_groupe14a2,
        codeStates['template_detail_groupe14a2'] = template_detail_groupe14a2Props,
        codeStates['settemplate_detail_groupe14a2'] = settemplate_detail_groupe14a2Props,
        codeStates['ai_asset_id'] = ai_asset_iddbac8,
        codeStates['setai_asset_id'] = setai_asset_iddbac8,
        codeStates['dynamicaction'] = dynamicactionce43b,
        codeStates['setdynamicaction'] = setdynamicactionce43b,
        codeStates['dynamicactionce43b'] = dynamicactionce43bProps,
        codeStates['setdynamicactionce43b'] = setdynamicactionce43bProps,
        codeStates['tool_grant_id'] = tool_grant_id91c18,
        codeStates['settool_grant_id'] = settool_grant_id91c18,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "d9ba546f4c7a89cfd54d1892e30c4c71");
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
        codeStates['group'] = groupc4c71,
        codeStates['setgroup'] = setgroupc4c71,
        codeStates['groupc4c71'] = groupc4c71Props,
        codeStates['setgroupc4c71'] = setgroupc4c71Props,
        codeStates['template_detail_group'] = template_detail_groupe14a2,
        codeStates['settemplate_detail_group'] = settemplate_detail_groupe14a2,
        codeStates['template_detail_groupe14a2'] = template_detail_groupe14a2Props,
        codeStates['settemplate_detail_groupe14a2'] = settemplate_detail_groupe14a2Props,
        codeStates['ai_asset_id'] = ai_asset_iddbac8,
        codeStates['setai_asset_id'] = setai_asset_iddbac8,
        codeStates['dynamicaction'] = dynamicactionce43b,
        codeStates['setdynamicaction'] = setdynamicactionce43b,
        codeStates['dynamicactionce43b'] = dynamicactionce43bProps,
        codeStates['setdynamicactionce43b'] = setdynamicactionce43bProps,
        codeStates['tool_grant_id'] = tool_grant_id91c18,
        codeStates['settool_grant_id'] = settool_grant_id91c18,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const groupc4c71Ref = useRef<any>(null);
  const handleClearSearch = () => {
    groupc4c71Ref.current?.setSearchParams();
    groupc4c71Ref.current?.handleSearch({});
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
        !Array.isArray(groupc4c71) &&
        Object.keys(groupc4c71)?.length > 0
      ) {
        setgroupc4c71({})
        setgroupc4c71Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [groupc4c71Props?.refresh])


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
        gridRow: '1 / 55',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '11px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md !p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddtoolgrant_v1((pre:any)=>({...pre,_selectedGroup_:"group"}))
        }}
    >
        {allowedComponent.includes("template_detail_group")  &&<Grouptemplate_detail_group  
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
        {allowedComponent.includes("dynamicaction")  &&<Groupdynamicaction  
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
          {allowedControls.includes("ai_asset_id") ?<Textai_asset_id   /* dbac8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("tool_grant_id") ?<Texttool_grant_id   /* 91c18 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupgroup
