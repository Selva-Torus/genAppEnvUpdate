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
import Textreceipt_id  from "./Textreceipt_id";
import Textai_asset_id  from "./Textai_asset_id";
import Textkill_action_id  from "./Textkill_action_id";
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
  const {dfd_revocationackstatuscombo_v1Props, setdfd_revocationackstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_revocationenforcementcombo_v1Props, setdfd_revocationenforcementcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "receipt_id",
      "ai_asset_id",
      "kill_action_id"
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
      "receipt_id",
      "ai_asset_id",
      "kill_action_id"
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
      "receipt_id",
      "ai_asset_id",
      "kill_action_id"
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
      "receipt_id",
      "ai_asset_id",
      "kill_action_id"
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
      "receipt_id",
      "ai_asset_id",
      "kill_action_id"
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
      "receipt_id",
      "ai_asset_id",
      "kill_action_id"
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
      "receipt_id",
      "ai_asset_id",
      "kill_action_id"
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
  const {overall_group4dbd5, setoverall_group4dbd5}= useContext(TotalContext) as TotalContextProps;
  const {overall_group4dbd5Props, setoverall_group4dbd5Props}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group8c83a, setaction_details_group8c83a}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group8c83aProps, setaction_details_group8c83aProps}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group71892, setaction_detail_group71892}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group71892Props, setaction_detail_group71892Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupe5642, setrisk_conf_groupe5642}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupe5642Props, setrisk_conf_groupe5642Props}= useContext(TotalContext) as TotalContextProps;
  const {receipt_id42e6c, setreceipt_id42e6c}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id6e645, setai_asset_id6e645}= useContext(TotalContext) as TotalContextProps;
  const {kill_action_idcc57c, setkill_action_idcc57c}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc7861, setdynamicactionsc7861}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc7861Props, setdynamicactionsc7861Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addrevocationreceipt_v1, setaddrevocationreceipt_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addRevocationReceipt:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "07c23623fe13c0a42742e9afc538c83a");
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
    setaction_details_group8c83aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("action_detail_group")){
        setaction_detail_group71892((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(action_detail_group71892?.isDisabled==null)
      {
        setaction_detail_group71892((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("risk_conf_group")){
        setrisk_conf_groupe5642((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(risk_conf_groupe5642?.isDisabled==null)
      {
        setrisk_conf_groupe5642((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("receipt_id")){
        setreceipt_id42e6c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(receipt_id42e6c?.isDisabled==null)
      {
        setreceipt_id42e6c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ai_asset_id")){
        setai_asset_id6e645((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(ai_asset_id6e645?.isDisabled==null)
      {
        setai_asset_id6e645((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("kill_action_id")){
        setkill_action_idcc57c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(kill_action_idcc57c?.isDisabled==null)
      {
        setkill_action_idcc57c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dynamicactions")){
        setdynamicactionsc7861((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(dynamicactionsc7861?.isDisabled==null)
      {
        setdynamicactionsc7861((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group4dbd5,
        codeStates['setoverall_group'] = setoverall_group4dbd5,
        codeStates['overall_group4dbd5'] = overall_group4dbd5Props,
        codeStates['setoverall_group4dbd5'] = setoverall_group4dbd5Props,
        codeStates['action_details_group'] = action_details_group8c83a,
        codeStates['setaction_details_group'] = setaction_details_group8c83a,
        codeStates['action_details_group8c83a'] = action_details_group8c83aProps,
        codeStates['setaction_details_group8c83a'] = setaction_details_group8c83aProps,
        codeStates['action_detail_group'] = action_detail_group71892,
        codeStates['setaction_detail_group'] = setaction_detail_group71892,
        codeStates['action_detail_group71892'] = action_detail_group71892Props,
        codeStates['setaction_detail_group71892'] = setaction_detail_group71892Props,
        codeStates['risk_conf_group'] = risk_conf_groupe5642,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupe5642,
        codeStates['risk_conf_groupe5642'] = risk_conf_groupe5642Props,
        codeStates['setrisk_conf_groupe5642'] = setrisk_conf_groupe5642Props,
        codeStates['receipt_id'] = receipt_id42e6c,
        codeStates['setreceipt_id'] = setreceipt_id42e6c,
        codeStates['ai_asset_id'] = ai_asset_id6e645,
        codeStates['setai_asset_id'] = setai_asset_id6e645,
        codeStates['kill_action_id'] = kill_action_idcc57c,
        codeStates['setkill_action_id'] = setkill_action_idcc57c,
        codeStates['dynamicactions'] = dynamicactionsc7861,
        codeStates['setdynamicactions'] = setdynamicactionsc7861,
        codeStates['dynamicactionsc7861'] = dynamicactionsc7861Props,
        codeStates['setdynamicactionsc7861'] = setdynamicactionsc7861Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "07c23623fe13c0a42742e9afc538c83a");
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
        codeStates['overall_group'] = overall_group4dbd5,
        codeStates['setoverall_group'] = setoverall_group4dbd5,
        codeStates['overall_group4dbd5'] = overall_group4dbd5Props,
        codeStates['setoverall_group4dbd5'] = setoverall_group4dbd5Props,
        codeStates['action_details_group'] = action_details_group8c83a,
        codeStates['setaction_details_group'] = setaction_details_group8c83a,
        codeStates['action_details_group8c83a'] = action_details_group8c83aProps,
        codeStates['setaction_details_group8c83a'] = setaction_details_group8c83aProps,
        codeStates['action_detail_group'] = action_detail_group71892,
        codeStates['setaction_detail_group'] = setaction_detail_group71892,
        codeStates['action_detail_group71892'] = action_detail_group71892Props,
        codeStates['setaction_detail_group71892'] = setaction_detail_group71892Props,
        codeStates['risk_conf_group'] = risk_conf_groupe5642,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupe5642,
        codeStates['risk_conf_groupe5642'] = risk_conf_groupe5642Props,
        codeStates['setrisk_conf_groupe5642'] = setrisk_conf_groupe5642Props,
        codeStates['receipt_id'] = receipt_id42e6c,
        codeStates['setreceipt_id'] = setreceipt_id42e6c,
        codeStates['ai_asset_id'] = ai_asset_id6e645,
        codeStates['setai_asset_id'] = setai_asset_id6e645,
        codeStates['kill_action_id'] = kill_action_idcc57c,
        codeStates['setkill_action_id'] = setkill_action_idcc57c,
        codeStates['dynamicactions'] = dynamicactionsc7861,
        codeStates['setdynamicactions'] = setdynamicactionsc7861,
        codeStates['dynamicactionsc7861'] = dynamicactionsc7861Props,
        codeStates['setdynamicactionsc7861'] = setdynamicactionsc7861Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const action_details_group8c83aRef = useRef<any>(null);
  const handleClearSearch = () => {
    action_details_group8c83aRef.current?.setSearchParams();
    action_details_group8c83aRef.current?.handleSearch({});
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
        !Array.isArray(action_details_group8c83a) &&
        Object.keys(action_details_group8c83a)?.length > 0
      ) {
        setaction_details_group8c83a({})
        setaction_details_group8c83aProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [action_details_group8c83aProps?.refresh])


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
        gridRow: '1 / 117',
      
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
          setaddrevocationreceipt_v1((pre:any)=>({...pre,_selectedGroup_:"action_details_group"}))
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
          {allowedControls.includes("receipt_id") ?<Textreceipt_id   /* 42e6c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("ai_asset_id") ?<Textai_asset_id   /* 6e645 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("kill_action_id") ?<Textkill_action_id   /* cc57c */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupaction_details_group
