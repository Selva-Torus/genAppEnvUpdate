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
  const {applyspecialratemaingroup6cd35, setapplyspecialratemaingroup6cd35}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratemaingroup6cd35Props, setapplyspecialratemaingroup6cd35Props}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroupd7745, setapplyspecialratesubgroupd7745}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroupd7745Props, setapplyspecialratesubgroupd7745Props}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactions8ee48, setapplyspecialratedynamicactions8ee48}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactions8ee48Props, setapplyspecialratedynamicactions8ee48Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {outboundmanualreturnprocess_v1, setoutboundmanualreturnprocess_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundManualReturnProcess:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "19cf9a837b1539271971dd0555b6cd35");
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
    setapplyspecialratemaingroup6cd35Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("applyspecialratesubgroup")){
        setapplyspecialratesubgroupd7745((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applyspecialratesubgroupd7745?.isDisabled==null)
      {
        setapplyspecialratesubgroupd7745((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("applyspecialratedynamicactions")){
        setapplyspecialratedynamicactions8ee48((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
        if(applyspecialratedynamicactions8ee48?.isDisabled==null)
      {
        setapplyspecialratedynamicactions8ee48((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroup6cd35,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroup6cd35,
        codeStates['applyspecialratemaingroup6cd35'] = applyspecialratemaingroup6cd35Props,
        codeStates['setapplyspecialratemaingroup6cd35'] = setapplyspecialratemaingroup6cd35Props,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroupd7745,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroupd7745,
        codeStates['applyspecialratesubgroupd7745'] = applyspecialratesubgroupd7745Props,
        codeStates['setapplyspecialratesubgroupd7745'] = setapplyspecialratesubgroupd7745Props,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactions8ee48,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactions8ee48,
        codeStates['applyspecialratedynamicactions8ee48'] = applyspecialratedynamicactions8ee48Props,
        codeStates['setapplyspecialratedynamicactions8ee48'] = setapplyspecialratedynamicactions8ee48Props,

    codeExecution(code,codeStates);
    } 
  }

  async function subscreenCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "19cf9a837b1539271971dd0555b6cd35");
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
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroup6cd35,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroup6cd35,
        codeStates['applyspecialratemaingroup6cd35'] = applyspecialratemaingroup6cd35Props,
        codeStates['setapplyspecialratemaingroup6cd35'] = setapplyspecialratemaingroup6cd35Props,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroupd7745,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroupd7745,
        codeStates['applyspecialratesubgroupd7745'] = applyspecialratesubgroupd7745Props,
        codeStates['setapplyspecialratesubgroupd7745'] = setapplyspecialratesubgroupd7745Props,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactions8ee48,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactions8ee48,
        codeStates['applyspecialratedynamicactions8ee48'] = applyspecialratedynamicactions8ee48Props,
        codeStates['setapplyspecialratedynamicactions8ee48'] = setapplyspecialratedynamicactions8ee48Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const applyspecialratemaingroup6cd35Ref = useRef<any>(null);
  const handleClearSearch = () => {
    applyspecialratemaingroup6cd35Ref.current?.setSearchParams();
    applyspecialratemaingroup6cd35Ref.current?.handleSearch({});
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
        !Array.isArray(applyspecialratemaingroup6cd35) &&
        Object.keys(applyspecialratemaingroup6cd35)?.length > 0
      ) {
        setapplyspecialratemaingroup6cd35({})
        setapplyspecialratemaingroup6cd35Props((pre: any) => ({ ...pre, scanQueue: [], scanIndex: 0 }))
      }
    } else prevRefreshRef.current = true
  }, [applyspecialratemaingroup6cd35Props?.refresh])


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
        gridRow: '1 / 125',
      
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
          setoutboundmanualreturnprocess_v1((pre:any)=>({...pre,_selectedGroup_:"applyspecialratemaingroup"}))
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
