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
import TextInputtemplate_name  from "./TextInputtemplate_name";
import TextInputtemplate_code  from "./TextInputtemplate_code";
import TextInputtemplate_version  from "./TextInputtemplate_version";
import TextInputapplies_tier_code  from "./TextInputapplies_tier_code";
import TextInputapplies_use_case  from "./TextInputapplies_use_case";
import TextInputapplies_asset_type  from "./TextInputapplies_asset_type";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Grouptemplate_detail_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "template_name",
      "template_code",
      "template_version",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "text",
      "template_name",
      "template_code",
      "template_version",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "text",
      "template_name",
      "template_code",
      "template_version",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "text",
      "template_name",
      "template_code",
      "template_version",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "text",
      "template_name",
      "template_code",
      "template_version",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "text",
      "template_name",
      "template_code",
      "template_version",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "text",
      "template_name",
      "template_code",
      "template_version",
      "applies_tier_code",
      "applies_use_case",
      "applies_asset_type"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "template_detail_group",
      "additional_info_group"
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
  const {groupac196, setgroupac196}= useContext(TotalContext) as TotalContextProps;
  const {groupac196Props, setgroupac196Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group268e9, settemplate_detail_group268e9}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group268e9Props, settemplate_detail_group268e9Props}= useContext(TotalContext) as TotalContextProps;
  const {text7594c, settext7594c}= useContext(TotalContext) as TotalContextProps;
  const {template_namef77f0, settemplate_namef77f0}= useContext(TotalContext) as TotalContextProps;
  const {template_code3b498, settemplate_code3b498}= useContext(TotalContext) as TotalContextProps;
  const {template_versionfa78b, settemplate_versionfa78b}= useContext(TotalContext) as TotalContextProps;
  const {applies_tier_code36691, setapplies_tier_code36691}= useContext(TotalContext) as TotalContextProps;
  const {applies_use_cased6dc4, setapplies_use_cased6dc4}= useContext(TotalContext) as TotalContextProps;
  const {applies_asset_typeae9f5, setapplies_asset_typeae9f5}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group4d159, setadditional_info_group4d159}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group4d159Props, setadditional_info_group4d159Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewcertificatetemplate_v1, setviewcertificatetemplate_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewCertificateTemplate:AFVK:v1',
    [user],
    'GroupTemplateDetailGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ea9449c4f84b46d5b6c32eb076e268e9");
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
    settemplate_detail_group268e9Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("text")){
        settext7594c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(text7594c?.isDisabled==null)
      {
        settext7594c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_name")){
        settemplate_namef77f0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_namef77f0?.isDisabled==null)
      {
        settemplate_namef77f0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_code")){
        settemplate_code3b498((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_code3b498?.isDisabled==null)
      {
        settemplate_code3b498((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("template_version")){
        settemplate_versionfa78b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(template_versionfa78b?.isDisabled==null)
      {
        settemplate_versionfa78b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applies_tier_code")){
        setapplies_tier_code36691((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applies_tier_code36691?.isDisabled==null)
      {
        setapplies_tier_code36691((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applies_use_case")){
        setapplies_use_cased6dc4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applies_use_cased6dc4?.isDisabled==null)
      {
        setapplies_use_cased6dc4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applies_asset_type")){
        setapplies_asset_typeae9f5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applies_asset_typeae9f5?.isDisabled==null)
      {
        setapplies_asset_typeae9f5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupac196,
        codeStates['setgroup'] = setgroupac196,
        codeStates['groupac196'] = groupac196Props,
        codeStates['setgroupac196'] = setgroupac196Props,
        codeStates['template_detail_group'] = template_detail_group268e9,
        codeStates['settemplate_detail_group'] = settemplate_detail_group268e9,
        codeStates['template_detail_group268e9'] = template_detail_group268e9Props,
        codeStates['settemplate_detail_group268e9'] = settemplate_detail_group268e9Props,
        codeStates['text'] = text7594c,
        codeStates['settext'] = settext7594c,
        codeStates['template_name'] = template_namef77f0,
        codeStates['settemplate_name'] = settemplate_namef77f0,
        codeStates['template_code'] = template_code3b498,
        codeStates['settemplate_code'] = settemplate_code3b498,
        codeStates['template_version'] = template_versionfa78b,
        codeStates['settemplate_version'] = settemplate_versionfa78b,
        codeStates['applies_tier_code'] = applies_tier_code36691,
        codeStates['setapplies_tier_code'] = setapplies_tier_code36691,
        codeStates['applies_use_case'] = applies_use_cased6dc4,
        codeStates['setapplies_use_case'] = setapplies_use_cased6dc4,
        codeStates['applies_asset_type'] = applies_asset_typeae9f5,
        codeStates['setapplies_asset_type'] = setapplies_asset_typeae9f5,
        codeStates['additional_info_group'] = additional_info_group4d159,
        codeStates['setadditional_info_group'] = setadditional_info_group4d159,
        codeStates['additional_info_group4d159'] = additional_info_group4d159Props,
        codeStates['setadditional_info_group4d159'] = setadditional_info_group4d159Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "ea9449c4f84b46d5b6c32eb076e268e9");
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
        codeStates['group'] = groupac196,
        codeStates['setgroup'] = setgroupac196,
        codeStates['groupac196'] = groupac196Props,
        codeStates['setgroupac196'] = setgroupac196Props,
        codeStates['template_detail_group'] = template_detail_group268e9,
        codeStates['settemplate_detail_group'] = settemplate_detail_group268e9,
        codeStates['template_detail_group268e9'] = template_detail_group268e9Props,
        codeStates['settemplate_detail_group268e9'] = settemplate_detail_group268e9Props,
        codeStates['text'] = text7594c,
        codeStates['settext'] = settext7594c,
        codeStates['template_name'] = template_namef77f0,
        codeStates['settemplate_name'] = settemplate_namef77f0,
        codeStates['template_code'] = template_code3b498,
        codeStates['settemplate_code'] = settemplate_code3b498,
        codeStates['template_version'] = template_versionfa78b,
        codeStates['settemplate_version'] = settemplate_versionfa78b,
        codeStates['applies_tier_code'] = applies_tier_code36691,
        codeStates['setapplies_tier_code'] = setapplies_tier_code36691,
        codeStates['applies_use_case'] = applies_use_cased6dc4,
        codeStates['setapplies_use_case'] = setapplies_use_cased6dc4,
        codeStates['applies_asset_type'] = applies_asset_typeae9f5,
        codeStates['setapplies_asset_type'] = setapplies_asset_typeae9f5,
        codeStates['additional_info_group'] = additional_info_group4d159,
        codeStates['setadditional_info_group'] = setadditional_info_group4d159,
        codeStates['additional_info_group4d159'] = additional_info_group4d159Props,
        codeStates['setadditional_info_group4d159'] = setadditional_info_group4d159Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const template_detail_group268e9Ref = useRef<any>(null);
  const handleClearSearch = () => {
    template_detail_group268e9Ref.current?.setSearchParams();
    template_detail_group268e9Ref.current?.handleSearch({});
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
        !Array.isArray(template_detail_group268e9) &&
        Object.keys(template_detail_group268e9)?.length > 0
      ) {
        settemplate_detail_group268e9({})
      }
    } else prevRefreshRef.current = true
  }, [template_detail_group268e9Props?.refresh])


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
          setviewcertificatetemplate_v1((pre:any)=>({...pre,_selectedGroup_:"template_detail_group"}))
        }}
    >
          {allowedControls.includes("text") ?<Texttext   /* 7594c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("template_name") ?<TextInputtemplate_name   /* f77f0 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("template_code") ?<TextInputtemplate_code   /* 3b498 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("template_version") ?<TextInputtemplate_version   /* fa78b */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("applies_tier_code") ?<TextInputapplies_tier_code   /* 36691 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("applies_use_case") ?<TextInputapplies_use_case   /* d6dc4 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("applies_asset_type") ?<TextInputapplies_asset_type   /* ae9f5 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Grouptemplate_detail_group
