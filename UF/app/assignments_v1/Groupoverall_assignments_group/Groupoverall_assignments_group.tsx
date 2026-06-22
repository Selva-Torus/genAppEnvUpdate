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
import Groupgroup  from "../Groupgroup/Groupgroup";
import Groupassignments_table  from "../Groupassignments_table/Groupassignments_table";
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
import Buttonassign_asset  from "./Buttonassign_asset";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupoverall_assignments_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_assetassignments_v1Props, setdfd_assetassignments_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Maker": {
    "allowedControls": [
      "search",
      "assign_asset"
    ],
    "allowedGroups": [
      "canvas",
      "overall_assignments_group",
      "group",
      "assignments_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Checker": {
    "allowedControls": [
      "search",
      "assign_asset"
    ],
    "allowedGroups": [
      "canvas",
      "overall_assignments_group",
      "group",
      "assignments_table"
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
  const {overall_assignments_group04cba, setoverall_assignments_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_assignments_group04cbaProps, setoverall_assignments_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {group9ad63, setgroup9ad63}= useContext(TotalContext) as TotalContextProps;
  const {group9ad63Props, setgroup9ad63Props}= useContext(TotalContext) as TotalContextProps;
  const {search1d0f8, setsearch1d0f8}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset20f5c, setassign_asset20f5c}= useContext(TotalContext) as TotalContextProps;
  const {assignments_table75a5d, setassignments_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {assignments_table75a5dProps, setassignments_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {assetassignments_v1, setassetassignments_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1',
    [user],
    'GroupOverallAssignmentsGroup',
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
    setoverall_assignments_group04cbaProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("group")){
        setgroup9ad63({...group9ad63,isDisabled:true});

    }else
    {
      if(group9ad63?.isDisabled==null)
      {
        setgroup9ad63({...group9ad63,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search")){
        setsearch1d0f8({...search1d0f8,isDisabled:true});

    }else
    {
      if(search1d0f8?.isDisabled==null)
      {
        setsearch1d0f8({...search1d0f8,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assign_asset")){
        setassign_asset20f5c({...assign_asset20f5c,isDisabled:true});

    }else
    {
      if(assign_asset20f5c?.isDisabled==null)
      {
        setassign_asset20f5c({...assign_asset20f5c,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("assignments_table")){
        setassignments_table75a5d({...assignments_table75a5d,isDisabled:true});

    }else
    {
      if(assignments_table75a5d?.isDisabled==null)
      {
        setassignments_table75a5d({...assignments_table75a5d,isDisabled:false});
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_assignments_group'] = overall_assignments_group04cba,
        codeStates['setoverall_assignments_group'] = setoverall_assignments_group04cba,
        codeStates['overall_assignments_group04cba'] = overall_assignments_group04cbaProps,
        codeStates['setoverall_assignments_group04cba'] = setoverall_assignments_group04cbaProps,
        codeStates['group'] = group9ad63,
        codeStates['setgroup'] = setgroup9ad63,
        codeStates['group9ad63'] = group9ad63Props,
        codeStates['setgroup9ad63'] = setgroup9ad63Props,
        codeStates['search'] = search1d0f8,
        codeStates['setsearch'] = setsearch1d0f8,
        codeStates['assign_asset'] = assign_asset20f5c,
        codeStates['setassign_asset'] = setassign_asset20f5c,
        codeStates['assignments_table'] = assignments_table75a5d,
        codeStates['setassignments_table'] = setassignments_table75a5d,
        codeStates['assignments_table75a5d'] = assignments_table75a5dProps,
        codeStates['setassignments_table75a5d'] = setassignments_table75a5dProps,

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
        codeStates['overall_assignments_group'] = overall_assignments_group04cba,
        codeStates['setoverall_assignments_group'] = setoverall_assignments_group04cba,
        codeStates['overall_assignments_group04cba'] = overall_assignments_group04cbaProps,
        codeStates['setoverall_assignments_group04cba'] = setoverall_assignments_group04cbaProps,
        codeStates['group'] = group9ad63,
        codeStates['setgroup'] = setgroup9ad63,
        codeStates['group9ad63'] = group9ad63Props,
        codeStates['setgroup9ad63'] = setgroup9ad63Props,
        codeStates['search'] = search1d0f8,
        codeStates['setsearch'] = setsearch1d0f8,
        codeStates['assign_asset'] = assign_asset20f5c,
        codeStates['setassign_asset'] = setassign_asset20f5c,
        codeStates['assignments_table'] = assignments_table75a5d,
        codeStates['setassignments_table'] = setassignments_table75a5d,
        codeStates['assignments_table75a5d'] = assignments_table75a5dProps,
        codeStates['setassignments_table75a5d'] = setassignments_table75a5dProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const overall_assignments_group04cbaRef = useRef<any>(null);
  const handleClearSearch = () => {
    overall_assignments_group04cbaRef.current?.setSearchParams();
    overall_assignments_group04cbaRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(overall_assignments_group04cba) && Object.keys(overall_assignments_group04cba)?.length>0)
      {
        setoverall_assignments_group04cba({})
      }
    }else 
      prevRefreshRef.current= true
  }, [overall_assignments_group04cbaProps?.refresh,token])


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
        {allowedComponent.includes("group")  &&<Groupgroup  
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
        {allowedComponent.includes("assignments_table")  &&<Groupassignments_table  
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
        {        ((ruleData?.length>0 && "assign_asset" in ButtonGoRuleData)?ButtonGoRuleData["assign_asset"]:true) && 
          allowedControls.includes("assign_asset")  ?            <Buttonassign_asset tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupoverall_assignments_group
