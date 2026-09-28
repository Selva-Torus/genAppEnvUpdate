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
import TextInputcode_text  from "./TextInputcode_text";
import TextInputdisplay_name  from "./TextInputdisplay_name";
import TextInputset_order  from "./TextInputset_order";
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
  const {dfd_codevalue_v1Props, setdfd_codevalue_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_codevaluecombo_v1Props, setdfd_codevaluecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "code_text",
      "display_name",
      "set_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "code_details_text",
      "code_type",
      "code_text",
      "display_name",
      "set_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "code_details_text",
      "code_type",
      "code_text",
      "display_name",
      "set_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "code_details_text",
      "code_type",
      "code_text",
      "display_name",
      "set_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "code_details_text",
      "code_type",
      "code_text",
      "display_name",
      "set_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "code_details_text",
      "code_type",
      "code_text",
      "display_name",
      "set_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "code_details_text",
      "code_type",
      "code_text",
      "display_name",
      "set_order",
      "description"
    ],
    "allowedGroups": [
      "canvas",
      "code_value_group",
      "code_group",
      "code_value_config_group"
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
  const {code_value_group30fa3, setcode_value_group30fa3}= useContext(TotalContext) as TotalContextProps;
  const {code_value_group30fa3Props, setcode_value_group30fa3Props}= useContext(TotalContext) as TotalContextProps;
  const {code_group871cc, setcode_group871cc}= useContext(TotalContext) as TotalContextProps;
  const {code_group871ccProps, setcode_group871ccProps}= useContext(TotalContext) as TotalContextProps;
  const {code_details_text07751, setcode_details_text07751}= useContext(TotalContext) as TotalContextProps;
  const {code_type66261, setcode_type66261}= useContext(TotalContext) as TotalContextProps;
  const {code_text147d3, setcode_text147d3}= useContext(TotalContext) as TotalContextProps;
  const {display_name84e42, setdisplay_name84e42}= useContext(TotalContext) as TotalContextProps;
  const {set_orderef6e6, setset_orderef6e6}= useContext(TotalContext) as TotalContextProps;
  const {description7448f, setdescription7448f}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_groupa4a28, setcode_value_config_groupa4a28}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_groupa4a28Props, setcode_value_config_groupa4a28Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewscodevalue_v1, setviewscodevalue_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:viewsCodeValue:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4818b1f7f67a7a0fc7b50cb6893871cc");
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
    setcode_group871ccProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("code_details_text")){
        setcode_details_text07751((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_details_text07751?.isDisabled==null)
      {
        setcode_details_text07751((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_type")){
        setcode_type66261((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_type66261?.isDisabled==null)
      {
        setcode_type66261((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("code_text")){
        setcode_text147d3((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(code_text147d3?.isDisabled==null)
      {
        setcode_text147d3((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("display_name")){
        setdisplay_name84e42((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(display_name84e42?.isDisabled==null)
      {
        setdisplay_name84e42((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("set_order")){
        setset_orderef6e6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(set_orderef6e6?.isDisabled==null)
      {
        setset_orderef6e6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("description")){
        setdescription7448f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(description7448f?.isDisabled==null)
      {
        setdescription7448f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['code_value_group'] = code_value_group30fa3,
        codeStates['setcode_value_group'] = setcode_value_group30fa3,
        codeStates['code_value_group30fa3'] = code_value_group30fa3Props,
        codeStates['setcode_value_group30fa3'] = setcode_value_group30fa3Props,
        codeStates['code_group'] = code_group871cc,
        codeStates['setcode_group'] = setcode_group871cc,
        codeStates['code_group871cc'] = code_group871ccProps,
        codeStates['setcode_group871cc'] = setcode_group871ccProps,
        codeStates['code_details_text'] = code_details_text07751,
        codeStates['setcode_details_text'] = setcode_details_text07751,
        codeStates['code_type'] = code_type66261,
        codeStates['setcode_type'] = setcode_type66261,
        codeStates['code_text'] = code_text147d3,
        codeStates['setcode_text'] = setcode_text147d3,
        codeStates['display_name'] = display_name84e42,
        codeStates['setdisplay_name'] = setdisplay_name84e42,
        codeStates['set_order'] = set_orderef6e6,
        codeStates['setset_order'] = setset_orderef6e6,
        codeStates['description'] = description7448f,
        codeStates['setdescription'] = setdescription7448f,
        codeStates['code_value_config_group'] = code_value_config_groupa4a28,
        codeStates['setcode_value_config_group'] = setcode_value_config_groupa4a28,
        codeStates['code_value_config_groupa4a28'] = code_value_config_groupa4a28Props,
        codeStates['setcode_value_config_groupa4a28'] = setcode_value_config_groupa4a28Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4818b1f7f67a7a0fc7b50cb6893871cc");
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
        codeStates['code_value_group'] = code_value_group30fa3,
        codeStates['setcode_value_group'] = setcode_value_group30fa3,
        codeStates['code_value_group30fa3'] = code_value_group30fa3Props,
        codeStates['setcode_value_group30fa3'] = setcode_value_group30fa3Props,
        codeStates['code_group'] = code_group871cc,
        codeStates['setcode_group'] = setcode_group871cc,
        codeStates['code_group871cc'] = code_group871ccProps,
        codeStates['setcode_group871cc'] = setcode_group871ccProps,
        codeStates['code_details_text'] = code_details_text07751,
        codeStates['setcode_details_text'] = setcode_details_text07751,
        codeStates['code_type'] = code_type66261,
        codeStates['setcode_type'] = setcode_type66261,
        codeStates['code_text'] = code_text147d3,
        codeStates['setcode_text'] = setcode_text147d3,
        codeStates['display_name'] = display_name84e42,
        codeStates['setdisplay_name'] = setdisplay_name84e42,
        codeStates['set_order'] = set_orderef6e6,
        codeStates['setset_order'] = setset_orderef6e6,
        codeStates['description'] = description7448f,
        codeStates['setdescription'] = setdescription7448f,
        codeStates['code_value_config_group'] = code_value_config_groupa4a28,
        codeStates['setcode_value_config_group'] = setcode_value_config_groupa4a28,
        codeStates['code_value_config_groupa4a28'] = code_value_config_groupa4a28Props,
        codeStates['setcode_value_config_groupa4a28'] = setcode_value_config_groupa4a28Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const code_group871ccRef = useRef<any>(null);
  const handleClearSearch = () => {
    code_group871ccRef.current?.setSearchParams();
    code_group871ccRef.current?.handleSearch({});
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
        !Array.isArray(code_group871cc) &&
        Object.keys(code_group871cc)?.length > 0
      ) {
        setcode_group871cc({})
      }
    } else prevRefreshRef.current = true
  }, [code_group871ccProps?.refresh])


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
          setviewscodevalue_v1((pre:any)=>({...pre,_selectedGroup_:"code_group"}))
        }}
    >
          {allowedControls.includes("code_details_text") ?<Textcode_details_text   /* 07751 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("code_type") ?<ComboBoxcode_type /* 66261 */ lockedData={lockedData} setLockedData={setLockedData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("code_text") ?<TextInputcode_text   /* 147d3 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("display_name") ?<TextInputdisplay_name   /* 84e42 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("set_order") ?<TextInputset_order   /* ef6e6 */ lockedData={lockedData} setLockedData={setLockedData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("description") ?<TextAreadescription   /* 7448f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData}/>: <div></div>}
    </div>
 )
}

export default Groupcode_group
