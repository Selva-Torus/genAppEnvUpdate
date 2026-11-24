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
import Buttoncancelrequestcamt055_close  from "./Buttoncancelrequestcamt055_close";
import Buttoncancelrequestcamt055_reject  from "./Buttoncancelrequestcamt055_reject";
import Buttoncancelrequestcamt055_approve  from "./Buttoncancelrequestcamt055_approve";
import Buttoncancelrequestcamt055_save  from "./Buttoncancelrequestcamt055_save";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupcancelrequestcamt055dynamicactions = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_nftranmaintransaction_v1Props, setdfd_nftranmaintransaction_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nfcancelreasoncombo_v1Props, setdfd_nfcancelreasoncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "cancelrequestcamt055_close",
      "cancelrequestcamt055_reject",
      "cancelrequestcamt055_approve",
      "cancelrequestcamt055_save"
    ],
    "allowedGroups": [
      "canvas",
      "cancelrequestcamt055maingroup",
      "cancelrequestcamt055subgroup",
      "cancelrequestcamt055dynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "cancelrequestcamt055_close",
      "cancelrequestcamt055_reject",
      "cancelrequestcamt055_approve",
      "cancelrequestcamt055_save"
    ],
    "allowedGroups": [
      "canvas",
      "cancelrequestcamt055maingroup",
      "cancelrequestcamt055subgroup",
      "cancelrequestcamt055dynamicactions"
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
  const {cancelrequestcamt055maingroupbf232, setcancelrequestcamt055maingroupbf232}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055maingroupbf232Props, setcancelrequestcamt055maingroupbf232Props}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055subgroup5ac44, setcancelrequestcamt055subgroup5ac44}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055subgroup5ac44Props, setcancelrequestcamt055subgroup5ac44Props}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055dynamicactions2a75a, setcancelrequestcamt055dynamicactions2a75a}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055dynamicactions2a75aProps, setcancelrequestcamt055dynamicactions2a75aProps}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055_closed99be, setcancelrequestcamt055_closed99be}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055_reject88d84, setcancelrequestcamt055_reject88d84}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055_approve510fd, setcancelrequestcamt055_approve510fd}= useContext(TotalContext) as TotalContextProps;
  const {cancelrequestcamt055_save46cc8, setcancelrequestcamt055_save46cc8}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {nfcancelrequestcamt055_v1, setnfcancelrequestcamt055_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfCancelRequestCamt055:AFVK:v1',
    [user],
    'GroupCancelrequestcamt055dynamicactions',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e2cbb36ff43276b1ef06d4232832a75a");
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
    setcancelrequestcamt055dynamicactions2a75aProps((pre:any)=>({...pre,isHaveRule:true}))
      actionRuleHandle(orchestrationData?.data?.rule.nodes,{...decodedTokenObj,session:decodedTokenObj,
});
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("cancelrequestcamt055_close")){
        setcancelrequestcamt055_closed99be((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancelrequestcamt055_closed99be?.isDisabled==null)
      {
        setcancelrequestcamt055_closed99be((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancelrequestcamt055_reject")){
        setcancelrequestcamt055_reject88d84((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancelrequestcamt055_reject88d84?.isDisabled==null)
      {
        setcancelrequestcamt055_reject88d84((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancelrequestcamt055_approve")){
        setcancelrequestcamt055_approve510fd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancelrequestcamt055_approve510fd?.isDisabled==null)
      {
        setcancelrequestcamt055_approve510fd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("cancelrequestcamt055_save")){
        setcancelrequestcamt055_save46cc8((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(cancelrequestcamt055_save46cc8?.isDisabled==null)
      {
        setcancelrequestcamt055_save46cc8((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['cancelrequestcamt055maingroup'] = cancelrequestcamt055maingroupbf232,
        codeStates['setcancelrequestcamt055maingroup'] = setcancelrequestcamt055maingroupbf232,
        codeStates['cancelrequestcamt055maingroupbf232'] = cancelrequestcamt055maingroupbf232Props,
        codeStates['setcancelrequestcamt055maingroupbf232'] = setcancelrequestcamt055maingroupbf232Props,
        codeStates['cancelrequestcamt055subgroup'] = cancelrequestcamt055subgroup5ac44,
        codeStates['setcancelrequestcamt055subgroup'] = setcancelrequestcamt055subgroup5ac44,
        codeStates['cancelrequestcamt055subgroup5ac44'] = cancelrequestcamt055subgroup5ac44Props,
        codeStates['setcancelrequestcamt055subgroup5ac44'] = setcancelrequestcamt055subgroup5ac44Props,
        codeStates['cancelrequestcamt055dynamicactions'] = cancelrequestcamt055dynamicactions2a75a,
        codeStates['setcancelrequestcamt055dynamicactions'] = setcancelrequestcamt055dynamicactions2a75a,
        codeStates['cancelrequestcamt055dynamicactions2a75a'] = cancelrequestcamt055dynamicactions2a75aProps,
        codeStates['setcancelrequestcamt055dynamicactions2a75a'] = setcancelrequestcamt055dynamicactions2a75aProps,
        codeStates['cancelrequestcamt055_close'] = cancelrequestcamt055_closed99be,
        codeStates['setcancelrequestcamt055_close'] = setcancelrequestcamt055_closed99be,
        codeStates['cancelrequestcamt055_reject'] = cancelrequestcamt055_reject88d84,
        codeStates['setcancelrequestcamt055_reject'] = setcancelrequestcamt055_reject88d84,
        codeStates['cancelrequestcamt055_approve'] = cancelrequestcamt055_approve510fd,
        codeStates['setcancelrequestcamt055_approve'] = setcancelrequestcamt055_approve510fd,
        codeStates['cancelrequestcamt055_save'] = cancelrequestcamt055_save46cc8,
        codeStates['setcancelrequestcamt055_save'] = setcancelrequestcamt055_save46cc8,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "e2cbb36ff43276b1ef06d4232832a75a");
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
        codeStates['cancelrequestcamt055maingroup'] = cancelrequestcamt055maingroupbf232,
        codeStates['setcancelrequestcamt055maingroup'] = setcancelrequestcamt055maingroupbf232,
        codeStates['cancelrequestcamt055maingroupbf232'] = cancelrequestcamt055maingroupbf232Props,
        codeStates['setcancelrequestcamt055maingroupbf232'] = setcancelrequestcamt055maingroupbf232Props,
        codeStates['cancelrequestcamt055subgroup'] = cancelrequestcamt055subgroup5ac44,
        codeStates['setcancelrequestcamt055subgroup'] = setcancelrequestcamt055subgroup5ac44,
        codeStates['cancelrequestcamt055subgroup5ac44'] = cancelrequestcamt055subgroup5ac44Props,
        codeStates['setcancelrequestcamt055subgroup5ac44'] = setcancelrequestcamt055subgroup5ac44Props,
        codeStates['cancelrequestcamt055dynamicactions'] = cancelrequestcamt055dynamicactions2a75a,
        codeStates['setcancelrequestcamt055dynamicactions'] = setcancelrequestcamt055dynamicactions2a75a,
        codeStates['cancelrequestcamt055dynamicactions2a75a'] = cancelrequestcamt055dynamicactions2a75aProps,
        codeStates['setcancelrequestcamt055dynamicactions2a75a'] = setcancelrequestcamt055dynamicactions2a75aProps,
        codeStates['cancelrequestcamt055_close'] = cancelrequestcamt055_closed99be,
        codeStates['setcancelrequestcamt055_close'] = setcancelrequestcamt055_closed99be,
        codeStates['cancelrequestcamt055_reject'] = cancelrequestcamt055_reject88d84,
        codeStates['setcancelrequestcamt055_reject'] = setcancelrequestcamt055_reject88d84,
        codeStates['cancelrequestcamt055_approve'] = cancelrequestcamt055_approve510fd,
        codeStates['setcancelrequestcamt055_approve'] = setcancelrequestcamt055_approve510fd,
        codeStates['cancelrequestcamt055_save'] = cancelrequestcamt055_save46cc8,
        codeStates['setcancelrequestcamt055_save'] = setcancelrequestcamt055_save46cc8,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const cancelrequestcamt055dynamicactions2a75aRef = useRef<any>(null);
  const handleClearSearch = () => {
    cancelrequestcamt055dynamicactions2a75aRef.current?.setSearchParams();
    cancelrequestcamt055dynamicactions2a75aRef.current?.handleSearch({});
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
        setcancelrequestcamt055dynamicactions2a75aProps((pre:any)=>({...pre,dynamicActionRule:buttonOrder||{}}))
      }else{
        setButtonGoRuleData({})
        setcancelrequestcamt055dynamicactions2a75aProps((pre:any)=>({...pre,dynamicActionRule:{}}))
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
        !Array.isArray(cancelrequestcamt055dynamicactions2a75a) &&
        Object.keys(cancelrequestcamt055dynamicactions2a75a)?.length > 0
      ) {
        setcancelrequestcamt055dynamicactions2a75a({})
        setcancelrequestcamt055dynamicactions2a75aProps((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [cancelrequestcamt055dynamicactions2a75aProps?.refresh])


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
        gridRow: '89 / 101',
      
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
          setnfcancelrequestcamt055_v1((pre:any)=>({...pre,_selectedGroup_:"cancelrequestcamt055dynamicactions"}))
        }}
    >
        {        ((ruleData?.length>0 && "cancelrequestcamt055_close" in ButtonGoRuleData)?ButtonGoRuleData["cancelrequestcamt055_close"]:true) && 
          allowedControls.includes("cancelrequestcamt055_close")  ?            <Buttoncancelrequestcamt055_close tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "cancelrequestcamt055_reject" in ButtonGoRuleData)?ButtonGoRuleData["cancelrequestcamt055_reject"]:true) && 
          allowedControls.includes("cancelrequestcamt055_reject")  ?            <Buttoncancelrequestcamt055_reject tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "cancelrequestcamt055_approve" in ButtonGoRuleData)?ButtonGoRuleData["cancelrequestcamt055_approve"]:true) && 
          allowedControls.includes("cancelrequestcamt055_approve")  ?            <Buttoncancelrequestcamt055_approve tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "cancelrequestcamt055_save" in ButtonGoRuleData)?ButtonGoRuleData["cancelrequestcamt055_save"]:true) && 
          allowedControls.includes("cancelrequestcamt055_save")  ?            <Buttoncancelrequestcamt055_save tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupcancelrequestcamt055dynamicactions
