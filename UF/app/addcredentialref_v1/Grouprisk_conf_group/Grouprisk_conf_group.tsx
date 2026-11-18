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
import Textlifecycle_text  from "./Textlifecycle_text";
import TextInputrotation_days  from "./TextInputrotation_days";
import DatePickerlast_rotated_at  from "./DatePickerlast_rotated_at";
import DatePickerexpires_at  from "./DatePickerexpires_at";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouprisk_conf_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_credentialref_v1Props, setdfd_credentialref_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "lifecycle_text",
      "rotation_days",
      "last_rotated_at",
      "expires_at"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "action_details_group",
      "action_detail_group",
      "risk_conf_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "lifecycle_text",
      "rotation_days",
      "last_rotated_at",
      "expires_at"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "action_details_group",
      "action_detail_group",
      "risk_conf_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "lifecycle_text",
      "rotation_days",
      "last_rotated_at",
      "expires_at"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "action_details_group",
      "action_detail_group",
      "risk_conf_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "lifecycle_text",
      "rotation_days",
      "last_rotated_at",
      "expires_at"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "action_details_group",
      "action_detail_group",
      "risk_conf_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "lifecycle_text",
      "rotation_days",
      "last_rotated_at",
      "expires_at"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "action_details_group",
      "action_detail_group",
      "risk_conf_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "lifecycle_text",
      "rotation_days",
      "last_rotated_at",
      "expires_at"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "action_details_group",
      "action_detail_group",
      "risk_conf_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "lifecycle_text",
      "rotation_days",
      "last_rotated_at",
      "expires_at"
    ],
    "allowedGroups": [
      "canvas",
      "overall_group",
      "action_details_group",
      "action_detail_group",
      "risk_conf_group",
      "dynamicactions"
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
  const {overall_group28e6a, setoverall_group28e6a}= useContext(TotalContext) as TotalContextProps;
  const {overall_group28e6aProps, setoverall_group28e6aProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group24206, setaction_details_group24206}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group24206Props, setaction_details_group24206Props}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group383de, setaction_detail_group383de}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group383deProps, setaction_detail_group383deProps}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group5fe07, setrisk_conf_group5fe07}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group5fe07Props, setrisk_conf_group5fe07Props}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_text3e4de, setlifecycle_text3e4de}= useContext(TotalContext) as TotalContextProps;
  const {rotation_days8bd75, setrotation_days8bd75}= useContext(TotalContext) as TotalContextProps;
  const {last_rotated_atda7a6, setlast_rotated_atda7a6}= useContext(TotalContext) as TotalContextProps;
  const {expires_ata05dc, setexpires_ata05dc}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9ea03, setdynamicactions9ea03}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9ea03Props, setdynamicactions9ea03Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addcredentialref_v1, setaddcredentialref_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCredentialRef:AFVK:v1',
    [user],
    'GroupRiskConfGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2e9bfa725ccf5221eb1b5435b385fe07");
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
    setrisk_conf_group5fe07Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("lifecycle_text")){
        setlifecycle_text3e4de((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(lifecycle_text3e4de?.isDisabled==null)
      {
        setlifecycle_text3e4de((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("rotation_days")){
        setrotation_days8bd75((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(rotation_days8bd75?.isDisabled==null)
      {
        setrotation_days8bd75((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("last_rotated_at")){
        setlast_rotated_atda7a6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(last_rotated_atda7a6?.isDisabled==null)
      {
        setlast_rotated_atda7a6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("expires_at")){
        setexpires_ata05dc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(expires_ata05dc?.isDisabled==null)
      {
        setexpires_ata05dc((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group28e6a,
        codeStates['setoverall_group'] = setoverall_group28e6a,
        codeStates['overall_group28e6a'] = overall_group28e6aProps,
        codeStates['setoverall_group28e6a'] = setoverall_group28e6aProps,
        codeStates['action_details_group'] = action_details_group24206,
        codeStates['setaction_details_group'] = setaction_details_group24206,
        codeStates['action_details_group24206'] = action_details_group24206Props,
        codeStates['setaction_details_group24206'] = setaction_details_group24206Props,
        codeStates['action_detail_group'] = action_detail_group383de,
        codeStates['setaction_detail_group'] = setaction_detail_group383de,
        codeStates['action_detail_group383de'] = action_detail_group383deProps,
        codeStates['setaction_detail_group383de'] = setaction_detail_group383deProps,
        codeStates['risk_conf_group'] = risk_conf_group5fe07,
        codeStates['setrisk_conf_group'] = setrisk_conf_group5fe07,
        codeStates['risk_conf_group5fe07'] = risk_conf_group5fe07Props,
        codeStates['setrisk_conf_group5fe07'] = setrisk_conf_group5fe07Props,
        codeStates['lifecycle_text'] = lifecycle_text3e4de,
        codeStates['setlifecycle_text'] = setlifecycle_text3e4de,
        codeStates['rotation_days'] = rotation_days8bd75,
        codeStates['setrotation_days'] = setrotation_days8bd75,
        codeStates['last_rotated_at'] = last_rotated_atda7a6,
        codeStates['setlast_rotated_at'] = setlast_rotated_atda7a6,
        codeStates['expires_at'] = expires_ata05dc,
        codeStates['setexpires_at'] = setexpires_ata05dc,
        codeStates['dynamicactions'] = dynamicactions9ea03,
        codeStates['setdynamicactions'] = setdynamicactions9ea03,
        codeStates['dynamicactions9ea03'] = dynamicactions9ea03Props,
        codeStates['setdynamicactions9ea03'] = setdynamicactions9ea03Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "2e9bfa725ccf5221eb1b5435b385fe07");
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
        codeStates['overall_group'] = overall_group28e6a,
        codeStates['setoverall_group'] = setoverall_group28e6a,
        codeStates['overall_group28e6a'] = overall_group28e6aProps,
        codeStates['setoverall_group28e6a'] = setoverall_group28e6aProps,
        codeStates['action_details_group'] = action_details_group24206,
        codeStates['setaction_details_group'] = setaction_details_group24206,
        codeStates['action_details_group24206'] = action_details_group24206Props,
        codeStates['setaction_details_group24206'] = setaction_details_group24206Props,
        codeStates['action_detail_group'] = action_detail_group383de,
        codeStates['setaction_detail_group'] = setaction_detail_group383de,
        codeStates['action_detail_group383de'] = action_detail_group383deProps,
        codeStates['setaction_detail_group383de'] = setaction_detail_group383deProps,
        codeStates['risk_conf_group'] = risk_conf_group5fe07,
        codeStates['setrisk_conf_group'] = setrisk_conf_group5fe07,
        codeStates['risk_conf_group5fe07'] = risk_conf_group5fe07Props,
        codeStates['setrisk_conf_group5fe07'] = setrisk_conf_group5fe07Props,
        codeStates['lifecycle_text'] = lifecycle_text3e4de,
        codeStates['setlifecycle_text'] = setlifecycle_text3e4de,
        codeStates['rotation_days'] = rotation_days8bd75,
        codeStates['setrotation_days'] = setrotation_days8bd75,
        codeStates['last_rotated_at'] = last_rotated_atda7a6,
        codeStates['setlast_rotated_at'] = setlast_rotated_atda7a6,
        codeStates['expires_at'] = expires_ata05dc,
        codeStates['setexpires_at'] = setexpires_ata05dc,
        codeStates['dynamicactions'] = dynamicactions9ea03,
        codeStates['setdynamicactions'] = setdynamicactions9ea03,
        codeStates['dynamicactions9ea03'] = dynamicactions9ea03Props,
        codeStates['setdynamicactions9ea03'] = setdynamicactions9ea03Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const risk_conf_group5fe07Ref = useRef<any>(null);
  const handleClearSearch = () => {
    risk_conf_group5fe07Ref.current?.setSearchParams();
    risk_conf_group5fe07Ref.current?.handleSearch({});
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
        !Array.isArray(risk_conf_group5fe07) &&
        Object.keys(risk_conf_group5fe07)?.length > 0
      ) {
        setrisk_conf_group5fe07({})
        setrisk_conf_group5fe07Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [risk_conf_group5fe07Props?.refresh])


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
        gridColumn: '14 / 25',
        gridRow: '2 / 42',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'#f4f5fa',
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
          setaddcredentialref_v1((pre:any)=>({...pre,_selectedGroup_:"risk_conf_group"}))
        }}
    >
          {allowedControls.includes("lifecycle_text") ?<Textlifecycle_text   /* 3e4de */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("rotation_days") ?<TextInputrotation_days   /* 8bd75 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("last_rotated_at") ?<DatePickerlast_rotated_at   /* da7a6 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("expires_at") ?<DatePickerexpires_at   /* a05dc */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouprisk_conf_group
