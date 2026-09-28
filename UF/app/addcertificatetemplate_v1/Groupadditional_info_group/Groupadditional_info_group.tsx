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
import Texttext_2  from "./Texttext_2";
import TextInputvalidity_months  from "./TextInputvalidity_months";
import DatePickereffective_from  from "./DatePickereffective_from";
import DatePickereffective_to  from "./DatePickereffective_to";
import Switchis_active  from "./Switchis_active";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupadditional_info_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_certificatetemplate_v1Props, setdfd_certificatetemplate_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "text_2",
      "validity_months",
      "effective_from",
      "effective_to",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "text_2",
      "validity_months",
      "effective_from",
      "effective_to",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "text_2",
      "validity_months",
      "effective_from",
      "effective_to",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "text_2",
      "validity_months",
      "effective_from",
      "effective_to",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "text_2",
      "validity_months",
      "effective_from",
      "effective_to",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "text_2",
      "validity_months",
      "effective_from",
      "effective_to",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group",
      "dynamicaction"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "text_2",
      "validity_months",
      "effective_from",
      "effective_to",
      "is_active"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group",
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
  const {groupb224b, setgroupb224b}= useContext(TotalContext) as TotalContextProps;
  const {groupb224bProps, setgroupb224bProps}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16d, settemplate_detail_groupec16d}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16dProps, settemplate_detail_groupec16dProps}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860, setadditional_info_group23860}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860Props, setadditional_info_group23860Props}= useContext(TotalContext) as TotalContextProps;
  const {text_26f93c, settext_26f93c}= useContext(TotalContext) as TotalContextProps;
  const {validity_months29fbf, setvalidity_months29fbf}= useContext(TotalContext) as TotalContextProps;
  const {effective_from9832b, seteffective_from9832b}= useContext(TotalContext) as TotalContextProps;
  const {effective_to1ba20, seteffective_to1ba20}= useContext(TotalContext) as TotalContextProps;
  const {is_active8acbf, setis_active8acbf}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465f, setdynamicactionb465f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465fProps, setdynamicactionb465fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addcertificatetemplate_v1, setaddcertificatetemplate_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCertificateTemplate:AFVK:v1',
    [user],
    'GroupAdditionalInfoGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "da4538aa9fab4d87a1d0b9ee7df23860");
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
    setadditional_info_group23860Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text_2")){
        settext_26f93c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text_26f93c?.isDisabled==null)
      {
        settext_26f93c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("validity_months")){
        setvalidity_months29fbf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(validity_months29fbf?.isDisabled==null)
      {
        setvalidity_months29fbf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("effective_from")){
        seteffective_from9832b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(effective_from9832b?.isDisabled==null)
      {
        seteffective_from9832b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("effective_to")){
        seteffective_to1ba20((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(effective_to1ba20?.isDisabled==null)
      {
        seteffective_to1ba20((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("is_active")){
        setis_active8acbf((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(is_active8acbf?.isDisabled==null)
      {
        setis_active8acbf((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupb224b,
        codeStates['setgroup'] = setgroupb224b,
        codeStates['groupb224b'] = groupb224bProps,
        codeStates['setgroupb224b'] = setgroupb224bProps,
        codeStates['template_detail_group'] = template_detail_groupec16d,
        codeStates['settemplate_detail_group'] = settemplate_detail_groupec16d,
        codeStates['template_detail_groupec16d'] = template_detail_groupec16dProps,
        codeStates['settemplate_detail_groupec16d'] = settemplate_detail_groupec16dProps,
        codeStates['additional_info_group'] = additional_info_group23860,
        codeStates['setadditional_info_group'] = setadditional_info_group23860,
        codeStates['additional_info_group23860'] = additional_info_group23860Props,
        codeStates['setadditional_info_group23860'] = setadditional_info_group23860Props,
        codeStates['text_2'] = text_26f93c,
        codeStates['settext_2'] = settext_26f93c,
        codeStates['validity_months'] = validity_months29fbf,
        codeStates['setvalidity_months'] = setvalidity_months29fbf,
        codeStates['effective_from'] = effective_from9832b,
        codeStates['seteffective_from'] = seteffective_from9832b,
        codeStates['effective_to'] = effective_to1ba20,
        codeStates['seteffective_to'] = seteffective_to1ba20,
        codeStates['is_active'] = is_active8acbf,
        codeStates['setis_active'] = setis_active8acbf,
        codeStates['dynamicaction'] = dynamicactionb465f,
        codeStates['setdynamicaction'] = setdynamicactionb465f,
        codeStates['dynamicactionb465f'] = dynamicactionb465fProps,
        codeStates['setdynamicactionb465f'] = setdynamicactionb465fProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "da4538aa9fab4d87a1d0b9ee7df23860");
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
        codeStates['group'] = groupb224b,
        codeStates['setgroup'] = setgroupb224b,
        codeStates['groupb224b'] = groupb224bProps,
        codeStates['setgroupb224b'] = setgroupb224bProps,
        codeStates['template_detail_group'] = template_detail_groupec16d,
        codeStates['settemplate_detail_group'] = settemplate_detail_groupec16d,
        codeStates['template_detail_groupec16d'] = template_detail_groupec16dProps,
        codeStates['settemplate_detail_groupec16d'] = settemplate_detail_groupec16dProps,
        codeStates['additional_info_group'] = additional_info_group23860,
        codeStates['setadditional_info_group'] = setadditional_info_group23860,
        codeStates['additional_info_group23860'] = additional_info_group23860Props,
        codeStates['setadditional_info_group23860'] = setadditional_info_group23860Props,
        codeStates['text_2'] = text_26f93c,
        codeStates['settext_2'] = settext_26f93c,
        codeStates['validity_months'] = validity_months29fbf,
        codeStates['setvalidity_months'] = setvalidity_months29fbf,
        codeStates['effective_from'] = effective_from9832b,
        codeStates['seteffective_from'] = seteffective_from9832b,
        codeStates['effective_to'] = effective_to1ba20,
        codeStates['seteffective_to'] = seteffective_to1ba20,
        codeStates['is_active'] = is_active8acbf,
        codeStates['setis_active'] = setis_active8acbf,
        codeStates['dynamicaction'] = dynamicactionb465f,
        codeStates['setdynamicaction'] = setdynamicactionb465f,
        codeStates['dynamicactionb465f'] = dynamicactionb465fProps,
        codeStates['setdynamicactionb465f'] = setdynamicactionb465fProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const additional_info_group23860Ref = useRef<any>(null);
  const handleClearSearch = () => {
    additional_info_group23860Ref.current?.setSearchParams();
    additional_info_group23860Ref.current?.handleSearch({});
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
        !Array.isArray(additional_info_group23860) &&
        Object.keys(additional_info_group23860)?.length > 0
      ) {
        setadditional_info_group23860({})
      }
    } else prevRefreshRef.current = true
  }, [additional_info_group23860Props?.refresh])


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
        gridColumn: '13 / 25',
        gridRow: '1 / 46',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '5px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddcertificatetemplate_v1((pre:any)=>({...pre,_selectedGroup_:"additional_info_group"}))
        }}
    >
          {allowedControls.includes("text_2") ?<Texttext_2   /* 6f93c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("validity_months") ?<TextInputvalidity_months   /* 29fbf */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("effective_from") ?<DatePickereffective_from   /* 9832b */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("effective_to") ?<DatePickereffective_to   /* 1ba20 */ lockedData={lockedData} setLockedData={setLockedData}checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("is_active")?<Switchis_active  /* 8acbf */  lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupadditional_info_group
