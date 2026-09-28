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
import Textcode_details_text  from "./Textcode_details_text";
import ComboBoxcode_type  from "./ComboBoxcode_type";
import TextInputcode  from "./TextInputcode";
import TextInputdisplay_name  from "./TextInputdisplay_name";
import TextInputsort_order  from "./TextInputsort_order";
import TextAreadescription  from "./TextAreadescription";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcode_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_codevaluecombo_v1Props, setdfd_codevaluecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_codevalue_v1Props, setdfd_codevalue_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "code_details_text",
      "code_type",
      "code",
      "display_name",
      "sort_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "code_details_text",
      "code_type",
      "code",
      "display_name",
      "sort_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "code_details_text",
      "code_type",
      "code",
      "display_name",
      "sort_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "code_details_text",
      "code_type",
      "code",
      "display_name",
      "sort_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "code_details_text",
      "code_type",
      "code",
      "display_name",
      "sort_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "code_details_text",
      "code_type",
      "code",
      "display_name",
      "sort_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "code_details_text",
      "code_type",
      "code",
      "display_name",
      "sort_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group",
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
  const {code_value_group4d389, setcode_value_group4d389}= useContext(TotalContext) as TotalContextProps;
  const {code_value_group4d389Props, setcode_value_group4d389Props}= useContext(TotalContext) as TotalContextProps;
  const {code_groupb5dc1, setcode_groupb5dc1}= useContext(TotalContext) as TotalContextProps;
  const {code_groupb5dc1Props, setcode_groupb5dc1Props}= useContext(TotalContext) as TotalContextProps;
  const {code_details_text3256a, setcode_details_text3256a}= useContext(TotalContext) as TotalContextProps;
  const {code_typeae530, setcode_typeae530}= useContext(TotalContext) as TotalContextProps;
  const {codebc63b, setcodebc63b}= useContext(TotalContext) as TotalContextProps;
  const {display_namea6bb5, setdisplay_namea6bb5}= useContext(TotalContext) as TotalContextProps;
  const {sort_order18beb, setsort_order18beb}= useContext(TotalContext) as TotalContextProps;
  const {description2d6ea, setdescription2d6ea}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_group55872, setcode_value_config_group55872}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_group55872Props, setcode_value_config_group55872Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1535b, setdynamicactions1535b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1535bProps, setdynamicactions1535bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addcodevalues_v1, setaddcodevalues_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addCodeValues:AFVK:v1',
    [user],
    'GroupCodeGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b191bfadd8bb4a6c8e8aaf94d56b5dc1");
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
    setcode_groupb5dc1Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("code_details_text")){
        setcode_details_text3256a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_details_text3256a?.isDisabled==null)
      {
        setcode_details_text3256a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_type")){
        setcode_typeae530((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_typeae530?.isDisabled==null)
      {
        setcode_typeae530((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code")){
        setcodebc63b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(codebc63b?.isDisabled==null)
      {
        setcodebc63b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("display_name")){
        setdisplay_namea6bb5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(display_namea6bb5?.isDisabled==null)
      {
        setdisplay_namea6bb5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("sort_order")){
        setsort_order18beb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(sort_order18beb?.isDisabled==null)
      {
        setsort_order18beb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("description")){
        setdescription2d6ea((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(description2d6ea?.isDisabled==null)
      {
        setdescription2d6ea((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['code_value_group'] = code_value_group4d389,
        codeStates['setcode_value_group'] = setcode_value_group4d389,
        codeStates['code_value_group4d389'] = code_value_group4d389Props,
        codeStates['setcode_value_group4d389'] = setcode_value_group4d389Props,
        codeStates['code_group'] = code_groupb5dc1,
        codeStates['setcode_group'] = setcode_groupb5dc1,
        codeStates['code_groupb5dc1'] = code_groupb5dc1Props,
        codeStates['setcode_groupb5dc1'] = setcode_groupb5dc1Props,
        codeStates['code_details_text'] = code_details_text3256a,
        codeStates['setcode_details_text'] = setcode_details_text3256a,
        codeStates['code_type'] = code_typeae530,
        codeStates['setcode_type'] = setcode_typeae530,
        codeStates['code'] = codebc63b,
        codeStates['setcode'] = setcodebc63b,
        codeStates['display_name'] = display_namea6bb5,
        codeStates['setdisplay_name'] = setdisplay_namea6bb5,
        codeStates['sort_order'] = sort_order18beb,
        codeStates['setsort_order'] = setsort_order18beb,
        codeStates['description'] = description2d6ea,
        codeStates['setdescription'] = setdescription2d6ea,
        codeStates['code_value_config_group'] = code_value_config_group55872,
        codeStates['setcode_value_config_group'] = setcode_value_config_group55872,
        codeStates['code_value_config_group55872'] = code_value_config_group55872Props,
        codeStates['setcode_value_config_group55872'] = setcode_value_config_group55872Props,
        codeStates['dynamicactions'] = dynamicactions1535b,
        codeStates['setdynamicactions'] = setdynamicactions1535b,
        codeStates['dynamicactions1535b'] = dynamicactions1535bProps,
        codeStates['setdynamicactions1535b'] = setdynamicactions1535bProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "b191bfadd8bb4a6c8e8aaf94d56b5dc1");
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
        codeStates['code_value_group'] = code_value_group4d389,
        codeStates['setcode_value_group'] = setcode_value_group4d389,
        codeStates['code_value_group4d389'] = code_value_group4d389Props,
        codeStates['setcode_value_group4d389'] = setcode_value_group4d389Props,
        codeStates['code_group'] = code_groupb5dc1,
        codeStates['setcode_group'] = setcode_groupb5dc1,
        codeStates['code_groupb5dc1'] = code_groupb5dc1Props,
        codeStates['setcode_groupb5dc1'] = setcode_groupb5dc1Props,
        codeStates['code_details_text'] = code_details_text3256a,
        codeStates['setcode_details_text'] = setcode_details_text3256a,
        codeStates['code_type'] = code_typeae530,
        codeStates['setcode_type'] = setcode_typeae530,
        codeStates['code'] = codebc63b,
        codeStates['setcode'] = setcodebc63b,
        codeStates['display_name'] = display_namea6bb5,
        codeStates['setdisplay_name'] = setdisplay_namea6bb5,
        codeStates['sort_order'] = sort_order18beb,
        codeStates['setsort_order'] = setsort_order18beb,
        codeStates['description'] = description2d6ea,
        codeStates['setdescription'] = setdescription2d6ea,
        codeStates['code_value_config_group'] = code_value_config_group55872,
        codeStates['setcode_value_config_group'] = setcode_value_config_group55872,
        codeStates['code_value_config_group55872'] = code_value_config_group55872Props,
        codeStates['setcode_value_config_group55872'] = setcode_value_config_group55872Props,
        codeStates['dynamicactions'] = dynamicactions1535b,
        codeStates['setdynamicactions'] = setdynamicactions1535b,
        codeStates['dynamicactions1535b'] = dynamicactions1535bProps,
        codeStates['setdynamicactions1535b'] = setdynamicactions1535bProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const code_groupb5dc1Ref = useRef<any>(null);
  const handleClearSearch = () => {
    code_groupb5dc1Ref.current?.setSearchParams();
    code_groupb5dc1Ref.current?.handleSearch({});
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
        !Array.isArray(code_groupb5dc1) &&
        Object.keys(code_groupb5dc1)?.length > 0
      ) {
        setcode_groupb5dc1({})
      }
    } else prevRefreshRef.current = true
  }, [code_groupb5dc1Props?.refresh])


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
        gridColumn: '1 / 15',
        gridRow: '2 / 66',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '10px',
        backgroundColor:'#ffffff',
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
          setaddcodevalues_v1((pre:any)=>({...pre,_selectedGroup_:"code_group"}))
        }}
    >
          {allowedControls.includes("code_details_text") ?<Textcode_details_text   /* 3256a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("code_type") ?<ComboBoxcode_type /* ae530 */ lockedData={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("code") ?<TextInputcode   /* bc63b */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("display_name") ?<TextInputdisplay_name   /* a6bb5 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("sort_order") ?<TextInputsort_order   /* 18beb */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("description") ?<TextAreadescription   /* 2d6ea */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupcode_group
