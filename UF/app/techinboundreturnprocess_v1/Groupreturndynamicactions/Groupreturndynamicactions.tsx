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
import Buttontech_return_approve  from "./Buttontech_return_approve";
import Buttontech_return_close  from "./Buttontech_return_close";
import Buttontech_return_reject  from "./Buttontech_return_reject";
import Buttontech_return_save  from "./Buttontech_return_save";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupreturndynamicactions = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_returnreason_v1Props, setdfd_returnreason_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_transaction_v1Props, setdfd_transaction_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_transactiondetailquery_v1Props, setdfd_transactiondetailquery_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "tech_return_approve",
      "tech_return_close",
      "tech_return_reject",
      "tech_return_save"
    ],
    "allowedGroups": [
      "canvas",
      "returnreasonmaingroup",
      "returnreasonsubgroup",
      "returndynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "tech_return_approve",
      "tech_return_close",
      "tech_return_reject",
      "tech_return_save"
    ],
    "allowedGroups": [
      "canvas",
      "returnreasonmaingroup",
      "returnreasonsubgroup",
      "returndynamicactions"
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
  const {returnreasonmaingroup382bc, setreturnreasonmaingroup382bc}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonmaingroup382bcProps, setreturnreasonmaingroup382bcProps}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroupf68e5, setreturnreasonsubgroupf68e5}= useContext(TotalContext) as TotalContextProps;
  const {returnreasonsubgroupf68e5Props, setreturnreasonsubgroupf68e5Props}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactionsc7672, setreturndynamicactionsc7672}= useContext(TotalContext) as TotalContextProps;
  const {returndynamicactionsc7672Props, setreturndynamicactionsc7672Props}= useContext(TotalContext) as TotalContextProps;
  const {tech_return_approve71c38, settech_return_approve71c38}= useContext(TotalContext) as TotalContextProps;
  const {tech_return_closefec09, settech_return_closefec09}= useContext(TotalContext) as TotalContextProps;
  const {tech_return_reject676d0, settech_return_reject676d0}= useContext(TotalContext) as TotalContextProps;
  const {tech_return_savea3f06, settech_return_savea3f06}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {techinboundreturnprocess_v1, settechinboundreturnprocess_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:techInboundReturnProcess:AFVK:v1',
    [user],
    'GroupReturndynamicactions',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4a4a2a8abdb6513fcb8b8cea52cc7672");
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
    setreturndynamicactionsc7672Props((pre:any)=>({...pre,isHaveRule:true}))
      actionRuleHandle(orchestrationData?.data?.rule.nodes,{...decodedTokenObj,session:decodedTokenObj,
});
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("tech_return_approve")){
        settech_return_approve71c38((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tech_return_approve71c38?.isDisabled==null)
      {
        settech_return_approve71c38((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tech_return_close")){
        settech_return_closefec09((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tech_return_closefec09?.isDisabled==null)
      {
        settech_return_closefec09((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tech_return_reject")){
        settech_return_reject676d0((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tech_return_reject676d0?.isDisabled==null)
      {
        settech_return_reject676d0((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("tech_return_save")){
        settech_return_savea3f06((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(tech_return_savea3f06?.isDisabled==null)
      {
        settech_return_savea3f06((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['returnreasonmaingroup'] = returnreasonmaingroup382bc,
        codeStates['setreturnreasonmaingroup'] = setreturnreasonmaingroup382bc,
        codeStates['returnreasonmaingroup382bc'] = returnreasonmaingroup382bcProps,
        codeStates['setreturnreasonmaingroup382bc'] = setreturnreasonmaingroup382bcProps,
        codeStates['returnreasonsubgroup'] = returnreasonsubgroupf68e5,
        codeStates['setreturnreasonsubgroup'] = setreturnreasonsubgroupf68e5,
        codeStates['returnreasonsubgroupf68e5'] = returnreasonsubgroupf68e5Props,
        codeStates['setreturnreasonsubgroupf68e5'] = setreturnreasonsubgroupf68e5Props,
        codeStates['returndynamicactions'] = returndynamicactionsc7672,
        codeStates['setreturndynamicactions'] = setreturndynamicactionsc7672,
        codeStates['returndynamicactionsc7672'] = returndynamicactionsc7672Props,
        codeStates['setreturndynamicactionsc7672'] = setreturndynamicactionsc7672Props,
        codeStates['tech_return_approve'] = tech_return_approve71c38,
        codeStates['settech_return_approve'] = settech_return_approve71c38,
        codeStates['tech_return_close'] = tech_return_closefec09,
        codeStates['settech_return_close'] = settech_return_closefec09,
        codeStates['tech_return_reject'] = tech_return_reject676d0,
        codeStates['settech_return_reject'] = settech_return_reject676d0,
        codeStates['tech_return_save'] = tech_return_savea3f06,
        codeStates['settech_return_save'] = settech_return_savea3f06,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4a4a2a8abdb6513fcb8b8cea52cc7672");
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
        codeStates['returnreasonmaingroup'] = returnreasonmaingroup382bc,
        codeStates['setreturnreasonmaingroup'] = setreturnreasonmaingroup382bc,
        codeStates['returnreasonmaingroup382bc'] = returnreasonmaingroup382bcProps,
        codeStates['setreturnreasonmaingroup382bc'] = setreturnreasonmaingroup382bcProps,
        codeStates['returnreasonsubgroup'] = returnreasonsubgroupf68e5,
        codeStates['setreturnreasonsubgroup'] = setreturnreasonsubgroupf68e5,
        codeStates['returnreasonsubgroupf68e5'] = returnreasonsubgroupf68e5Props,
        codeStates['setreturnreasonsubgroupf68e5'] = setreturnreasonsubgroupf68e5Props,
        codeStates['returndynamicactions'] = returndynamicactionsc7672,
        codeStates['setreturndynamicactions'] = setreturndynamicactionsc7672,
        codeStates['returndynamicactionsc7672'] = returndynamicactionsc7672Props,
        codeStates['setreturndynamicactionsc7672'] = setreturndynamicactionsc7672Props,
        codeStates['tech_return_approve'] = tech_return_approve71c38,
        codeStates['settech_return_approve'] = settech_return_approve71c38,
        codeStates['tech_return_close'] = tech_return_closefec09,
        codeStates['settech_return_close'] = settech_return_closefec09,
        codeStates['tech_return_reject'] = tech_return_reject676d0,
        codeStates['settech_return_reject'] = settech_return_reject676d0,
        codeStates['tech_return_save'] = tech_return_savea3f06,
        codeStates['settech_return_save'] = settech_return_savea3f06,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const returndynamicactionsc7672Ref = useRef<any>(null);
  const handleClearSearch = () => {
    returndynamicactionsc7672Ref.current?.setSearchParams();
    returndynamicactionsc7672Ref.current?.handleSearch({});
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
        setreturndynamicactionsc7672Props((pre:any)=>({...pre,dynamicActionRule:buttonOrder||{}}))
      }else{
        setButtonGoRuleData({})
        setreturndynamicactionsc7672Props((pre:any)=>({...pre,dynamicActionRule:{}}))
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
        !Array.isArray(returndynamicactionsc7672) &&
        Object.keys(returndynamicactionsc7672)?.length > 0
      ) {
        setreturndynamicactionsc7672({})
        setreturndynamicactionsc7672Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [returndynamicactionsc7672Props?.refresh])


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
        gridRow: '84 / 96',
      
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
          settechinboundreturnprocess_v1((pre:any)=>({...pre,_selectedGroup_:"returndynamicactions"}))
        }}
    >
        {        ((ruleData?.length>0 && "tech_return_approve" in ButtonGoRuleData)?ButtonGoRuleData["tech_return_approve"]:true) && 
          allowedControls.includes("tech_return_approve")  ?            <Buttontech_return_approve tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "tech_return_close" in ButtonGoRuleData)?ButtonGoRuleData["tech_return_close"]:true) && 
          allowedControls.includes("tech_return_close")  ?            <Buttontech_return_close tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "tech_return_reject" in ButtonGoRuleData)?ButtonGoRuleData["tech_return_reject"]:true) && 
          allowedControls.includes("tech_return_reject")  ?            <Buttontech_return_reject tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "tech_return_save" in ButtonGoRuleData)?ButtonGoRuleData["tech_return_save"]:true) && 
          allowedControls.includes("tech_return_save")  ?            <Buttontech_return_save tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupreturndynamicactions
