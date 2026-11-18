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
import Buttoncancel_btn  from "./Buttoncancel_btn";
import Buttonupdate_btn  from "./Buttonupdate_btn";
import Buttonsave_btn  from "./Buttonsave_btn";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdynamicactions = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_policyfailmodecombo_v1Props, setdfd_policyfailmodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policyrulelanguagecombo_v1Props, setdfd_policyrulelanguagecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policystatuscombo_v1Props, setdfd_policystatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policyteststatuscombo_v1Props, setdfd_policyteststatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_policytypecombo_v1Props, setdfd_policytypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_defaulteffectcombo_v1Props, setdfd_defaulteffectcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_risktiercodecombo_v1Props, setdfd_risktiercodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "cancel_btn",
      "update_btn",
      "save_btn"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "cancel_btn",
      "update_btn",
      "save_btn"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "cancel_btn",
      "update_btn",
      "save_btn"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "cancel_btn",
      "update_btn",
      "save_btn"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "cancel_btn",
      "update_btn",
      "save_btn"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "cancel_btn",
      "update_btn",
      "save_btn"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
      "dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "cancel_btn",
      "update_btn",
      "save_btn"
    ],
    "allowedGroups": [
      "canvas",
      "info_group",
      "group",
      "rule_config_group",
      "rule_config_groupa",
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
  const {info_group321cd, setinfo_group321cd}= useContext(TotalContext) as TotalContextProps;
  const {info_group321cdProps, setinfo_group321cdProps}= useContext(TotalContext) as TotalContextProps;
  const {group51f33, setgroup51f33}= useContext(TotalContext) as TotalContextProps;
  const {group51f33Props, setgroup51f33Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group8a62a, setrule_config_group8a62a}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group8a62aProps, setrule_config_group8a62aProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupab2fc0, setrule_config_groupab2fc0}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupab2fc0Props, setrule_config_groupab2fc0Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions57d44, setdynamicactions57d44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions57d44Props, setdynamicactions57d44Props}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btn634c9, setcancel_btn634c9}= useContext(TotalContext) as TotalContextProps;
  const {update_btn8ac76, setupdate_btn8ac76}= useContext(TotalContext) as TotalContextProps;
  const {save_btn736ea, setsave_btn736ea}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addpolicyrule_v1, setaddpolicyrule_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addPolicyRule:AFVK:v1',
    [user],
    'GroupDynamicactions',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1f456e69953477e57fc6286ff8e57d44");
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
    setdynamicactions57d44Props((pre:any)=>({...pre,isHaveRule:true}))
      actionRuleHandle(orchestrationData?.data?.rule.nodes,{...decodedTokenObj,session:decodedTokenObj,
});
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("cancel_btn")){
        setcancel_btn634c9((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancel_btn634c9?.isDisabled==null)
      {
        setcancel_btn634c9((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("update_btn")){
        setupdate_btn8ac76((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(update_btn8ac76?.isDisabled==null)
      {
        setupdate_btn8ac76((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("save_btn")){
        setsave_btn736ea((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(save_btn736ea?.isDisabled==null)
      {
        setsave_btn736ea((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['info_group'] = info_group321cd,
        codeStates['setinfo_group'] = setinfo_group321cd,
        codeStates['info_group321cd'] = info_group321cdProps,
        codeStates['setinfo_group321cd'] = setinfo_group321cdProps,
        codeStates['group'] = group51f33,
        codeStates['setgroup'] = setgroup51f33,
        codeStates['group51f33'] = group51f33Props,
        codeStates['setgroup51f33'] = setgroup51f33Props,
        codeStates['rule_config_group'] = rule_config_group8a62a,
        codeStates['setrule_config_group'] = setrule_config_group8a62a,
        codeStates['rule_config_group8a62a'] = rule_config_group8a62aProps,
        codeStates['setrule_config_group8a62a'] = setrule_config_group8a62aProps,
        codeStates['rule_config_groupa'] = rule_config_groupab2fc0,
        codeStates['setrule_config_groupa'] = setrule_config_groupab2fc0,
        codeStates['rule_config_groupab2fc0'] = rule_config_groupab2fc0Props,
        codeStates['setrule_config_groupab2fc0'] = setrule_config_groupab2fc0Props,
        codeStates['dynamicactions'] = dynamicactions57d44,
        codeStates['setdynamicactions'] = setdynamicactions57d44,
        codeStates['dynamicactions57d44'] = dynamicactions57d44Props,
        codeStates['setdynamicactions57d44'] = setdynamicactions57d44Props,
        codeStates['cancel_btn'] = cancel_btn634c9,
        codeStates['setcancel_btn'] = setcancel_btn634c9,
        codeStates['update_btn'] = update_btn8ac76,
        codeStates['setupdate_btn'] = setupdate_btn8ac76,
        codeStates['save_btn'] = save_btn736ea,
        codeStates['setsave_btn'] = setsave_btn736ea,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "1f456e69953477e57fc6286ff8e57d44");
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
        codeStates['info_group'] = info_group321cd,
        codeStates['setinfo_group'] = setinfo_group321cd,
        codeStates['info_group321cd'] = info_group321cdProps,
        codeStates['setinfo_group321cd'] = setinfo_group321cdProps,
        codeStates['group'] = group51f33,
        codeStates['setgroup'] = setgroup51f33,
        codeStates['group51f33'] = group51f33Props,
        codeStates['setgroup51f33'] = setgroup51f33Props,
        codeStates['rule_config_group'] = rule_config_group8a62a,
        codeStates['setrule_config_group'] = setrule_config_group8a62a,
        codeStates['rule_config_group8a62a'] = rule_config_group8a62aProps,
        codeStates['setrule_config_group8a62a'] = setrule_config_group8a62aProps,
        codeStates['rule_config_groupa'] = rule_config_groupab2fc0,
        codeStates['setrule_config_groupa'] = setrule_config_groupab2fc0,
        codeStates['rule_config_groupab2fc0'] = rule_config_groupab2fc0Props,
        codeStates['setrule_config_groupab2fc0'] = setrule_config_groupab2fc0Props,
        codeStates['dynamicactions'] = dynamicactions57d44,
        codeStates['setdynamicactions'] = setdynamicactions57d44,
        codeStates['dynamicactions57d44'] = dynamicactions57d44Props,
        codeStates['setdynamicactions57d44'] = setdynamicactions57d44Props,
        codeStates['cancel_btn'] = cancel_btn634c9,
        codeStates['setcancel_btn'] = setcancel_btn634c9,
        codeStates['update_btn'] = update_btn8ac76,
        codeStates['setupdate_btn'] = setupdate_btn8ac76,
        codeStates['save_btn'] = save_btn736ea,
        codeStates['setsave_btn'] = setsave_btn736ea,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const dynamicactions57d44Ref = useRef<any>(null);
  const handleClearSearch = () => {
    dynamicactions57d44Ref.current?.setSearchParams();
    dynamicactions57d44Ref.current?.handleSearch({});
  };

      async function actionRuleHandle(ruleData:any,data:any){
    if(ruleData?.length > 0){
      let result = await evaluateDecisionForDynamicActions(ruleData,data)
      let buttonOrder:any={}
      if(Array.isArray(result)&&result?.length)
      {
        result?.map((item: any) => {
          if ('order' in item) {
            buttonOrder = { ...buttonOrder, [item?.show]: item?.order }
          } else {
            buttonOrder = {
              ...buttonOrder,
              [item?.show]: { start: item?.start, end: item?.end || 4 }
            }
          }
        })
      }
      if(Object.keys(buttonOrder)?.length)
      {
        setButtonGoRuleData(buttonOrder)
        setdynamicactions57d44Props((pre:any)=>({...pre,dynamicActionRule:buttonOrder||{}}))
      }else{
        setButtonGoRuleData({})
        setdynamicactions57d44Props((pre:any)=>({...pre,dynamicActionRule:{}}))
      }


    }
  }
  useEffect(() => {
    securityCheckPromiseRef.current = securityCheck()
  }, [token])

  useEffect(() => {
       actionRuleHandle(ruleData,{...decodedTokenObj,session:decodedTokenObj,});
    if (!handleOnloadCalledRef.current) {
      handleOnloadCalledRef.current = true;
      (async () => {
        await securityCheckPromiseRef.current
        handleOnload()
      })()
    }
    if (prevRefreshRef.current) {
      if (
        !Array.isArray(dynamicactions57d44) &&
        Object.keys(dynamicactions57d44)?.length > 0
      ) {
        setdynamicactions57d44({})
        setdynamicactions57d44Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [dynamicactions57d44Props?.refresh])


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
        gridColumn: '15 / 25',
        gridRow: '92 / 100',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '8px',
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
          setaddpolicyrule_v1((pre:any)=>({...pre,_selectedGroup_:"dynamicactions"}))
        }}
    >
        {        ((ruleData?.length>0 && "cancel_btn" in ButtonGoRuleData)?ButtonGoRuleData["cancel_btn"]:true) && 
          allowedControls.includes("cancel_btn")  ?            <Buttoncancel_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "update_btn" in ButtonGoRuleData)?ButtonGoRuleData["update_btn"]:true) && 
          allowedControls.includes("update_btn")  ?            <Buttonupdate_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "save_btn" in ButtonGoRuleData)?ButtonGoRuleData["save_btn"]:true) && 
          allowedControls.includes("save_btn")  ?            <Buttonsave_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdynamicactions
