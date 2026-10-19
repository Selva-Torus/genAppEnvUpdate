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
import TextInputcert_stage_id  from "./TextInputcert_stage_id";
import TextInputstage_sequence  from "./TextInputstage_sequence";
import TextInputstage_type_code  from "./TextInputstage_type_code";
import TextInputstage_name  from "./TextInputstage_name";
import TextInputassigned_login_name  from "./TextInputassigned_login_name";
import DatePickerdecided_on  from "./DatePickerdecided_on";
import DatePickeropened_on  from "./DatePickeropened_on";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupstage_group_1 = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "opened_on"
    ],
    "allowedGroups": [
      "canvas",
      "cert_stage_group",
      "asset_group",
      "stage_group_1",
      "stage_group_2"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "text",
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "opened_on"
    ],
    "allowedGroups": [
      "canvas",
      "cert_stage_group",
      "asset_group",
      "stage_group_1",
      "stage_group_2"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "text",
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "opened_on"
    ],
    "allowedGroups": [
      "canvas",
      "cert_stage_group",
      "asset_group",
      "stage_group_1",
      "stage_group_2"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "text",
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "opened_on"
    ],
    "allowedGroups": [
      "canvas",
      "cert_stage_group",
      "asset_group",
      "stage_group_1",
      "stage_group_2"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "text",
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "opened_on"
    ],
    "allowedGroups": [
      "canvas",
      "cert_stage_group",
      "asset_group",
      "stage_group_1",
      "stage_group_2"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "text",
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "opened_on"
    ],
    "allowedGroups": [
      "canvas",
      "cert_stage_group",
      "asset_group",
      "stage_group_1",
      "stage_group_2"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "text",
      "cert_stage_id",
      "stage_sequence",
      "stage_type_code",
      "stage_name",
      "assigned_login_name",
      "decided_on",
      "opened_on"
    ],
    "allowedGroups": [
      "canvas",
      "cert_stage_group",
      "asset_group",
      "stage_group_1",
      "stage_group_2"
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
  const {cert_stage_groupf8b90, setcert_stage_groupf8b90}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_groupf8b90Props, setcert_stage_groupf8b90Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_group173fd, setasset_group173fd}= useContext(TotalContext) as TotalContextProps;
  const {asset_group173fdProps, setasset_group173fdProps}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_10fb7d, setstage_group_10fb7d}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_10fb7dProps, setstage_group_10fb7dProps}= useContext(TotalContext) as TotalContextProps;
  const {textfa52c, settextfa52c}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_id68938, setcert_stage_id68938}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequence24d54, setstage_sequence24d54}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_codeec1d6, setstage_type_codeec1d6}= useContext(TotalContext) as TotalContextProps;
  const {stage_namea95b4, setstage_namea95b4}= useContext(TotalContext) as TotalContextProps;
  const {assigned_login_name7df9b, setassigned_login_name7df9b}= useContext(TotalContext) as TotalContextProps;
  const {decided_onf3d30, setdecided_onf3d30}= useContext(TotalContext) as TotalContextProps;
  const {opened_on9697d, setopened_on9697d}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_24dcf0, setstage_group_24dcf0}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_24dcf0Props, setstage_group_24dcf0Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {editcertificationstages_v1, seteditcertificationstages_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:editCertificationStages:AFVK:v1',
    [user],
    'GroupStageGroup1',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4f61f0334d1749399beb480b66f0fb7d");
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
    setstage_group_10fb7dProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text")){
        settextfa52c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(textfa52c?.isDisabled==null)
      {
        settextfa52c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cert_stage_id")){
        setcert_stage_id68938((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cert_stage_id68938?.isDisabled==null)
      {
        setcert_stage_id68938((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_sequence")){
        setstage_sequence24d54((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_sequence24d54?.isDisabled==null)
      {
        setstage_sequence24d54((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_type_code")){
        setstage_type_codeec1d6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_type_codeec1d6?.isDisabled==null)
      {
        setstage_type_codeec1d6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("stage_name")){
        setstage_namea95b4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(stage_namea95b4?.isDisabled==null)
      {
        setstage_namea95b4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assigned_login_name")){
        setassigned_login_name7df9b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(assigned_login_name7df9b?.isDisabled==null)
      {
        setassigned_login_name7df9b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("decided_on")){
        setdecided_onf3d30((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(decided_onf3d30?.isDisabled==null)
      {
        setdecided_onf3d30((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("opened_on")){
        setopened_on9697d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(opened_on9697d?.isDisabled==null)
      {
        setopened_on9697d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['cert_stage_group'] = cert_stage_groupf8b90,
        codeStates['setcert_stage_group'] = setcert_stage_groupf8b90,
        codeStates['cert_stage_groupf8b90'] = cert_stage_groupf8b90Props,
        codeStates['setcert_stage_groupf8b90'] = setcert_stage_groupf8b90Props,
        codeStates['asset_group'] = asset_group173fd,
        codeStates['setasset_group'] = setasset_group173fd,
        codeStates['asset_group173fd'] = asset_group173fdProps,
        codeStates['setasset_group173fd'] = setasset_group173fdProps,
        codeStates['stage_group_1'] = stage_group_10fb7d,
        codeStates['setstage_group_1'] = setstage_group_10fb7d,
        codeStates['stage_group_10fb7d'] = stage_group_10fb7dProps,
        codeStates['setstage_group_10fb7d'] = setstage_group_10fb7dProps,
        codeStates['text'] = textfa52c,
        codeStates['settext'] = settextfa52c,
        codeStates['cert_stage_id'] = cert_stage_id68938,
        codeStates['setcert_stage_id'] = setcert_stage_id68938,
        codeStates['stage_sequence'] = stage_sequence24d54,
        codeStates['setstage_sequence'] = setstage_sequence24d54,
        codeStates['stage_type_code'] = stage_type_codeec1d6,
        codeStates['setstage_type_code'] = setstage_type_codeec1d6,
        codeStates['stage_name'] = stage_namea95b4,
        codeStates['setstage_name'] = setstage_namea95b4,
        codeStates['assigned_login_name'] = assigned_login_name7df9b,
        codeStates['setassigned_login_name'] = setassigned_login_name7df9b,
        codeStates['decided_on'] = decided_onf3d30,
        codeStates['setdecided_on'] = setdecided_onf3d30,
        codeStates['opened_on'] = opened_on9697d,
        codeStates['setopened_on'] = setopened_on9697d,
        codeStates['stage_group_2'] = stage_group_24dcf0,
        codeStates['setstage_group_2'] = setstage_group_24dcf0,
        codeStates['stage_group_24dcf0'] = stage_group_24dcf0Props,
        codeStates['setstage_group_24dcf0'] = setstage_group_24dcf0Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4f61f0334d1749399beb480b66f0fb7d");
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
        codeStates['cert_stage_group'] = cert_stage_groupf8b90,
        codeStates['setcert_stage_group'] = setcert_stage_groupf8b90,
        codeStates['cert_stage_groupf8b90'] = cert_stage_groupf8b90Props,
        codeStates['setcert_stage_groupf8b90'] = setcert_stage_groupf8b90Props,
        codeStates['asset_group'] = asset_group173fd,
        codeStates['setasset_group'] = setasset_group173fd,
        codeStates['asset_group173fd'] = asset_group173fdProps,
        codeStates['setasset_group173fd'] = setasset_group173fdProps,
        codeStates['stage_group_1'] = stage_group_10fb7d,
        codeStates['setstage_group_1'] = setstage_group_10fb7d,
        codeStates['stage_group_10fb7d'] = stage_group_10fb7dProps,
        codeStates['setstage_group_10fb7d'] = setstage_group_10fb7dProps,
        codeStates['text'] = textfa52c,
        codeStates['settext'] = settextfa52c,
        codeStates['cert_stage_id'] = cert_stage_id68938,
        codeStates['setcert_stage_id'] = setcert_stage_id68938,
        codeStates['stage_sequence'] = stage_sequence24d54,
        codeStates['setstage_sequence'] = setstage_sequence24d54,
        codeStates['stage_type_code'] = stage_type_codeec1d6,
        codeStates['setstage_type_code'] = setstage_type_codeec1d6,
        codeStates['stage_name'] = stage_namea95b4,
        codeStates['setstage_name'] = setstage_namea95b4,
        codeStates['assigned_login_name'] = assigned_login_name7df9b,
        codeStates['setassigned_login_name'] = setassigned_login_name7df9b,
        codeStates['decided_on'] = decided_onf3d30,
        codeStates['setdecided_on'] = setdecided_onf3d30,
        codeStates['opened_on'] = opened_on9697d,
        codeStates['setopened_on'] = setopened_on9697d,
        codeStates['stage_group_2'] = stage_group_24dcf0,
        codeStates['setstage_group_2'] = setstage_group_24dcf0,
        codeStates['stage_group_24dcf0'] = stage_group_24dcf0Props,
        codeStates['setstage_group_24dcf0'] = setstage_group_24dcf0Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const stage_group_10fb7dRef = useRef<any>(null);
  const handleClearSearch = () => {
    stage_group_10fb7dRef.current?.setSearchParams();
    stage_group_10fb7dRef.current?.handleSearch({});
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
        !Array.isArray(stage_group_10fb7d) &&
        Object.keys(stage_group_10fb7d)?.length > 0
      ) {
        setstage_group_10fb7d({})
        setstage_group_10fb7dProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [stage_group_10fb7dProps?.refresh])


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
        gridColumn: '1 / 13',
        gridRow: '27 / 92',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'#f1f2f7',
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
          seteditcertificationstages_v1((pre:any)=>({...pre,_selectedGroup_:"stage_group_1"}))
        }}
    >
          {allowedControls.includes("text") ?<Texttext   /* fa52c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("cert_stage_id") ?<TextInputcert_stage_id   /* 68938 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("stage_sequence") ?<TextInputstage_sequence   /* 24d54 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("stage_type_code") ?<TextInputstage_type_code   /* ec1d6 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("stage_name") ?<TextInputstage_name   /* a95b4 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("assigned_login_name") ?<TextInputassigned_login_name   /* 7df9b */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("decided_on") ?<DatePickerdecided_on   /* f3d30 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("opened_on") ?<DatePickeropened_on   /* 9697d */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupstage_group_1
