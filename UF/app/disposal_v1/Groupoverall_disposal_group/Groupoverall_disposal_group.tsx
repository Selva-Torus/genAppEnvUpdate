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
import Groupicon_text_group  from "../Groupicon_text_group/Groupicon_text_group";
import Groupdisposal_table  from "../Groupdisposal_table/Groupdisposal_table";
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
import Buttonsearch  from "./Buttonsearch";
import Buttoninitiate_disposal  from "./Buttoninitiate_disposal";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoverall_disposal_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const token:string = getCookie('token'); 
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
  const {dfd_assetdisposal_v1Props, setdfd_assetdisposal_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "IT Engineer": {
    "allowedControls": [
      "search",
      "initiate_disposal"
    ],
    "allowedGroups": [
      "canvas",
      "overall_disposal_group",
      "icon_text_group",
      "disposal_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "search",
      "initiate_disposal"
    ],
    "allowedGroups": [
      "canvas",
      "overall_disposal_group",
      "icon_text_group",
      "disposal_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Maker": {
    "allowedControls": [
      "search",
      "initiate_disposal"
    ],
    "allowedGroups": [
      "canvas",
      "overall_disposal_group",
      "icon_text_group",
      "disposal_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "search",
      "initiate_disposal"
    ],
    "allowedGroups": [
      "canvas",
      "overall_disposal_group",
      "icon_text_group",
      "disposal_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
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
  const {overall_disposal_group04cba, setoverall_disposal_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_disposal_group04cbaProps, setoverall_disposal_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group23d8c, seticon_text_group23d8c}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group23d8cProps, seticon_text_group23d8cProps}= useContext(TotalContext) as TotalContextProps;
  const {searchc5de1, setsearchc5de1}= useContext(TotalContext) as TotalContextProps;
  const {initiate_disposal27af5, setinitiate_disposal27af5}= useContext(TotalContext) as TotalContextProps;
  const {disposal_table75a5d, setdisposal_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {disposal_table75a5dProps, setdisposal_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetdisposal_v1, setassetdisposal_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1',
    [user],
    'GroupOverallDisposalGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "4305fe0dee294b65a71eb2d157e04cba");
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
    setoverall_disposal_group04cbaProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("icon_text_group")){
        seticon_text_group23d8c({...icon_text_group23d8c,isDisabled:true});

    }else
    {
      if(icon_text_group23d8c?.isDisabled==null)
      {
        seticon_text_group23d8c({...icon_text_group23d8c,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearchc5de1({...searchc5de1,isDisabled:true});

    }else
    {
      if(searchc5de1?.isDisabled==null)
      {
        setsearchc5de1({...searchc5de1,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("initiate_disposal")){
        setinitiate_disposal27af5({...initiate_disposal27af5,isDisabled:true});

    }else
    {
      if(initiate_disposal27af5?.isDisabled==null)
      {
        setinitiate_disposal27af5({...initiate_disposal27af5,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("disposal_table")){
        setdisposal_table75a5d({...disposal_table75a5d,isDisabled:true});

    }else
    {
      if(disposal_table75a5d?.isDisabled==null)
      {
        setdisposal_table75a5d({...disposal_table75a5d,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_disposal_group'] = overall_disposal_group04cba,
        codeStates['setoverall_disposal_group'] = setoverall_disposal_group04cba,
        codeStates['overall_disposal_group04cba'] = overall_disposal_group04cbaProps,
        codeStates['setoverall_disposal_group04cba'] = setoverall_disposal_group04cbaProps,
        codeStates['icon_text_group'] = icon_text_group23d8c,
        codeStates['seticon_text_group'] = seticon_text_group23d8c,
        codeStates['icon_text_group23d8c'] = icon_text_group23d8cProps,
        codeStates['seticon_text_group23d8c'] = seticon_text_group23d8cProps,
        codeStates['search'] = searchc5de1,
        codeStates['setsearch'] = setsearchc5de1,
        codeStates['initiate_disposal'] = initiate_disposal27af5,
        codeStates['setinitiate_disposal'] = setinitiate_disposal27af5,
        codeStates['disposal_table'] = disposal_table75a5d,
        codeStates['setdisposal_table'] = setdisposal_table75a5d,
        codeStates['disposal_table75a5d'] = disposal_table75a5dProps,
        codeStates['setdisposal_table75a5d'] = setdisposal_table75a5dProps,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()

  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['overall_disposal_group'] = overall_disposal_group04cba,
        codeStates['setoverall_disposal_group'] = setoverall_disposal_group04cba,
        codeStates['overall_disposal_group04cba'] = overall_disposal_group04cbaProps,
        codeStates['setoverall_disposal_group04cba'] = setoverall_disposal_group04cbaProps,
        codeStates['icon_text_group'] = icon_text_group23d8c,
        codeStates['seticon_text_group'] = seticon_text_group23d8c,
        codeStates['icon_text_group23d8c'] = icon_text_group23d8cProps,
        codeStates['seticon_text_group23d8c'] = seticon_text_group23d8cProps,
        codeStates['search'] = searchc5de1,
        codeStates['setsearch'] = setsearchc5de1,
        codeStates['initiate_disposal'] = initiate_disposal27af5,
        codeStates['setinitiate_disposal'] = setinitiate_disposal27af5,
        codeStates['disposal_table'] = disposal_table75a5d,
        codeStates['setdisposal_table'] = setdisposal_table75a5d,
        codeStates['disposal_table75a5d'] = disposal_table75a5dProps,
        codeStates['setdisposal_table75a5d'] = setdisposal_table75a5dProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const overall_disposal_group04cbaRef = useRef<any>(null);
  const handleClearSearch = () => {
    overall_disposal_group04cbaRef.current?.setSearchParams();
    overall_disposal_group04cbaRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(overall_disposal_group04cba) && Object.keys(overall_disposal_group04cba)?.length>0)
      {
        setoverall_disposal_group04cba({})
      }
    }else 
      prevRefreshRef.current= true
  }, [overall_disposal_group04cbaProps?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 123',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-2 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={()=>handleOnClick({}, 0)}
    >
        {allowedComponent.includes("icon_text_group")  &&<Groupicon_text_group  
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
        {allowedComponent.includes("disposal_table")  &&<Groupdisposal_table  
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
        {        ((ruleData?.length>0 && "search" in ButtonGoRuleData)?ButtonGoRuleData["search"]:true) && 
          allowedControls.includes("search")  ?            <Buttonsearch tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "initiate_disposal" in ButtonGoRuleData)?ButtonGoRuleData["initiate_disposal"]:true) && 
          allowedControls.includes("initiate_disposal")  ?            <Buttoninitiate_disposal tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupoverall_disposal_group
