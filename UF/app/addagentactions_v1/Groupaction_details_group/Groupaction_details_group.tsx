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
import Groupaction_detail_group  from "../Groupaction_detail_group/Groupaction_detail_group";
import Grouprisk_conf_group  from "../Grouprisk_conf_group/Grouprisk_conf_group";
import Groupdynamicactions  from "../Groupdynamicactions/Groupdynamicactions";
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
import Textagent_action_id  from "./Textagent_action_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupaction_details_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "agent_action_id"
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
      "agent_action_id"
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
      "agent_action_id"
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
      "agent_action_id"
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
      "agent_action_id"
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
      "agent_action_id"
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
      "agent_action_id"
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
  const {overall_group0af1a, setoverall_group0af1a}= useContext(TotalContext) as TotalContextProps;
  const {overall_group0af1aProps, setoverall_group0af1aProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group200fe, setaction_details_group200fe}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group200feProps, setaction_details_group200feProps}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_groupd36e9, setaction_detail_groupd36e9}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_groupd36e9Props, setaction_detail_groupd36e9Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd00db, setrisk_conf_groupd00db}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd00dbProps, setrisk_conf_groupd00dbProps}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_id8a854, setagent_action_id8a854}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions86b6f, setdynamicactions86b6f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions86b6fProps, setdynamicactions86b6fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addagentactions_v1, setaddagentactions_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addAgentActions:AFVK:v1',
    [user],
    'GroupActionDetailsGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8933ddffd617a274f262de0f683200fe");
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
    setaction_details_group200feProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("action_detail_group")){
        setaction_detail_groupd36e9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(action_detail_groupd36e9?.isDisabled==null)
      {
        setaction_detail_groupd36e9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_conf_group")){
        setrisk_conf_groupd00db((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_conf_groupd00db?.isDisabled==null)
      {
        setrisk_conf_groupd00db((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("agent_action_id")){
        setagent_action_id8a854((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(agent_action_id8a854?.isDisabled==null)
      {
        setagent_action_id8a854((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dynamicactions")){
        setdynamicactions86b6f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dynamicactions86b6f?.isDisabled==null)
      {
        setdynamicactions86b6f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group0af1a,
        codeStates['setoverall_group'] = setoverall_group0af1a,
        codeStates['overall_group0af1a'] = overall_group0af1aProps,
        codeStates['setoverall_group0af1a'] = setoverall_group0af1aProps,
        codeStates['action_details_group'] = action_details_group200fe,
        codeStates['setaction_details_group'] = setaction_details_group200fe,
        codeStates['action_details_group200fe'] = action_details_group200feProps,
        codeStates['setaction_details_group200fe'] = setaction_details_group200feProps,
        codeStates['action_detail_group'] = action_detail_groupd36e9,
        codeStates['setaction_detail_group'] = setaction_detail_groupd36e9,
        codeStates['action_detail_groupd36e9'] = action_detail_groupd36e9Props,
        codeStates['setaction_detail_groupd36e9'] = setaction_detail_groupd36e9Props,
        codeStates['risk_conf_group'] = risk_conf_groupd00db,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupd00db,
        codeStates['risk_conf_groupd00db'] = risk_conf_groupd00dbProps,
        codeStates['setrisk_conf_groupd00db'] = setrisk_conf_groupd00dbProps,
        codeStates['agent_action_id'] = agent_action_id8a854,
        codeStates['setagent_action_id'] = setagent_action_id8a854,
        codeStates['dynamicactions'] = dynamicactions86b6f,
        codeStates['setdynamicactions'] = setdynamicactions86b6f,
        codeStates['dynamicactions86b6f'] = dynamicactions86b6fProps,
        codeStates['setdynamicactions86b6f'] = setdynamicactions86b6fProps,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "8933ddffd617a274f262de0f683200fe");
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
        codeStates['overall_group'] = overall_group0af1a,
        codeStates['setoverall_group'] = setoverall_group0af1a,
        codeStates['overall_group0af1a'] = overall_group0af1aProps,
        codeStates['setoverall_group0af1a'] = setoverall_group0af1aProps,
        codeStates['action_details_group'] = action_details_group200fe,
        codeStates['setaction_details_group'] = setaction_details_group200fe,
        codeStates['action_details_group200fe'] = action_details_group200feProps,
        codeStates['setaction_details_group200fe'] = setaction_details_group200feProps,
        codeStates['action_detail_group'] = action_detail_groupd36e9,
        codeStates['setaction_detail_group'] = setaction_detail_groupd36e9,
        codeStates['action_detail_groupd36e9'] = action_detail_groupd36e9Props,
        codeStates['setaction_detail_groupd36e9'] = setaction_detail_groupd36e9Props,
        codeStates['risk_conf_group'] = risk_conf_groupd00db,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupd00db,
        codeStates['risk_conf_groupd00db'] = risk_conf_groupd00dbProps,
        codeStates['setrisk_conf_groupd00db'] = setrisk_conf_groupd00dbProps,
        codeStates['agent_action_id'] = agent_action_id8a854,
        codeStates['setagent_action_id'] = setagent_action_id8a854,
        codeStates['dynamicactions'] = dynamicactions86b6f,
        codeStates['setdynamicactions'] = setdynamicactions86b6f,
        codeStates['dynamicactions86b6f'] = dynamicactions86b6fProps,
        codeStates['setdynamicactions86b6f'] = setdynamicactions86b6fProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const action_details_group200feRef = useRef<any>(null);
  const handleClearSearch = () => {
    action_details_group200feRef.current?.setSearchParams();
    action_details_group200feRef.current?.handleSearch({});
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
        !Array.isArray(action_details_group200fe) &&
        Object.keys(action_details_group200fe)?.length > 0
      ) {
        setaction_details_group200fe({})
      }
    } else prevRefreshRef.current = true
  }, [action_details_group200feProps?.refresh])


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
        gridRow: '1 / 56',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '9px',
        backgroundColor:'#ffffff',
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
          setaddagentactions_v1((pre:any)=>({...pre,_selectedGroup_:"action_details_group"}))
        }}
    >
        {allowedComponent.includes("action_detail_group")  &&<Groupaction_detail_group  
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
        {allowedComponent.includes("risk_conf_group")  &&<Grouprisk_conf_group  
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
        {allowedComponent.includes("dynamicactions")  &&<Groupdynamicactions  
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
          {allowedControls.includes("agent_action_id") ?<Textagent_action_id   /* 8a854 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupaction_details_group
