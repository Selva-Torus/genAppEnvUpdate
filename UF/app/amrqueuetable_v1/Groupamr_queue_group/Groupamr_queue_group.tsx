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
import Groupamr_group  from "../Groupamr_group/Groupamr_group";
import Groupamr_queue_table  from "../Groupamr_queue_table/Groupamr_queue_table";
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
import Buttonback_btn  from "./Buttonback_btn";
import Buttonbt_search  from "./Buttonbt_search";
import Buttonnew_case_button  from "./Buttonnew_case_button";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupamr_queue_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
  const {dfd_addcase_v1Props, setdfd_addcase_v1Props} = useContext(TotalContext) as TotalContextProps;
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
  "Branch Manager": {
    "allowedControls": [
      "back_btn",
      "bt_search",
      "new_case_button"
    ],
    "allowedGroups": [
      "canvas",
      "amr_queue_group",
      "amr_group",
      "amr_queue_table"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Branch Officer": {
    "allowedControls": [
      "back_btn",
      "bt_search",
      "new_case_button"
    ],
    "allowedGroups": [
      "canvas",
      "amr_queue_group",
      "amr_group",
      "amr_queue_table"
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
  const {amr_queue_group79589, setamr_queue_group79589}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_group79589Props, setamr_queue_group79589Props}= useContext(TotalContext) as TotalContextProps;
  const {back_btn83b00, setback_btn83b00}= useContext(TotalContext) as TotalContextProps;
  const {amr_group17ac4, setamr_group17ac4}= useContext(TotalContext) as TotalContextProps;
  const {amr_group17ac4Props, setamr_group17ac4Props}= useContext(TotalContext) as TotalContextProps;
  const {bt_searchc8991, setbt_searchc8991}= useContext(TotalContext) as TotalContextProps;
  const {new_case_button34af2, setnew_case_button34af2}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_table09598, setamr_queue_table09598}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_table09598Props, setamr_queue_table09598Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {amrqueuetable_v1, setamrqueuetable_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:AMRQueueTable:AFVK:v1',
    [user],
    'GroupAmrQueueGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "15ad4405caca54ea5086b43505379589");
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
    setamr_queue_group79589Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("back_btn")){
        setback_btn83b00((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(back_btn83b00?.isDisabled==null)
      {
        setback_btn83b00((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("amr_group")){
        setamr_group17ac4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(amr_group17ac4?.isDisabled==null)
      {
        setamr_group17ac4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bt_search")){
        setbt_searchc8991((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bt_searchc8991?.isDisabled==null)
      {
        setbt_searchc8991((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("new_case_button")){
        setnew_case_button34af2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(new_case_button34af2?.isDisabled==null)
      {
        setnew_case_button34af2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("amr_queue_table")){
        setamr_queue_table09598((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(amr_queue_table09598?.isDisabled==null)
      {
        setamr_queue_table09598((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['amr_queue_group'] = amr_queue_group79589,
        codeStates['setamr_queue_group'] = setamr_queue_group79589,
        codeStates['amr_queue_group79589'] = amr_queue_group79589Props,
        codeStates['setamr_queue_group79589'] = setamr_queue_group79589Props,
        codeStates['back_btn'] = back_btn83b00,
        codeStates['setback_btn'] = setback_btn83b00,
        codeStates['amr_group'] = amr_group17ac4,
        codeStates['setamr_group'] = setamr_group17ac4,
        codeStates['amr_group17ac4'] = amr_group17ac4Props,
        codeStates['setamr_group17ac4'] = setamr_group17ac4Props,
        codeStates['bt_search'] = bt_searchc8991,
        codeStates['setbt_search'] = setbt_searchc8991,
        codeStates['new_case_button'] = new_case_button34af2,
        codeStates['setnew_case_button'] = setnew_case_button34af2,
        codeStates['amr_queue_table'] = amr_queue_table09598,
        codeStates['setamr_queue_table'] = setamr_queue_table09598,
        codeStates['amr_queue_table09598'] = amr_queue_table09598Props,
        codeStates['setamr_queue_table09598'] = setamr_queue_table09598Props,

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
        codeStates['amr_queue_group'] = amr_queue_group79589,
        codeStates['setamr_queue_group'] = setamr_queue_group79589,
        codeStates['amr_queue_group79589'] = amr_queue_group79589Props,
        codeStates['setamr_queue_group79589'] = setamr_queue_group79589Props,
        codeStates['back_btn'] = back_btn83b00,
        codeStates['setback_btn'] = setback_btn83b00,
        codeStates['amr_group'] = amr_group17ac4,
        codeStates['setamr_group'] = setamr_group17ac4,
        codeStates['amr_group17ac4'] = amr_group17ac4Props,
        codeStates['setamr_group17ac4'] = setamr_group17ac4Props,
        codeStates['bt_search'] = bt_searchc8991,
        codeStates['setbt_search'] = setbt_searchc8991,
        codeStates['new_case_button'] = new_case_button34af2,
        codeStates['setnew_case_button'] = setnew_case_button34af2,
        codeStates['amr_queue_table'] = amr_queue_table09598,
        codeStates['setamr_queue_table'] = setamr_queue_table09598,
        codeStates['amr_queue_table09598'] = amr_queue_table09598Props,
        codeStates['setamr_queue_table09598'] = setamr_queue_table09598Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const amr_queue_group79589Ref = useRef<any>(null);
  const handleClearSearch = () => {
    amr_queue_group79589Ref.current?.setSearchParams();
    amr_queue_group79589Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(amr_queue_group79589) && Object.keys(amr_queue_group79589)?.length>0)
      {
        setamr_queue_group79589({})
      }
    }else 
      prevRefreshRef.current= true
  }, [amr_queue_group79589Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 166',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '12px',
        backgroundColor:'#f4f5fa',
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
          setamrqueuetable_v1((pre:any)=>({...pre,_selectedGroup_:"amr_queue_group"}))
        }}
    >
        {allowedComponent.includes("amr_group")  &&<Groupamr_group  
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
        {allowedComponent.includes("amr_queue_table")  &&<Groupamr_queue_table  
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
        {        ((ruleData?.length>0 && "back_btn" in ButtonGoRuleData)?ButtonGoRuleData["back_btn"]:true) && 
          allowedControls.includes("back_btn")  ?            <Buttonback_btn tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "bt_search" in ButtonGoRuleData)?ButtonGoRuleData["bt_search"]:true) && 
          allowedControls.includes("bt_search")  ?            <Buttonbt_search tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
        {        ((ruleData?.length>0 && "new_case_button" in ButtonGoRuleData)?ButtonGoRuleData["new_case_button"]:true) && 
          allowedControls.includes("new_case_button")  ?            <Buttonnew_case_button tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} controlData={controlData} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing}/>: <div></div>} 
    </div>
 )
}

export default Groupamr_queue_group
