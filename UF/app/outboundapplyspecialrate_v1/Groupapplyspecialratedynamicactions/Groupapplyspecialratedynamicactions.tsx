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
import Buttonapply_special_rate_close  from "./Buttonapply_special_rate_close";
import Buttonapply_special_rate_reject  from "./Buttonapply_special_rate_reject";
import Buttonapply_special_rate_approve  from "./Buttonapply_special_rate_approve";
import Buttonapply_special_rate_save  from "./Buttonapply_special_rate_save";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupapplyspecialratedynamicactions = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_transactiondetailquery_v1Props, setdfd_transactiondetailquery_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_transaction_v1Props, setdfd_transaction_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Operational Manager": {
    "allowedControls": [
      "apply_special_rate_close",
      "apply_special_rate_reject",
      "apply_special_rate_approve",
      "apply_special_rate_save"
    ],
    "allowedGroups": [
      "canvas",
      "applyspecialratemaingroup",
      "applyspecialratedynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "apply_special_rate_close",
      "apply_special_rate_reject",
      "apply_special_rate_approve",
      "apply_special_rate_save"
    ],
    "allowedGroups": [
      "canvas",
      "applyspecialratemaingroup",
      "applyspecialratesubgroup",
      "applyspecialratedynamicactions"
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
  const {applyspecialratemaingroupe0950, setapplyspecialratemaingroupe0950}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratemaingroupe0950Props, setapplyspecialratemaingroupe0950Props}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup2d2fd, setapplyspecialratesubgroup2d2fd}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup2d2fdProps, setapplyspecialratesubgroup2d2fdProps}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsc09cc, setapplyspecialratedynamicactionsc09cc}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsc09ccProps, setapplyspecialratedynamicactionsc09ccProps}= useContext(TotalContext) as TotalContextProps;
  const {apply_special_rate_close57a71, setapply_special_rate_close57a71}= useContext(TotalContext) as TotalContextProps;
  const {apply_special_rate_rejectba9fa, setapply_special_rate_rejectba9fa}= useContext(TotalContext) as TotalContextProps;
  const {apply_special_rate_approve58219, setapply_special_rate_approve58219}= useContext(TotalContext) as TotalContextProps;
  const {apply_special_rate_savebdf41, setapply_special_rate_savebdf41}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {outboundapplyspecialrate_v1, setoutboundapplyspecialrate_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1',
    [user],
    'GroupApplyspecialratedynamicactions',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5fe2a031e53676ca081cc62c8f2c09cc");
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
    setapplyspecialratedynamicactionsc09ccProps((pre:any)=>({...pre,isHaveRule:true}))
      actionRuleHandle(orchestrationData?.data?.rule.nodes,{...decodedTokenObj,session:decodedTokenObj,
});
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("apply_special_rate_close")){
        setapply_special_rate_close57a71((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(apply_special_rate_close57a71?.isDisabled==null)
      {
        setapply_special_rate_close57a71((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("apply_special_rate_reject")){
        setapply_special_rate_rejectba9fa((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(apply_special_rate_rejectba9fa?.isDisabled==null)
      {
        setapply_special_rate_rejectba9fa((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("apply_special_rate_approve")){
        setapply_special_rate_approve58219((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(apply_special_rate_approve58219?.isDisabled==null)
      {
        setapply_special_rate_approve58219((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("apply_special_rate_save")){
        setapply_special_rate_savebdf41((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(apply_special_rate_savebdf41?.isDisabled==null)
      {
        setapply_special_rate_savebdf41((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroupe0950,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroupe0950,
        codeStates['applyspecialratemaingroupe0950'] = applyspecialratemaingroupe0950Props,
        codeStates['setapplyspecialratemaingroupe0950'] = setapplyspecialratemaingroupe0950Props,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroup2d2fd,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroup2d2fd,
        codeStates['applyspecialratesubgroup2d2fd'] = applyspecialratesubgroup2d2fdProps,
        codeStates['setapplyspecialratesubgroup2d2fd'] = setapplyspecialratesubgroup2d2fdProps,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactionsc09cc,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactionsc09cc,
        codeStates['applyspecialratedynamicactionsc09cc'] = applyspecialratedynamicactionsc09ccProps,
        codeStates['setapplyspecialratedynamicactionsc09cc'] = setapplyspecialratedynamicactionsc09ccProps,
        codeStates['apply_special_rate_close'] = apply_special_rate_close57a71,
        codeStates['setapply_special_rate_close'] = setapply_special_rate_close57a71,
        codeStates['apply_special_rate_reject'] = apply_special_rate_rejectba9fa,
        codeStates['setapply_special_rate_reject'] = setapply_special_rate_rejectba9fa,
        codeStates['apply_special_rate_approve'] = apply_special_rate_approve58219,
        codeStates['setapply_special_rate_approve'] = setapply_special_rate_approve58219,
        codeStates['apply_special_rate_save'] = apply_special_rate_savebdf41,
        codeStates['setapply_special_rate_save'] = setapply_special_rate_savebdf41,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "5fe2a031e53676ca081cc62c8f2c09cc");
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
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroupe0950,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroupe0950,
        codeStates['applyspecialratemaingroupe0950'] = applyspecialratemaingroupe0950Props,
        codeStates['setapplyspecialratemaingroupe0950'] = setapplyspecialratemaingroupe0950Props,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroup2d2fd,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroup2d2fd,
        codeStates['applyspecialratesubgroup2d2fd'] = applyspecialratesubgroup2d2fdProps,
        codeStates['setapplyspecialratesubgroup2d2fd'] = setapplyspecialratesubgroup2d2fdProps,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactionsc09cc,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactionsc09cc,
        codeStates['applyspecialratedynamicactionsc09cc'] = applyspecialratedynamicactionsc09ccProps,
        codeStates['setapplyspecialratedynamicactionsc09cc'] = setapplyspecialratedynamicactionsc09ccProps,
        codeStates['apply_special_rate_close'] = apply_special_rate_close57a71,
        codeStates['setapply_special_rate_close'] = setapply_special_rate_close57a71,
        codeStates['apply_special_rate_reject'] = apply_special_rate_rejectba9fa,
        codeStates['setapply_special_rate_reject'] = setapply_special_rate_rejectba9fa,
        codeStates['apply_special_rate_approve'] = apply_special_rate_approve58219,
        codeStates['setapply_special_rate_approve'] = setapply_special_rate_approve58219,
        codeStates['apply_special_rate_save'] = apply_special_rate_savebdf41,
        codeStates['setapply_special_rate_save'] = setapply_special_rate_savebdf41,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const applyspecialratedynamicactionsc09ccRef = useRef<any>(null);
  const handleClearSearch = () => {
    applyspecialratedynamicactionsc09ccRef.current?.setSearchParams();
    applyspecialratedynamicactionsc09ccRef.current?.handleSearch({});
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
        setapplyspecialratedynamicactionsc09ccProps((pre:any)=>({...pre,dynamicActionRule:buttonOrder||{}}))
      }else{
        setButtonGoRuleData({})
        setapplyspecialratedynamicactionsc09ccProps((pre:any)=>({...pre,dynamicActionRule:{}}))
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
        !Array.isArray(applyspecialratedynamicactionsc09cc) &&
        Object.keys(applyspecialratedynamicactionsc09cc)?.length > 0
      ) {
        setapplyspecialratedynamicactionsc09cc({})
        setapplyspecialratedynamicactionsc09ccProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [applyspecialratedynamicactionsc09ccProps?.refresh])


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
        gridRow: '151 / 160',
      
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
          setoutboundapplyspecialrate_v1((pre:any)=>({...pre,_selectedGroup_:"applyspecialratedynamicactions"}))
        }}
    >
        {        ((ruleData?.length>0 && "apply_special_rate_close" in ButtonGoRuleData)?ButtonGoRuleData["apply_special_rate_close"]:true) && 
          allowedControls.includes("apply_special_rate_close")  ?            <Buttonapply_special_rate_close tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "apply_special_rate_reject" in ButtonGoRuleData)?ButtonGoRuleData["apply_special_rate_reject"]:true) && 
          allowedControls.includes("apply_special_rate_reject")  ?            <Buttonapply_special_rate_reject tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "apply_special_rate_approve" in ButtonGoRuleData)?ButtonGoRuleData["apply_special_rate_approve"]:true) && 
          allowedControls.includes("apply_special_rate_approve")  ?            <Buttonapply_special_rate_approve tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "apply_special_rate_save" in ButtonGoRuleData)?ButtonGoRuleData["apply_special_rate_save"]:true) && 
          allowedControls.includes("apply_special_rate_save")  ?            <Buttonapply_special_rate_save tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupapplyspecialratedynamicactions
