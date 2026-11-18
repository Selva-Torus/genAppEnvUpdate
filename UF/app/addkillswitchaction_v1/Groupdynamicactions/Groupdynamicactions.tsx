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
import Buttoncancel_bt  from "./Buttoncancel_bt";
import Buttonupdate_bt  from "./Buttonupdate_bt";
import Buttonsave_bt  from "./Buttonsave_bt";
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
  const {dfd_assetcodenameconcatcombo_v1Props, setdfd_assetcodenameconcatcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_killswitchscopecombo_v1Props, setdfd_killswitchscopecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_killswitchcontainstatuscombo_v1Props, setdfd_killswitchcontainstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_killswitchtriggertypecombo_v1Props, setdfd_killswitchtriggertypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "cancel_bt",
      "update_bt",
      "save_bt"
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
      "cancel_bt",
      "update_bt",
      "save_bt"
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
      "cancel_bt",
      "update_bt",
      "save_bt"
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
      "cancel_bt",
      "update_bt",
      "save_bt"
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
      "cancel_bt",
      "update_bt",
      "save_bt"
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
      "cancel_bt",
      "update_bt",
      "save_bt"
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
      "cancel_bt",
      "update_bt",
      "save_bt"
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
  const {overall_groupe35bf, setoverall_groupe35bf}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupe35bfProps, setoverall_groupe35bfProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group2c58f, setaction_details_group2c58f}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group2c58fProps, setaction_details_group2c58fProps}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group4f66c, setaction_detail_group4f66c}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group4f66cProps, setaction_detail_group4f66cProps}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd5f40, setrisk_conf_groupd5f40}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupd5f40Props, setrisk_conf_groupd5f40Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions512d9, setdynamicactions512d9}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions512d9Props, setdynamicactions512d9Props}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btce08c, setcancel_btce08c}= useContext(TotalContext) as TotalContextProps;
  const {update_bt05f8b, setupdate_bt05f8b}= useContext(TotalContext) as TotalContextProps;
  const {save_btba06f, setsave_btba06f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {addkillswitchaction_v1, setaddkillswitchaction_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:addKillSwitchAction:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "65c3e114f2b00a8ae15d7710a81512d9");
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
    setdynamicactions512d9Props((pre:any)=>({...pre,isHaveRule:true}))
      actionRuleHandle(orchestrationData?.data?.rule.nodes,{...decodedTokenObj,session:decodedTokenObj,
});
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("cancel_bt")){
        setcancel_btce08c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancel_btce08c?.isDisabled==null)
      {
        setcancel_btce08c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("update_bt")){
        setupdate_bt05f8b((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(update_bt05f8b?.isDisabled==null)
      {
        setupdate_bt05f8b((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("save_bt")){
        setsave_btba06f((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(save_btba06f?.isDisabled==null)
      {
        setsave_btba06f((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_groupe35bf,
        codeStates['setoverall_group'] = setoverall_groupe35bf,
        codeStates['overall_groupe35bf'] = overall_groupe35bfProps,
        codeStates['setoverall_groupe35bf'] = setoverall_groupe35bfProps,
        codeStates['action_details_group'] = action_details_group2c58f,
        codeStates['setaction_details_group'] = setaction_details_group2c58f,
        codeStates['action_details_group2c58f'] = action_details_group2c58fProps,
        codeStates['setaction_details_group2c58f'] = setaction_details_group2c58fProps,
        codeStates['action_detail_group'] = action_detail_group4f66c,
        codeStates['setaction_detail_group'] = setaction_detail_group4f66c,
        codeStates['action_detail_group4f66c'] = action_detail_group4f66cProps,
        codeStates['setaction_detail_group4f66c'] = setaction_detail_group4f66cProps,
        codeStates['risk_conf_group'] = risk_conf_groupd5f40,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupd5f40,
        codeStates['risk_conf_groupd5f40'] = risk_conf_groupd5f40Props,
        codeStates['setrisk_conf_groupd5f40'] = setrisk_conf_groupd5f40Props,
        codeStates['dynamicactions'] = dynamicactions512d9,
        codeStates['setdynamicactions'] = setdynamicactions512d9,
        codeStates['dynamicactions512d9'] = dynamicactions512d9Props,
        codeStates['setdynamicactions512d9'] = setdynamicactions512d9Props,
        codeStates['cancel_bt'] = cancel_btce08c,
        codeStates['setcancel_bt'] = setcancel_btce08c,
        codeStates['update_bt'] = update_bt05f8b,
        codeStates['setupdate_bt'] = setupdate_bt05f8b,
        codeStates['save_bt'] = save_btba06f,
        codeStates['setsave_bt'] = setsave_btba06f,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "65c3e114f2b00a8ae15d7710a81512d9");
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
        codeStates['overall_group'] = overall_groupe35bf,
        codeStates['setoverall_group'] = setoverall_groupe35bf,
        codeStates['overall_groupe35bf'] = overall_groupe35bfProps,
        codeStates['setoverall_groupe35bf'] = setoverall_groupe35bfProps,
        codeStates['action_details_group'] = action_details_group2c58f,
        codeStates['setaction_details_group'] = setaction_details_group2c58f,
        codeStates['action_details_group2c58f'] = action_details_group2c58fProps,
        codeStates['setaction_details_group2c58f'] = setaction_details_group2c58fProps,
        codeStates['action_detail_group'] = action_detail_group4f66c,
        codeStates['setaction_detail_group'] = setaction_detail_group4f66c,
        codeStates['action_detail_group4f66c'] = action_detail_group4f66cProps,
        codeStates['setaction_detail_group4f66c'] = setaction_detail_group4f66cProps,
        codeStates['risk_conf_group'] = risk_conf_groupd5f40,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupd5f40,
        codeStates['risk_conf_groupd5f40'] = risk_conf_groupd5f40Props,
        codeStates['setrisk_conf_groupd5f40'] = setrisk_conf_groupd5f40Props,
        codeStates['dynamicactions'] = dynamicactions512d9,
        codeStates['setdynamicactions'] = setdynamicactions512d9,
        codeStates['dynamicactions512d9'] = dynamicactions512d9Props,
        codeStates['setdynamicactions512d9'] = setdynamicactions512d9Props,
        codeStates['cancel_bt'] = cancel_btce08c,
        codeStates['setcancel_bt'] = setcancel_btce08c,
        codeStates['update_bt'] = update_bt05f8b,
        codeStates['setupdate_bt'] = setupdate_bt05f8b,
        codeStates['save_bt'] = save_btba06f,
        codeStates['setsave_bt'] = setsave_btba06f,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const dynamicactions512d9Ref = useRef<any>(null);
  const handleClearSearch = () => {
    dynamicactions512d9Ref.current?.setSearchParams();
    dynamicactions512d9Ref.current?.handleSearch({});
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
        setdynamicactions512d9Props((pre:any)=>({...pre,dynamicActionRule:buttonOrder||{}}))
      }else{
        setButtonGoRuleData({})
        setdynamicactions512d9Props((pre:any)=>({...pre,dynamicActionRule:{}}))
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
        !Array.isArray(dynamicactions512d9) &&
        Object.keys(dynamicactions512d9)?.length > 0
      ) {
        setdynamicactions512d9({})
        setdynamicactions512d9Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [dynamicactions512d9Props?.refresh])


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
        gridRow: '90 / 97',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
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
          setaddkillswitchaction_v1((pre:any)=>({...pre,_selectedGroup_:"dynamicactions"}))
        }}
    >
        {        ((ruleData?.length>0 && "cancel_bt" in ButtonGoRuleData)?ButtonGoRuleData["cancel_bt"]:true) && 
          allowedControls.includes("cancel_bt")  ?            <Buttoncancel_bt tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "update_bt" in ButtonGoRuleData)?ButtonGoRuleData["update_bt"]:true) && 
          allowedControls.includes("update_bt")  ?            <Buttonupdate_bt tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "save_bt" in ButtonGoRuleData)?ButtonGoRuleData["save_bt"]:true) && 
          allowedControls.includes("save_bt")  ?            <Buttonsave_bt tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupdynamicactions
