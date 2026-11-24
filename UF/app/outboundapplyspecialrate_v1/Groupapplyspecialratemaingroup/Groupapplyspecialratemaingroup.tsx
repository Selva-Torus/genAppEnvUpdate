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
import Groupapplyspecialratesubgroup  from "../Groupapplyspecialratesubgroup/Groupapplyspecialratesubgroup";
import Groupapplyspecialratedynamicactions  from "../Groupapplyspecialratedynamicactions/Groupapplyspecialratedynamicactions";
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


const Groupapplyspecialratemaingroup = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "applyspecialratemaingroup",
      "applyspecialratedynamicactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [],
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
    'GroupApplyspecialratemaingroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9b6a21e1bcfa9d9f5836843ae5be0950");
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
    setapplyspecialratemaingroupe0950Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("applyspecialratesubgroup")){
        setapplyspecialratesubgroup2d2fd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applyspecialratesubgroup2d2fd?.isDisabled==null)
      {
        setapplyspecialratesubgroup2d2fd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applyspecialratedynamicactions")){
        setapplyspecialratedynamicactionsc09cc((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applyspecialratedynamicactionsc09cc?.isDisabled==null)
      {
        setapplyspecialratedynamicactionsc09cc((pre:any)=>({...pre,isDisabled:false}));
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

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "9b6a21e1bcfa9d9f5836843ae5be0950");
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
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const applyspecialratemaingroupe0950Ref = useRef<any>(null);
  const handleClearSearch = () => {
    applyspecialratemaingroupe0950Ref.current?.setSearchParams();
    applyspecialratemaingroupe0950Ref.current?.handleSearch({});
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
        !Array.isArray(applyspecialratemaingroupe0950) &&
        Object.keys(applyspecialratemaingroupe0950)?.length > 0
      ) {
        setapplyspecialratemaingroupe0950({})
        setapplyspecialratemaingroupe0950Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [applyspecialratemaingroupe0950Props?.refresh])


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
        gridRow: '1 / 167',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'#ffffff',
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
          setoutboundapplyspecialrate_v1((pre:any)=>({...pre,_selectedGroup_:"applyspecialratemaingroup"}))
        }}
    >
        {allowedComponent.includes("applyspecialratesubgroup")  &&<Groupapplyspecialratesubgroup  
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
        {allowedComponent.includes("applyspecialratedynamicactions")  &&<Groupapplyspecialratedynamicactions  
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

export default Groupapplyspecialratemaingroup
