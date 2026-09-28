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
import Groupaction_details_group  from "../Groupaction_details_group/Groupaction_details_group";
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
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoverall_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetcodenameconcatcombo_v1Props, setdfd_assetcodenameconcatcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
    "allowedControls": [],
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
    "allowedControls": [],
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
    "allowedControls": [],
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
    "allowedControls": [],
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
    "allowedControls": [],
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
    "allowedControls": [],
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
    "allowedControls": [],
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
  const {overall_group1505e, setoverall_group1505e}= useContext(TotalContext) as TotalContextProps;
  const {overall_group1505eProps, setoverall_group1505eProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group51bc6, setaction_details_group51bc6}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group51bc6Props, setaction_details_group51bc6Props}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group32126, setaction_detail_group32126}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group32126Props, setaction_detail_group32126Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group60f7c, setrisk_conf_group60f7c}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group60f7cProps, setrisk_conf_group60f7cProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsae385, setdynamicactionsae385}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsae385Props, setdynamicactionsae385Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addassetversion_v1, setaddassetversion_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAssetVersion:AFVK:v1',
    [user],
    'GroupOverallGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f3c1b5cb688724fe8005cd35f961505e");
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
    setoverall_group1505eProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("action_details_group")){
        setaction_details_group51bc6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(action_details_group51bc6?.isDisabled==null)
      {
        setaction_details_group51bc6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group1505e,
        codeStates['setoverall_group'] = setoverall_group1505e,
        codeStates['overall_group1505e'] = overall_group1505eProps,
        codeStates['setoverall_group1505e'] = setoverall_group1505eProps,
        codeStates['action_details_group'] = action_details_group51bc6,
        codeStates['setaction_details_group'] = setaction_details_group51bc6,
        codeStates['action_details_group51bc6'] = action_details_group51bc6Props,
        codeStates['setaction_details_group51bc6'] = setaction_details_group51bc6Props,
        codeStates['action_detail_group'] = action_detail_group32126,
        codeStates['setaction_detail_group'] = setaction_detail_group32126,
        codeStates['action_detail_group32126'] = action_detail_group32126Props,
        codeStates['setaction_detail_group32126'] = setaction_detail_group32126Props,
        codeStates['risk_conf_group'] = risk_conf_group60f7c,
        codeStates['setrisk_conf_group'] = setrisk_conf_group60f7c,
        codeStates['risk_conf_group60f7c'] = risk_conf_group60f7cProps,
        codeStates['setrisk_conf_group60f7c'] = setrisk_conf_group60f7cProps,
        codeStates['dynamicactions'] = dynamicactionsae385,
        codeStates['setdynamicactions'] = setdynamicactionsae385,
        codeStates['dynamicactionsae385'] = dynamicactionsae385Props,
        codeStates['setdynamicactionsae385'] = setdynamicactionsae385Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "f3c1b5cb688724fe8005cd35f961505e");
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
        codeStates['overall_group'] = overall_group1505e,
        codeStates['setoverall_group'] = setoverall_group1505e,
        codeStates['overall_group1505e'] = overall_group1505eProps,
        codeStates['setoverall_group1505e'] = setoverall_group1505eProps,
        codeStates['action_details_group'] = action_details_group51bc6,
        codeStates['setaction_details_group'] = setaction_details_group51bc6,
        codeStates['action_details_group51bc6'] = action_details_group51bc6Props,
        codeStates['setaction_details_group51bc6'] = setaction_details_group51bc6Props,
        codeStates['action_detail_group'] = action_detail_group32126,
        codeStates['setaction_detail_group'] = setaction_detail_group32126,
        codeStates['action_detail_group32126'] = action_detail_group32126Props,
        codeStates['setaction_detail_group32126'] = setaction_detail_group32126Props,
        codeStates['risk_conf_group'] = risk_conf_group60f7c,
        codeStates['setrisk_conf_group'] = setrisk_conf_group60f7c,
        codeStates['risk_conf_group60f7c'] = risk_conf_group60f7cProps,
        codeStates['setrisk_conf_group60f7c'] = setrisk_conf_group60f7cProps,
        codeStates['dynamicactions'] = dynamicactionsae385,
        codeStates['setdynamicactions'] = setdynamicactionsae385,
        codeStates['dynamicactionsae385'] = dynamicactionsae385Props,
        codeStates['setdynamicactionsae385'] = setdynamicactionsae385Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const overall_group1505eRef = useRef<any>(null);
  const handleClearSearch = () => {
    overall_group1505eRef.current?.setSearchParams();
    overall_group1505eRef.current?.handleSearch({});
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
        !Array.isArray(overall_group1505e) &&
        Object.keys(overall_group1505e)?.length > 0
      ) {
        setoverall_group1505e({})
      }
    } else prevRefreshRef.current = true
  }, [overall_group1505eProps?.refresh])


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
        gridRow: '1 / 59',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setaddassetversion_v1((pre:any)=>({...pre,_selectedGroup_:"overall_group"}))
        }}
    >
        {allowedComponent.includes("action_details_group")  &&<Groupaction_details_group  
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
    </div>
 )
}

export default Groupoverall_group
